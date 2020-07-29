import { MAX_POINT, MAX_AGE } from '../utils/constants';
import { Pet } from './pet';
import { ToiletMovement, Digest, SleepRoutine, AgeProcess } from './activities';

const toiletMovementUpdateStateMock = jest.fn();
jest.mock('./activities/toiletMovement', () => {
  return{
    ToiletMovement: jest.fn().mockImplementation(() => {
      return{ updateState: toiletMovementUpdateStateMock };
    }),
  };
});

const digestUpdateStateMock = jest.fn();
jest.mock('./activities/digest', () => {
  return{
    Digest: jest.fn().mockImplementation(() => {
      return {
        updateState: digestUpdateStateMock,
      };
    }),
  };
});

const sleepRoutineUpdateStateMock = jest.fn();
jest.mock('./activities/sleepRoutine', () => {
  return {
    SleepRoutine: jest.fn().mockImplementation(() => {
      return {
        updateState: sleepRoutineUpdateStateMock,
      };
    }),
  };
});

describe('Pet', () => {
  beforeEach(() => {
    const setInterval = ():any => {};
    global.setInterval = setInterval;
  });
  describe('init', () => {
    it('should have initial states and configValues', () => {
      const pet = new Pet();
      expect(pet.state).toEqual({
        healthPoint: 100,
        fullnessPoint: 100,
        sleepStatues: false,
        pooped: false,
        age: 1,
      });
      expect(pet.configValues).toEqual({
        maxHealthPoint: MAX_POINT,
        maxFullnessPoint: MAX_POINT,
        maxAge: MAX_AGE,
      });

    });
    it('should start life with toilet movement', () => {
      const pet = new Pet();
      expect(ToiletMovement).toHaveBeenCalled();
      expect(toiletMovementUpdateStateMock).toHaveBeenCalled();
    });
    it('should start life with digest', () => {
      const pet = new Pet();
      expect(Digest).toHaveBeenCalled();
      expect(digestUpdateStateMock).toHaveBeenCalled();
    });
    it('should start life with sleep routine', () => {
      const pet = new Pet();
      expect(SleepRoutine).toHaveBeenCalled();
      expect(sleepRoutineUpdateStateMock).toHaveBeenCalled();
    });
  });

});