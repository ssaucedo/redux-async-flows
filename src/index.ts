import { IMiddleware, IRegister, IAction, ITake } from "./module.d";

function createAsyncFlowsMiddleware(): IMiddleware {
  const register: IRegister = {};

  const take: ITake = (actionType: string): Promise<Array<Function>> => {
    if (typeof actionType === "string") {
      return new Promise(resolve => {
        register[actionType] = [...(register[actionType] || []), resolve];
      });
    }

    return Promise.reject(
      new Error(`Cannot take an ${typeof actionType}, string expected`),
    );
  };

  take.any = (...actionTypes: Array<string>): Promise<Array<Function>> =>
    Promise.race(actionTypes.map(take));

  take.all = (...actionTypes: Array<string>): Promise<Array<Array<Function>>> =>
    Promise.all(actionTypes.map(take));

  return {
    take,
    asyncFlowsMiddleware: () => (next: Function) => (action: IAction) => {
      if (register[action.type]) {
        register[action.type].forEach(resolve => resolve(action));
        register[action.type] = [];
      }
      return next(action);
    },
  };
}

export default createAsyncFlowsMiddleware;
