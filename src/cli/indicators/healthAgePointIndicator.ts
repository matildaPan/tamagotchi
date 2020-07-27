import blessedContrib from 'blessed-contrib';
import { grid } from '../grid';
import { IPet } from '../../types';
import { HEALTH_CHECK_INTERVAL } from '../../utils/constants';
import { IIdicator } from './IIndicator';

const donut = grid.set(
  2, 4, 4, 4,
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
    setInterval(this.updateData(pet), HEALTH_CHECK_INTERVAL);
  }

}
