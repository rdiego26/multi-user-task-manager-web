import { post } from "../../../utils/request"
import { Project } from "../../../utils/types/project"
import { getToken } from "../auth"

enum STORAGE_KEYS {
  projects = 'projects'
}

enum URLS {
  create = '/project',
  createTask = '/task'
}

export const setProjects = (projects: Project[] | null) => localStorage.setItem(
  STORAGE_KEYS.projects,
  JSON.stringify(projects ?? {})
)

export const getProjects = (): Project[] => {
  const projects = localStorage.getItem(
    STORAGE_KEYS.projects
  )

  return projects ? JSON.parse(projects) : []
}

export const createProject = ({ name, userId }: { name: string, userId: string }) => {
  return post<{ name: string, userId: string }, {}>(
    URLS.create,
    { name, userId },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getToken()
      }
    }
  )
}
