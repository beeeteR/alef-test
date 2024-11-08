export interface IWarning {
  name: false | string,
  age: false | string
}

export interface IWarningWithId extends IWarning {
  id: number
}

export interface IWarningsUserAndChildren {
  user: IWarning,
  children: IWarningWithId[]
}
