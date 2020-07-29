import { IPet, IActivity } from '../../types';
import { MAX_AGE, AGE_PROCESS_INTERVAL } from '../../utils/constants';

export class AgeProcess implements IActivity{
  updateState(pet:IPet) {
    setInterval(() => {
      pet.state.age = Math.min(pet.state.age + 1, MAX_AGE);
    },          AGE_PROCESS_INTERVAL);
  }

}