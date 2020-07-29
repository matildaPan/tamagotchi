import { IPetConfig } from '../../types';
import { MAX_POINT, MAX_AGE, MIN_POINT } from '../../utils/constants';

export const initialiseConfigValues  = ():IPetConfig => {
  return{
    maxAge: MAX_AGE,
    maxHealthPoint: MAX_POINT,
    maxFullnessPoint: MAX_POINT,
    minHealthPoint: MIN_POINT,
    minFullnessPoint: MIN_POINT,
  };
};