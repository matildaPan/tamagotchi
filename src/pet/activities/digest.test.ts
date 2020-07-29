import { Digest } from './digest';
import { IPet } from '../../types';
import { initialiseConfigValues, initialiseState } from '../initializer';
import { FULLNESS_POINT_UNIT, DIGEST_INTERVAL } from '../../utils/constants';

describe('digest', () => {
  it('update status', () => {
    jest.useFakeTimers();
    const digest = new Digest();
    const pet: IPet = {
      state: initialiseState(),
      configValues: initialiseConfigValues(),
      receiveCommand: jest.fn(),
    };
    digest.updateState(pet);
    jest.advanceTimersByTime(DIGEST_INTERVAL);
    expect(pet.state.fullnessPoint).toEqual(90);
  });

});