interface Register {
  [index: string]: Array<Function>;
}

interface Action {
  type: string;
  payload: object;
}

interface Output {
  take: Function;
  asyncFlowsMiddleware: Function;
}

function createAsyncFlowsMiddleware(): Output {
  const register: Register = {};

  const take = (actionType: string) =>
    new Promise(resolve => {
      register[actionType] = [...(register[actionType] || []), resolve];
    });

  return {
    take,
    asyncFlowsMiddleware: () => (next: Function) => (action: Action) => {
      if (register[action.type]) {
        register[action.type].forEach(resolve => resolve(action));
        register[action.type] = [];
      }
      return next(action);
    },
  };
}

export default createAsyncFlowsMiddleware;
