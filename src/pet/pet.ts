import { IPetState, IPetConfig, CommandType, IActivity } from '../types';
import { ToiletMovement, Digest, SleepRoutine, AgeProcess } from './activities';
import { MAX_POINT,
        MIN_POINT,
        MAX_AGE,
        HEALTH_POINT_UNIT,
        HEALTH_CHECK_INTERVAL,
        TOILET_CLEAN_COMMAND,
        FULLNESS_POINT_UNIT,
        FEED,
} from '../utils/constants';

export class Pet {
  public state: IPetState;
  public readonly configValues: IPetConfig;
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

  private initiliseState(): IPetState {
    return{
      healthPoint: 100,
      fullnessPoint: 100,
      sleepStatues: false,
      pooped: false,
      age: 1,
    };
  }

  private healthCheck() {
    setInterval(() => {
      this.toiletCheck();
      this.stomachCheck();
    },          HEALTH_CHECK_INTERVAL);
  }

  private startLife() {
    this.performActivity(new ToiletMovement());
    this.performActivity(new Digest());
    this.performActivity(new SleepRoutine());
    this.performActivity(new AgeProcess());
  }

  private toiletCheck() {
    this.state.pooped ?  this.decreaseHealth() : this.increaseHealth() ;
  }

  private stomachCheck() {
    this.state.fullnessPoint === MIN_POINT ? this.decreaseHealth() : undefined;
  }

  performActivity(action: IActivity) {
    action.updateState(this);
  }

  public receiveCommand(command: CommandType) {
    switch (command){
      case TOILET_CLEAN_COMMAND:
        if (this.state.pooped) {
          this.state.pooped = false;
          this.increaseHealth();
        }
        break;
      case FEED:
        this.state.fullnessPoint =
          Math.min(this.state.fullnessPoint + FULLNESS_POINT_UNIT, MAX_POINT);
        break;
    }
  }

  public decreaseHealth() {
    this.state.healthPoint = Math.max(this.state.healthPoint - HEALTH_POINT_UNIT, MIN_POINT);
  }

  public increaseHealth() {
    this.state.healthPoint = Math.min(this.state.healthPoint + HEALTH_POINT_UNIT , MAX_POINT);
  }

}