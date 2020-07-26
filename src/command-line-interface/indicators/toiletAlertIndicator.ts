import blessedContrib from 'blessed-contrib';
import { grid } from '../grid';
import { IPet } from '../../types';
import { TOILET_ALERT_RENDER_INTERVAL, TOILET_DIRTY_LABEL, TOILET_CLEAN_LABEL } from '../../utils/constants';

const options = {
  segmentWidth: 0.1,
  segmentInterval: 0.1,
  strokeWidth: 0.1,
  elements: 10,
  display: TOILET_CLEAN_LABEL,
  elementSpacing: 4 ,
  elementPadding: 2 ,
  color: 'green' ,
  label: 'TOILET ALERT!'};

const lcd = grid.set(2, 0, 10, 4, blessedContrib.lcd, options);

const updateLcdData = (pet:IPet) => () => {
  lcd.setDisplay(pet.state.readyForToilet ? TOILET_DIRTY_LABEL : TOILET_CLEAN_LABEL);
  lcd.setOptions({
    color: pet.state.readyForToilet ? 'red' : 'green',
  });
};

export const toiletAlertIndicator = (pet: IPet) => {
  updateLcdData(pet)();
  setInterval(updateLcdData(pet), TOILET_ALERT_RENDER_INTERVAL);
};
