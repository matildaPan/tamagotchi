import { IPetConfig } from '../../types';
import { MAX_POINT, MAX_AGE, MIN_POINT } from '../../utils/constants';
import { initialiseConfigValues } from './initialiseConfigValues';

describe('initialiseConfigValues', () => {
  it('should generate initial config values', () => {
    const configValues = initialiseConfigValues();
    expect(configValues).toEqual({
      maxAge: MAX_AGE,
      maxHealthPoint: MAX_POINT,
      maxFullnessPoint: MAX_POINT,
      minHealthPoint: MIN_POINT,
      minFullnessPoint: MIN_POINT,
    });
  });

});