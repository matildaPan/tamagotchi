
import blessedContrib from 'blessed-contrib';
import { grid } from '../grid';
import { IPet } from '../../types';
import { screen } from '../screen';
grid.set(0, 0, 2, 12, blessedContrib.markdown,
         { label:'Commands', markdown: 'Feed(ctrl+f) Clean(ctrl+c) Bedding(ctrl+b) Quit(q)' });

export const commandPanel = (pet: IPet) => {
  screen.key(['C-c'], () => {
    pet.receiveCommand('TOILET CLEAN');
  });
};