function createAsyncForFlowsMiddleware() {
  
  const register = {};

  const take = (action) => {
    return new Promise(resolve => {
      register[action] = [...(register[action] || []), resolve];
    });
  };

  return {
    take,
    middleware: () => next => action => {

      if(register[action.type]) {
        register[action.type].forEach(resolve => resolve(action));
        register[action.type] = [];
      }
      return next(action);
    }
  };
};

export default createAsyncForFlowsMiddleware;



