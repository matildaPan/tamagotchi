import { SleepRoutine } from './sleepRoutine';
import { IPet } from '../../types';
import { initialiseConfigValues, initialiseState } from '../initializer';
import { SLEEP_ROUTINE_INTERVAL } from '../../utils/constants';

describe('sleep routine', () => {
  it('update status', () => {
    jest.useFakeTimers();
    const sleepRoutine = new SleepRoutine();
    const pet: IPet = {
      state: initialiseState(),
      configValues: initialiseConfigValues(),
      receiveCommand: jest.fn(),
    };
    sleepRoutine.updateState(pet);
    jest.advanceTimersByTime(SLEEP_ROUTINE_INTERVAL);
    expect(pet.state.sleepStatues).toEqual(true);
  });

});