import { IPet } from '../types';
import { CLI_RENDER_TIME_INTERVAL } from '../utils/constants';
import { healthPointIndicator } from './indicators/healthPointIndicator';
import { toiletAlertIndicator } from './indicators/toiletAlertIndicator';
import { screen } from './screen';

export const render = (pet:IPet) => {
  healthPointIndicator(pet);
  toiletAlertIndicator(pet);

  screen.render();

  screen.key(['C-c'], () => {
    pet.receiveCommand('TOILET CLEAN');
  });

  setInterval(() => {
    screen.render();
  },
              CLI_RENDER_TIME_INTERVAL);

};