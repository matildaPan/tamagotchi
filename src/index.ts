import { Pet } from './pet/pet';
import { render } from './command-line-interface/cli';

const pet = new Pet();

render(pet);