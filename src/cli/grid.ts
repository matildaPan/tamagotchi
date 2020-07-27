import { screen } from './screen';
import blessedContrib from 'blessed-contrib';

export const grid: blessedContrib.grid = new blessedContrib.grid({ screen, rows: 12, cols: 12 });
