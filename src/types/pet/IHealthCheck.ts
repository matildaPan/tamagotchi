export interface IHealthCheck {
  decreaseHealth: Function;
  increaseHealth: Function;
  increaseFullness: Function;
  toiletCheck: Function;
  stomachCheck: Function;
  bodyCheck: Function;
}