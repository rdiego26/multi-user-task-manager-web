import { createContext, ReactNode } from "react";
import { Project } from "../../utils/types/project";
import { User } from "../../utils/types/user";
import useBehavior, { initialState } from "./useBehavior";


const Context = createContext({
  state: initialState,
  actions: {
    clearToken: () => { },
    setToken: (token: string) => { },
    clearUser: () => { },
    setUser: (user: User | null) => { },
    clearProjects: () => { },
    setProjects: (projects: Project[]) => { },
  }
});

type Props = {
  children: ReactNode,
}

export const Provider = ({ children }: Props) => {
  const behavior = useBehavior();

  return (
    <Context.Provider value={behavior}>
      {children}
    </Context.Provider>
  );
}

export default Context;