import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../../config/Context";
import { login, signup } from "../../../core/services/auth";
import { getMe } from "../../../core/services/user";
import { LoginPayload, MODES, SignupPayload } from "./types";

type Data = {
  state: {
    mode: MODES,
  },
  actions: {
    changeMode: () => void,
    handleSubmit: (data: SignupPayload) => Promise<void>,
  }
}

const useBehavior = (): Data => {
  const history = useHistory();
  const { actions } = useContext(Context);
  const [mode, setMode] = useState<MODES>(MODES.login)

  const changeMode = () => setMode(
    prevState => prevState === MODES.login
      ? MODES.signup
      : MODES.login
  )

  const handleLogin = async (data: LoginPayload) => {
    const { userId, id } = await login(data) || {};
    if (userId && id) {
      const result = await getMe()
      if (result?.user && result?.projects) {
        actions.setUser({ ...result.user, id, userId })
        actions.setProjects(result.projects);
      }
      history.push('/');
    }
  };

  const handleSignup = async (data: SignupPayload) => {
    const result = await signup(data)

    if (result?.id) {
      setMode(MODES.login)
    }
  }

  const handleSubmit = (data: SignupPayload) => {
    const isLogin = mode === MODES.login;
    const action = isLogin ? handleLogin : handleSignup;
    return action(data as SignupPayload);
  }

  return {
    state: {
      mode,
    },
    actions: {
      changeMode,
      handleSubmit,
    }
  }
}

export default useBehavior;
