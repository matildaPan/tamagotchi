import { ToiletMovement } from './toiletMovement';
import { IPet } from '../../types';
import { initialiseConfigValues, initialiseState } from '../initializer';
import { TOILET_MOVEMENT_INTERVAL } from '../../utils/constants';

describe('toilet movement', () => {
  it('update status', () => {
    jest.useFakeTimers();
    const toiletMovement = new ToiletMovement();
    const pet: IPet = {
      state: initialiseState(),
      configValues: initialiseConfigValues(),
      receiveCommand: jest.fn(),
    };
    toiletMovement.updateState(pet);
    jest.advanceTimersByTime(TOILET_MOVEMENT_INTERVAL);
    expect(pet.state.pooped).toBe(true);
  });

});