import { IPet } from '../types';
import { RENDER_INTERVAL } from '../utils/constants';
import { HealthAgePointIndicator } from './indicators/healthAgePointIndicator';
import { ToiletAlertIndicator } from './indicators/toiletAlertIndicator';
import { StomachIndicator } from './indicators/stomachIndicator';
import { SleepIndicator } from './indicators/sleepIndicator';
import { commandPanel } from './panels/commandPanel';
import { screen } from './screen';

export const render = (pet:IPet) => {
  new HealthAgePointIndicator(pet);
  new ToiletAlertIndicator(pet);
  new StomachIndicator(pet);
  new SleepIndicator(pet);

  commandPanel(pet);

  screen.render();
  setInterval(() => {
    screen.render();
  },
              RENDER_INTERVAL);

};