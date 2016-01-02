export default function () {
  return function (next) {
    return function (action) {
      const { type } = action;
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      const currentSeconds = currentTime.getSeconds();
      const timeString = `${currentHours}:${currentMinutes}:${currentSeconds}`;
      const message = `Action ${type} @ ${timeString}`;

      console.log(`%c${message}`, 'background: #222; color: #bada55');

      return next(action);
    };
  };
};
