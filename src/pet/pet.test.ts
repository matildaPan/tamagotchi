import { MAX_POINT, MAX_AGE, MIN_POINT } from '../utils/constants';
import { Pet } from './pet';
import { ToiletMovement, Digest, SleepRoutine, AgeProcess } from './activities';
import { HealthCheck } from './health';
import { CommandType } from '../types';

const toiletMovementUpdateStateMock = jest.fn();
jest.mock('./activities/toiletMovement', () => {
  return{
    ToiletMovement: jest.fn().mockImplementation(() => {
      return{ updateState: toiletMovementUpdateStateMock };
    }),
  };
});

const digestUpdateStateMock = jest.fn();
jest.mock('./activities/digest', () => {
  return{
    Digest: jest.fn().mockImplementation(() => {
      return {
        updateState: digestUpdateStateMock,
      };
    }),
  };
});

const sleepRoutineUpdateStateMock = jest.fn();
jest.mock('./activities/sleepRoutine', () => {
  return {
    SleepRoutine: jest.fn().mockImplementation(() => {
      return {
        updateState: sleepRoutineUpdateStateMock,
      };
    }),
  };
});

const ageProcessUpdateStateMock = jest.fn();
jest.mock('./activities/ageProcess', () => {
  return {
    AgeProcess: jest.fn().mockImplementation(() => {
      return {
        updateState: ageProcessUpdateStateMock,
      };
    }),
  };
});

const bodyCheckMock = jest.fn();
const increaseHealthMock = jest.fn();
const increaseFullnessMock = jest.fn();
jest.mock('./health/healthCheck', () => {
  return{
    HealthCheck: jest.fn().mockImplementation(() => {
      return {
        bodyCheck: bodyCheckMock,
        increaseHealth: increaseHealthMock,
        increaseFullness: increaseFullnessMock,
      };
    }),
  };
});

describe('Pet', () => {
  beforeEach(() => {
    global.setInterval = ():any => {};
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('init', () => {
    it('should have initial states and configValues', () => {
      const pet = new Pet();
      expect(pet.state).toEqual({
        healthPoint: 100,
        fullnessPoint: 100,
        sleepStatues: false,
        pooped: false,
        age: 1,
      });
      expect(pet.configValues).toEqual({
        maxAge: MAX_AGE,
        maxHealthPoint: MAX_POINT,
        maxFullnessPoint: MAX_POINT,
        minFullnessPoint: MIN_POINT,
        minHealthPoint: MIN_POINT,
      });

    });
    it('should start life with toilet movement', () => {
      const pet = new Pet();
      expect(ToiletMovement).toHaveBeenCalledTimes(1);
      expect(toiletMovementUpdateStateMock).toHaveBeenCalledTimes(1);
    });
    it('should start life with digest', () => {
      const pet = new Pet();
      expect(Digest).toHaveBeenCalledTimes(1);
      expect(digestUpdateStateMock).toHaveBeenCalledTimes(1);
    });
    it('should start life with sleep routine', () => {
      const pet = new Pet();
      expect(SleepRoutine).toHaveBeenCalledTimes(1);
      expect(sleepRoutineUpdateStateMock).toHaveBeenCalledTimes(1);
    });
    it('should start life with age process', () => {
      const pet = new Pet();
      expect(AgeProcess).toHaveBeenCalledTimes(1);
      expect(ageProcessUpdateStateMock).toHaveBeenCalledTimes(1);
    });
    it('should body check', () => {
      const pet = new Pet();
      expect(HealthCheck).toHaveBeenCalledTimes(1);
      expect(bodyCheckMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('perform activity', () => {
    it('should perform toilet movement', () => {
      const pet = new Pet();
      const toiletMovement = new ToiletMovement();
      pet.performActivity(toiletMovement);
      expect(toiletMovementUpdateStateMock).toHaveBeenCalledTimes(2);
      expect(digestUpdateStateMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('receive command', () => {
    it('clean toilet to get rid of the waste', () => {
      const pet = new Pet();
      pet.state.pooped = true;
      pet.receiveCommand(CommandType.CleanToilet);
      expect(increaseHealthMock).toHaveBeenCalledWith(pet);
      expect(pet.state.pooped).toBe(false);
      expect(increaseFullnessMock).not.toBeCalledWith(pet);
    });
    it('feed to increase the fullness', () => {
      const pet = new Pet();
      pet.state.pooped = true;
      pet.receiveCommand(CommandType.Feed);
      expect(increaseFullnessMock).toBeCalledWith(pet);
      expect(increaseHealthMock).not.toHaveBeenCalledWith(pet);
    });
    it('should do nothing when receive wrong command', () => {
      const pet = new Pet();
      pet.state.pooped = true;
      pet.receiveCommand('wrong command' as any);
      expect(increaseHealthMock).not.toHaveBeenCalled();
      expect(increaseFullnessMock).not.toHaveBeenCalled();
    });
  });

});