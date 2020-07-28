import { IPetState, IPetConfig, CommandType } from '../types';
import { MAX_POINT,
        MIN_POINT,
        MAX_AGE,
        HEALTH_POINT_UNIT,
        TOILET_MOVEMENT_INTERVAL,
        HEALTH_CHECK_INTERVAL,
        TOILET_CLEAN_COMMAND,
        AGE_PROCESS_INTERVAL,
        FULLNESS_POINT_UNIT,
        DIGEST_INTERVAL,
        FEED,
        SLEEP_ROUTINE_INTERVAL,
} from '../utils/constants';

export class Pet {
  public state: IPetState;
  public configValues: IPetConfig;
  constructor() {
    this.state = this.initiliseState();
    this.configValues = {
      maxHealthPoint: MAX_POINT,
      maxFullnessPoint: MAX_POINT,
      maxAge: MAX_AGE,
    };
    this.startLife();
    this.healthCheck();
  }

  initiliseState(): IPetState {
    return{
      healthPoint: 100,
      fullnessPoint: 100,
      sleepStatues: false,
      pooped: false,
      age: 1,
    };

  }

  healthCheck() {
    setInterval(() => {
      this.toiletCheck();
      this.stomachCheck();
    },          HEALTH_CHECK_INTERVAL);
  }

  startLife() {
    this.toiletMovement();
    this.digest();
    this.sleepRoutine();
  }

  toiletCheck() {
    if (this.state.pooped) {
      this.state.healthPoint = Math.max(this.state.healthPoint - HEALTH_POINT_UNIT, MIN_POINT);
    }
    else {
      this.state.healthPoint = Math.min(this.state.healthPoint + HEALTH_POINT_UNIT , MAX_POINT);
    }
  }

  stomachCheck() {
    if (this.state.fullnessPoint === MIN_POINT) {
      this.state.healthPoint = Math.max(this.state.healthPoint - HEALTH_POINT_UNIT, MIN_POINT);
    }
  }

  digest() {
    setInterval(() => {
      const full = Math.max(
        this.state.fullnessPoint - FULLNESS_POINT_UNIT,
        MIN_POINT,
      );
      this.state.fullnessPoint = full;
    },          DIGEST_INTERVAL);
  }

  toiletMovement() {
    setInterval(() => {
      this.state.pooped = true;
    },          TOILET_MOVEMENT_INTERVAL);
  }

  sleepRoutine() {
    setInterval(() => {
      this.state.sleepStatues = !this.state.sleepStatues;
    },          SLEEP_ROUTINE_INTERVAL);
  }

  ageProcess() {
    setInterval(() => {
      this.state.age = Math.min(this.state.age + 1, MAX_AGE);
    },          AGE_PROCESS_INTERVAL);
  }

  public receiveCommand(command: CommandType) {
    switch (command){
      case TOILET_CLEAN_COMMAND:
        this.state.pooped = false;
        this.state.healthPoint = Math.min(this.state.healthPoint + HEALTH_POINT_UNIT , MAX_POINT);
        break;
      case FEED:
        this.state.fullnessPoint =
          Math.min(this.state.fullnessPoint + FULLNESS_POINT_UNIT, MAX_POINT);
        break;
    }

  }

}