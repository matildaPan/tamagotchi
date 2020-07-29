import blessedContrib from 'blessed-contrib';
import { grid } from '../grid';
import { IPet, IIdicator } from '../../types';
import { RENDER_INTERVAL } from '../../utils/constants';

const gauge = grid.set(
  4, 4, 2, 4,
  blessedContrib.gauge,
  { label: 'Stomach Fullness',
    stroke: 'green',
    fill: 'white',
  },
);

export class StomachIndicator implements IIdicator {
  constructor(pet: IPet) {
    this.updateData(pet)();
    this.renderIndicator(pet);
  }

  updateData = (pet:IPet) => () => {
    const percent = pet.state.fullnessPoint / pet.configValues.maxFullnessPoint * 100;
    gauge.setPercent(percent);
  }

  renderIndicator(pet: IPet) {
    setInterval(this.updateData(pet), RENDER_INTERVAL);

  }

}