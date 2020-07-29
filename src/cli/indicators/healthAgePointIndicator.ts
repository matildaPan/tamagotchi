import blessedContrib from 'blessed-contrib';
import { grid } from '../grid';
import { IPet, IIdicator } from '../../types';
import { RENDER_INTERVAL } from '../../utils/constants';

const donut = grid.set(
  2, 4, 2, 4,
  blessedContrib.donut,
  { label: 'Health And Age',
    showLabel: true,
    radius: 8,
    arcWidth: 3,
    remainColor: 'black',
    yPadding: 2,
  },
);

export class HealthAgePointIndicator implements IIdicator {

  constructor(pet: IPet) {
    this.updateData(pet)();
    this.renderIndicator(pet);
  }

  updateData = (pet: IPet) => () => {
    const healthPercentage = pet.state.healthPoint / pet.configValues.maxHealthPoint * 100;
    const agePercentage = (pet.configValues.maxAge - pet.state.age) / pet.configValues.maxAge * 100;
    donut.setData([
      { percent: healthPercentage, label: 'Health', color: 'green' },
      { percent: agePercentage, label: 'Age', color: 'blue' },
    ]);
  }

  renderIndicator = (pet: IPet) => {
    setInterval(this.updateData(pet), RENDER_INTERVAL);
  }

}
