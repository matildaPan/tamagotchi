import { IPet, IActivity } from '../../types';
import { FULLNESS_POINT_UNIT, DIGEST_INTERVAL, MIN_POINT } from '../../utils/constants';

export class Digest implements IActivity{
  updateState(pet:IPet) {
    setInterval(() => {
      pet.state.fullnessPoint = Math.max(pet.state.fullnessPoint - FULLNESS_POINT_UNIT, MIN_POINT);
    },          DIGEST_INTERVAL);
  }

}