import { IPetState } from '../../types';
import { MAX_POINT } from '../../utils/constants';

export const initialiseState  = ():IPetState => {
  return{
    healthPoint: MAX_POINT,
    fullnessPoint: MAX_POINT,
    sleepStatues: false,
    pooped: false,
    age: 1,
  };
};