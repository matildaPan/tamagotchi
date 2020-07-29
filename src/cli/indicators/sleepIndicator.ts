import blessedContrib from 'blessed-contrib';
import { grid } from '../grid';
import { IPet, IIdicator } from '../../types';
import { RENDER_INTERVAL, SLEEP_LABEL, AWAKE_LABEL } from '../../utils/constants';

const options = {
  segmentWidth: 0.1,
  segmentInterval: 0.1,
  strokeWidth: 0.1,
  elements: 5,
  elementSpacing: 4 ,
  elementPadding: 2 ,
  color: 'white' ,
  label: 'Sleep Status'};

const lcd = grid.set(2, 8, 4, 4, blessedContrib.lcd, options);

export class SleepIndicator implements IIdicator{

  constructor(pet: IPet) {
    this.updateData(pet)();
    this.renderIndicator(pet);
  }

  updateData = (pet:IPet) => () => {
    lcd.setDisplay(pet.state.sleepStatues ? SLEEP_LABEL : AWAKE_LABEL);
  }

  renderIndicator = (pet: IPet) => {
    this.updateData(pet)();
    setInterval(this.updateData(pet), RENDER_INTERVAL);
  }
}
