import { post } from "../../../utils/request"

type LoginPayload = {
  email: string | null | undefined,
  password: string | null | undefined
}

type SignupPayload = LoginPayload & {
  name: string | null | undefined,
}

enum URLS {
  login = '/login',
  signup = '/user'
}

enum STORAGE_KEYS {
  token = 'token'
}

export const getToken = () => localStorage.getItem(STORAGE_KEYS.token) ?? '';
export const setToken = (token: string) => localStorage.setItem(STORAGE_KEYS.token, token);

export const login = async ({ email, password }: LoginPayload) => {
  if (email && password) {
    const result = await post<LoginPayload, { id: string, token: string, userId: string }>(
      URLS.login,
      {email, password}
    )

    if (result?.token) {
      setToken(result.token);
    }

    return result;
  }
}

export const signup = (data: SignupPayload) => {
  if (data.name && data.email && data.password) {
    return post<SignupPayload, { id: string }>(
      URLS.signup,
      data,
    );
  }
}