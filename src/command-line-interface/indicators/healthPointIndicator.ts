
import blessedContrib from 'blessed-contrib';
import { grid } from '../grid';
import { IPet } from '../../types';

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
  setInterval(updateGaugeData(pet), 100);
};
