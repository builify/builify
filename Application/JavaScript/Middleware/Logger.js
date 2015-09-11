const logger = store => next => action => {
  let currentTime = new Date();
  let message = 'Action ' + Symbol.keyFor(action.type) + ' @ ' + currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
  let result = next(action);

  console.info(message);

  return result;
};

export default logger;