import { IPetState, IPetConfig, CommandType, IActivity } from '../types';
import { ToiletMovement, Digest, SleepRoutine, AgeProcess } from './activities';
import { initiliseConfigValues, initiliseState } from './initializer';
import { HEALTH_POINT_UNIT, HEALTH_CHECK_INTERVAL, TOILET_CLEAN_COMMAND, FULLNESS_POINT_UNIT, FEED }
 from '../utils/constants';

export class Pet {
  public state: IPetState;
  public readonly configValues: IPetConfig;
  constructor() {
    this.state = initiliseState();
    this.configValues = initiliseConfigValues();
    this.startLife();
    this.healthCheck();
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
    this.state.fullnessPoint === this.configValues.minFullnessPoint
    ? this.decreaseHealth() : undefined;
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
          Math.min(
            this.state.fullnessPoint + FULLNESS_POINT_UNIT, this.configValues.maxFullnessPoint);
        break;
    }
  }

  public decreaseHealth() {
    this.state.healthPoint = Math.max(
      this.state.healthPoint - HEALTH_POINT_UNIT, this.configValues.minHealthPoint);
  }

  public increaseHealth() {
    this.state.healthPoint = Math.min(
      this.state.healthPoint + HEALTH_POINT_UNIT, this.configValues.maxHealthPoint);
  }

}