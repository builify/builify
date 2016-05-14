export default function (store) {
  return function (next) {
    return function (action) {
      console.groupCollapsed(action.type);

      let result = next(action);

      console.log('next state', store.getState());
      console.groupEnd(action.type);

      return result;
    };
  };
};
