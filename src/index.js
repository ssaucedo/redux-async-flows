function createAsyncFlowsMiddleware() {
  
  const register = {};

  const take = (action) => {
    return new Promise(resolve => {
      register[action] = [...(register[action] || []), resolve];
    });
  };

  return {
    take,
    asyncFlowsMiddleware: () => next => action => {

      if(register[action.type]) {
        register[action.type].forEach(resolve => resolve(action));
        register[action.type] = [];
      }
      return next(action);
    }
  };
};

export default createAsyncFlowsMiddleware;



