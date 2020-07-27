import { IPetState, IPetConfig, CommandType } from '../types';
import { MAX_POINT,
        MIN_POINT,
        MAX_AGE,
        HEALTH_POINT_UNIT,
        TOILET_MOVEMENT_INTERVAL,
        HEALTH_CHECK_INTERVAL,
        TOILET_CLEAN_COMMAND,
        AGE_PROCESS_INTERVAL,
} from '../utils/constants';

export class Pet {
  public state: IPetState;
  public configValues: IPetConfig;
  constructor() {
    this.state = this.initiliseState();
    this.configValues = {
      maxHealthPoint: MAX_POINT,
      maxHungerPoint: MAX_POINT,
      maxAge: MAX_AGE,
    };
    this.startLife();
    this.healthCheck();
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

  healthCheck() {
    setInterval(() => {
      this.toiletCheck();
    },          HEALTH_CHECK_INTERVAL);
  }

  startLife() {
    this.toiletMovement();
  }

  toiletCheck() {
    if (this.state.readyForToilet) {
      this.state.healthPoint = Math.max(this.state.healthPoint - HEALTH_POINT_UNIT, MIN_POINT);
    }
    else {
      this.state.healthPoint = Math.min(this.state.healthPoint + HEALTH_POINT_UNIT , MAX_POINT);
    }
  }

  digest() {
  }

  toiletMovement() {
    setInterval(() => {
      this.state.readyForToilet = true;
    },          TOILET_MOVEMENT_INTERVAL);
  }

  ageProcess() {
    setInterval(() => {
      this.state.age = Math.min(this.state.age + 1, MAX_AGE);
    },          AGE_PROCESS_INTERVAL);
  }

  public receiveCommand(command: CommandType) {
    switch (command){
      case TOILET_CLEAN_COMMAND:
        this.state.readyForToilet = false;
        this.state.healthPoint = Math.min(this.state.healthPoint + HEALTH_POINT_UNIT , MAX_POINT);
        break;
    }

  }

}