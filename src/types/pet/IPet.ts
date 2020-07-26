import { IPetState } from './IPetState';
import { IPetConfig } from './IPetConfig';

export interface IPet {
  state: IPetState;
  configValues: IPetConfig;
}