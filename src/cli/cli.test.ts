import { IPet } from '../types';
import { RENDER_INTERVAL } from '../utils/constants';
import { initialiseConfigValues, initialiseState } from '../pet/initializer';
import { HealthAgePointIndicator } from './indicators/healthAgePointIndicator';
jest.mock('./indicators/healthAgePointIndicator', () => {
  return{
    HealthAgePointIndicator: jest.fn().mockImplementation(() => {
      return{};
    }),
  };
});
import { ToiletAlertIndicator } from './indicators/toiletAlertIndicator';
jest.mock('./indicators/toiletAlertIndicator', () => {
  return{
    ToiletAlertIndicator: jest.fn().mockImplementation(() => {
      return{};
    }),
  };
});
import { StomachIndicator } from './indicators/stomachIndicator';
jest.mock('./indicators/StomachIndicator', () => {
  return{
    StomachIndicator: jest.fn().mockImplementation(() => {
      return{};
    }),
  };
});
import { SleepIndicator } from './indicators/sleepIndicator';
jest.mock('./indicators/SleepIndicator', () => {
  return{
    SleepIndicator: jest.fn().mockImplementation(() => {
      return{};
    }),
  };
});
import { commandPanel } from './panels/commandPanel';
jest.mock('./panels/commandPanel', () => {
  return{
    commandPanel: jest.fn(),
  };
});
import { screen } from './screen';
jest.mock('blessed');
const screenRenderMock = jest.fn();
jest.mock('./screen', () => {
  return{
    screen: { render: screenRenderMock },
  };
});

import { render } from './cli';

describe.only('cli', () => {
  beforeEach(() => {
    global.setInterval = ():any => {};
  });
  it.only('should render indicators', () => {
    const pet: IPet = {
      state: initialiseState(),
      configValues: initialiseConfigValues(),
      receiveCommand: jest.fn(),
    };
    render(pet);
    expect(HealthAgePointIndicator).toHaveBeenCalled();
    expect(ToiletAlertIndicator).toHaveBeenCalled();
    expect(StomachIndicator).toHaveBeenCalled();
    expect(SleepIndicator).toHaveBeenCalled();
  });
});