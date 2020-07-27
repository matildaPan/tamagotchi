import blessedContrib from 'blessed-contrib';
import { grid } from '../grid';
import { IPet } from '../../types';
import { RENDER_INTERVAL, TOILET_DIRTY_LABEL, TOILET_CLEAN_LABEL } from '../../utils/constants';
import { IIdicator } from './IIndicator';

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

const lcd = grid.set(2, 0, 4, 4, blessedContrib.lcd, options);

export class ToiletAlertIndicator implements IIdicator{

  constructor(pet: IPet) {
    this.updateData(pet)();
    this.renderIndicator(pet);
  }

  updateData = (pet:IPet) => () => {
    lcd.setDisplay(pet.state.pooped ? TOILET_DIRTY_LABEL : TOILET_CLEAN_LABEL);
    lcd.setOptions({
      color: pet.state.pooped ? 'red' : 'green',
    });
  }

  renderIndicator = (pet: IPet) => {
    this.updateData(pet)();
    setInterval(this.updateData(pet), RENDER_INTERVAL);
  }
}
