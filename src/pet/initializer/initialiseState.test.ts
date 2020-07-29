import { IPetState } from '../../types';
import { MAX_POINT } from '../../utils/constants';
import { initialiseState } from './initialiseState';

describe('initialiseState', () => {
  it('should initialise state', () => {
    const initialState = initialiseState();
    expect(initialState).toEqual({
      healthPoint: MAX_POINT,
      fullnessPoint: MAX_POINT,
      sleepStatues: false,
      pooped: false,
      age: 1,
    });
  });
});