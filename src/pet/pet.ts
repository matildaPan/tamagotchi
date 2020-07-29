import { IPetState, IPetConfig, CommandType, IActivity, IHealthCheck } from '../types';
import { ToiletMovement, Digest, SleepRoutine, AgeProcess } from './activities';
import { initiliseConfigValues, initiliseState } from './initializer';
import { HealthCheck } from './health';
import { TOILET_CLEAN_COMMAND, FEED }
 from '../utils/constants';

export class Pet {
  public state: IPetState;
  public readonly configValues: IPetConfig;
  public readonly healthCheck: IHealthCheck;
  constructor() {
    this.state = initiliseState();
    this.configValues = initiliseConfigValues();
    this.healthCheck = new HealthCheck();
    this.healthCheck.bodyCheck(this);
    this.startLife();
  }

  private startLife() {
    this.performActivity(new ToiletMovement());
    this.performActivity(new Digest());
    this.performActivity(new SleepRoutine());
    this.performActivity(new AgeProcess());
  }

  performActivity(action: IActivity) {
    action.updateState(this);
  }

  public receiveCommand(command: CommandType) {
    switch (command){
      case TOILET_CLEAN_COMMAND:
        if (this.state.pooped) {
          this.state.pooped = false;
          this.healthCheck.increaseHealth(this);
        }
        break;
      case FEED:
        this.healthCheck.increaseFullness(this);
        break;
    }
  }

}