import { IPetState, IPetConfig } from '../types';
import { MAX_VALUE, MAX_AGE  } from '../utils/constants';

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