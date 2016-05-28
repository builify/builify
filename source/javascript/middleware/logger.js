export default function (store) {
  return function (next) {
    return function (action) {
      if (process.env.NODE_ENV === 'development') {
        console.groupCollapsed(action.type); // eslint-disable-line

        let result = next(action);

        console.log('next state', store.getState()); // eslint-disable-line
        console.groupEnd(action.type); // eslint-disable-line

        return result;
      } else {
        return next(action);
      }
    };
  };
} 
