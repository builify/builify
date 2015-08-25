const logger = store => next => action => {
  const { type } = action;
  let currentTime = new Date();
  let message = 'Action ' + type + ' @ ' + currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
  let result = next(action);

  console.info(message);

  return result;
};

export default logger;