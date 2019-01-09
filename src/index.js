function createAsyncForFlowsMiddleware() {
  
  const register = {};

  const take = (action) => {
    console.log('take called', action)
    return new Promise(resolve => {
      register[action] = [...(register[action] || []), resolve];
    });

  };

  return {
    take: take,
    middleware: () => next => action => {
      console.log('dispatched', action)
      if(register[action.type]) {
        register[action.type].forEach(resolve => resolve(action));  
        register[action.type] = [];
      }
      return next(action);
    }
  };
};

export default createAsyncForFlowsMiddleware;



