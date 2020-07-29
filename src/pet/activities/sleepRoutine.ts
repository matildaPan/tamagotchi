import { IPet, IActivity } from '../../types';
import { SLEEP_ROUTINE_INTERVAL } from '../../utils/constants';

export class SleepRoutine implements IActivity{
  updateState(pet:IPet) {
    setInterval(() => {
      pet.state.sleepStatues = !pet.state.sleepStatues;
    },          SLEEP_ROUTINE_INTERVAL);
  }

}