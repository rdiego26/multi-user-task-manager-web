import { get } from "../../../utils/request";
import { Project } from "../../../utils/types/project";
import { User } from "../../../utils/types/user";
import { getToken } from "../auth"
import { setProjects } from "../projects";

enum URLS {
  me = '/user/me'
}

enum STORAGE_KEYS {
  user = 'user'
}

type Response = {
  user: User & {
    projects: Project[]
  }
}

export const setUser = (user: User | null) => localStorage.setItem(
  STORAGE_KEYS.user,
  JSON.stringify(user ?? {})
)

export const getUser = (): User | null => {
  const user = localStorage.getItem(
    STORAGE_KEYS.user
  )

  return user ? JSON.parse(user) : null
}

export const getMe = async () => {
  const me = await get<{}, Response>(
    URLS.me,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getToken()
      }
    }
  );

  if (me?.user) {
    const { projects = [], ...user } = me.user;

    setUser(user);
    setProjects(projects);

    return {
      projects,
      user
    }
  }
}