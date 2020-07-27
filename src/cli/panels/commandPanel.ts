
import blessedContrib from 'blessed-contrib';
import { grid } from '../grid';
import { IPet } from '../../types';
import { screen } from '../screen';
import { TOILET_CLEAN_COMMAND } from '../../utils/constants';
grid.set(0, 0, 2, 12, blessedContrib.markdown,
         { label:'Commands', markdown: 'Feed(ctrl+f) Clean Toilet(ctrl+c) Put to bed(ctrl+b) Quit(q)' });

export const commandPanel = (pet: IPet) => {
  screen.key(['C-c'], () => {
    pet.receiveCommand(TOILET_CLEAN_COMMAND);
  });
};