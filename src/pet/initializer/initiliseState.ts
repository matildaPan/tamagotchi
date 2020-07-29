import { IPetState } from '../../types';

export const initiliseState  = ():IPetState => {
  return{
    healthPoint: 100,
    fullnessPoint: 100,
    sleepStatues: false,
    pooped: false,
    age: 1,
  };
};