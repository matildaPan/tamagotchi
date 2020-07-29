import { HealthCheck } from './healthCheck';
import { HEALTH_POINT_UNIT, MAX_POINT, FULLNESS_POINT_UNIT } from '../../utils/constants';
import { Pet } from '../pet';

describe('health check', () => {
  beforeEach(() => {
    global.setInterval = ():any => {};
  });
  it('should decrese health point', () => {
    const healthCheck = new HealthCheck();
    const pet = new Pet();
    healthCheck.decreaseHealth(pet);
    expect(pet.state.healthPoint).toEqual(MAX_POINT - HEALTH_POINT_UNIT);
  });
  it('should increase health point', () => {
    const healthCheck = new HealthCheck();
    const pet = new Pet();
    const currentHealthPoint = 70;
    pet.state.healthPoint = currentHealthPoint;
    healthCheck.increaseHealth(pet);
    expect(pet.state.healthPoint).toBe(currentHealthPoint + HEALTH_POINT_UNIT);
  });
  it('should increase fullness', () => {
    const healthCheck = new HealthCheck();
    const pet = new Pet();
    const currentFullnessPoint = 80;
    pet.state.fullnessPoint = currentFullnessPoint;
    healthCheck.increaseFullness(pet);
    expect(pet.state.fullnessPoint).toBe(currentFullnessPoint + FULLNESS_POINT_UNIT);

  });

  describe('toilet check', () => {
    it('decrease health point when poop not cleaned', () => {
      const healthCheck = new HealthCheck();
      const pet = new Pet();
      pet.state.pooped = true;
      healthCheck.toiletCheck(pet);
      expect(pet.state.healthPoint).toEqual(MAX_POINT - HEALTH_POINT_UNIT);
    });

    it('increase health point when poop is cleaned', () => {
      const healthCheck = new HealthCheck();
      const pet = new Pet();
      pet.state.pooped = false;
      const currentHealthPoint = 70;
      pet.state.healthPoint = currentHealthPoint;
      healthCheck.toiletCheck(pet);
      expect(pet.state.healthPoint).toEqual(currentHealthPoint + HEALTH_POINT_UNIT);
    });
  });

  describe('stomach check', () => {

    it('should decrease health point when empty stomach', () => {
      const healthCheck = new HealthCheck();
      const pet = new Pet();
      pet.state.fullnessPoint = pet.configValues.minFullnessPoint;
      healthCheck.stomachCheck(pet);
      expect(pet.state.healthPoint).toEqual(MAX_POINT - HEALTH_POINT_UNIT);
    });

    it('should do nothing when stomach is not empty', () => {
      const healthCheck = new HealthCheck();
      const pet = new Pet();
      healthCheck.stomachCheck(pet);
      expect(pet.state.healthPoint).toEqual(pet.state.healthPoint);
    });

  });

  it('should body check', () => {
    jest.useFakeTimers();
    const stomachCheckMock = jest.fn();
    const toiletCheckMock = jest.fn();
    const healthCheck = new HealthCheck();

    healthCheck.stomachCheck = stomachCheckMock;
    healthCheck.toiletCheck = toiletCheckMock;
    const pet = new Pet();
    healthCheck.bodyCheck(pet);
    jest.advanceTimersByTime(5000);
    expect(healthCheck.stomachCheck).toHaveBeenCalled();

  });
});