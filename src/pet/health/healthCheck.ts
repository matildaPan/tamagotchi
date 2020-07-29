import { HEALTH_POINT_UNIT, FULLNESS_POINT_UNIT, HEALTH_CHECK_INTERVAL } from '../../utils/constants';
import { IPet, IHealthCheck } from '../../types';

export class HealthCheck implements IHealthCheck{
  public decreaseHealth(pet:IPet) {
    pet.state.healthPoint = Math.max(
      pet.state.healthPoint - HEALTH_POINT_UNIT, pet.configValues.minHealthPoint);
  }

  public increaseHealth(pet: IPet) {
    pet.state.healthPoint = Math.min(
      pet.state.healthPoint + HEALTH_POINT_UNIT, pet.configValues.maxHealthPoint);
  }

  public increaseFullness(pet:IPet) {
    pet.state.fullnessPoint = Math.min(
            pet.state.fullnessPoint + FULLNESS_POINT_UNIT, pet.configValues.maxFullnessPoint);

  }

  public toiletCheck(pet:IPet) {
    pet.state.pooped ?  this.decreaseHealth(pet) : this.increaseHealth(pet) ;
  }

  public stomachCheck(pet:IPet) {
    pet.state.fullnessPoint === pet.configValues.minFullnessPoint
    ? this.decreaseHealth(pet) : undefined;
  }

  public bodyCheck(pet:IPet) {
    setInterval(() => {
      this.toiletCheck(pet);
      this.stomachCheck(pet);
    },          HEALTH_CHECK_INTERVAL);
  }

}