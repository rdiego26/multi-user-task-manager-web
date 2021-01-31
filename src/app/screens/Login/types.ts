export enum MODES {
  'signup',
  'login'
}

export type LoginPayload = {
  readonly email: string,
  readonly password: string,
}

export type SignupPayload = LoginPayload & {
  readonly name: string
}