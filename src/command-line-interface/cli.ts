import { IPet } from '../types';
import { TIME_INTERVAL } from '../utils/constants';
import { healthPointIndicator } from './indicators/healthPointIndicator';
import { screen } from './screen';

export const render = (pet:IPet) => {
  healthPointIndicator(pet);

  screen.render();

  setInterval(() => {
    screen.render();
  },
              TIME_INTERVAL);

};