import { IPet, IActivity } from '../../types';
import { TOILET_MOVEMENT_INTERVAL } from '../../utils/constants';

export class ToiletMovement implements IActivity{
  updateState(pet:IPet) {
    setInterval(() => {
      pet.state.pooped = true;
    },          TOILET_MOVEMENT_INTERVAL);
  }
}