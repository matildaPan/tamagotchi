import { AgeProcess } from './ageProcess';
import { IPet } from '../../types';
import { initialiseConfigValues, initialiseState } from '../initializer';
import { AGE_PROCESS_INTERVAL } from '../../utils/constants';

describe('age process', () => {
  it('update status', () => {
    jest.useFakeTimers();
    const ageProcess = new AgeProcess();
    const pet: IPet = {
      state: initialiseState(),
      configValues: initialiseConfigValues(),
      receiveCommand: jest.fn(),
    };
    ageProcess.updateState(pet);
    jest.advanceTimersByTime(AGE_PROCESS_INTERVAL);
    expect(pet.state.age).toEqual(2);
  });

});