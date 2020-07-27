import { IPet } from '../types';
import { CLI_RENDER_TIME_INTERVAL } from '../utils/constants';
import { HealthAgePointIndicator } from './indicators/healthAgePointIndicator';
import { ToiletAlertIndicator } from './indicators/toiletAlertIndicator';
import { commandPanel } from './panels/commandPanel';
import { screen } from './screen';

export const render = (pet:IPet) => {
  new HealthAgePointIndicator(pet);
  new ToiletAlertIndicator(pet);
  commandPanel(pet);

  screen.render();

  setInterval(() => {
    screen.render();
  },
              CLI_RENDER_TIME_INTERVAL);

};