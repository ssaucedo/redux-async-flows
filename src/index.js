function createAsyncFlowsMiddleware() {

  const register = {};

  const take = (actionType) => {
    if (typeof actionType === 'string') {
      return new Promise(resolve => {
        register[actionType] = [...(register[actionType] || []), resolve];
      });
    }
    return Promise.reject(new Error(`Cannot take an ${typeof actionType}, string expected`))
  };

  take.any = (...actionTypes) => {
    return Promise.race(actionTypes.map(take))
  };

  take.all = (...actionTypes) => Promise.all(actionTypes.map(take))

  return {
    take,
    asyncFlowsMiddleware: () => next => action => {

      if (register[action.type]) {
        register[action.type].forEach(resolve => resolve(action));
        register[action.type] = [];
      }
      return next(action);
    }
  };
};

export default createAsyncFlowsMiddleware;



