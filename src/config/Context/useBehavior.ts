import { useCallback, useReducer } from "react";
import { getProjects } from "../../core/services/projects";
import { getUser } from "../../core/services/user";
import { Project } from "../../utils/types/project";
import { User } from "../../utils/types/user";

enum ACTION_TYPES {
  setToken,
  setUser,
  setProjects
}

type State = {
  readonly token: string,
  readonly user: User | null,
  readonly projects: Project[]
}

type Action =
  | {
    type: ACTION_TYPES.setToken,
    payload: { token: string }
  }
  | {
    type: ACTION_TYPES.setUser,
    payload: {
      user: User | null
    }
  }
  | {
    type: ACTION_TYPES.setProjects,
    payload: {
      projects: Project[]
    }
  }

export const initialState = {
  token: '',
  user: getUser(),
  projects: getProjects()
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.setToken:
      return {
        ...state,
        token: action.payload.token
      }
    case ACTION_TYPES.setUser:
      return {
        ...state,
        user: action.payload.user
      }
    case ACTION_TYPES.setProjects:
      return {
        ...state,
        projects: action.payload.projects
      }
    default:
      return state
  }
}

const useBehavior = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setToken = useCallback(
    (token: string) => dispatch({
      type: ACTION_TYPES.setToken,
      payload: { token }
    }),
    [dispatch]
  );
  const clearToken = useCallback(() => setToken(''), [setToken]);

  const setUser = useCallback(
    (user: User | null) => dispatch({
      type: ACTION_TYPES.setUser,
      payload: { user }
    }),
    [dispatch]
  );
  const clearUser = useCallback(() => setUser(null), [setUser]);

  const setProjects = useCallback(
    (projects: Project[]) => dispatch({
      type: ACTION_TYPES.setProjects,
      payload: { projects: projects }
    }),
    [dispatch]
  );
  const clearProjects = useCallback(() => setProjects([]), [setProjects]);

  return {
    state,
    actions: {
      clearToken,
      setToken,
      clearUser,
      setUser,
      clearProjects,
      setProjects,
    }
  };
};

export default useBehavior