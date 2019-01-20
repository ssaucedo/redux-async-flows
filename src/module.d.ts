export interface IRegister {
  [index: string]: Array<Function>;
}

export interface IAction {
  type: string;
  payload: object;
}

export interface ITake{
  (actionType: string): Promise<Array<Function>>,
  any: (...actionTypes: Array<string>) => Promise<Array<Function>>,
  all: (...actionTypes: Array<string>) => Promise<Array<Array<Function>>>
}

export interface IMiddleware {
  take: ITake;
  asyncFlowsMiddleware: Function;
}

