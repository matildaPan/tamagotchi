
import blessedContrib from 'blessed-contrib';
import { grid } from '../grid';
import { IPet } from '../../types';
import { HEALTH_CHECK_INTERVAL } from '../../utils/constants';

const donut = grid.set(
  0, 4, 10, 2,
  blessedContrib.donut,
  { label: 'Health Point',
    showLabel: true,
    radius: 8,
    arcWidth: 3,
    remainColor: 'black',
    yPadding: 2,
  },
);

const updateGaugeData = (pet: IPet) => () => {
  const percent = pet.state.healthPoint / pet.configValues.maxHealthPoint * 100;
  donut.setData([
    { percent, label: 'health', color: 'green' },
  ]);
};

export const healthPointIndicator = (pet: IPet) => {
  updateGaugeData(pet)();
  setInterval(updateGaugeData(pet), HEALTH_CHECK_INTERVAL);
};
