import { IPetState, IPetConfig } from '../types';

const MAX_VALUE = 100;
const MAX_AGE = 10;

export class Pet {
  public state: IPetState;
  public configValues: IPetConfig;
  constructor() {
    this.state = this.initiliseState();
    this.configValues = {
      maxHealthPoint: MAX_VALUE,
      maxHungerPoint: MAX_VALUE,
      maxAge: MAX_AGE,
    };

  }

  initiliseState(): IPetState {
    return{
      healthPoint: 100,
      hungerPoint: 0,
      sleepStatues: false,
      readyForToilet: false,
      age: 1,
    };

  }

}