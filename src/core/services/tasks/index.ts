import { post, put } from "../../../utils/request"
import { Task } from "../../../utils/types/task"
import { getToken } from "../auth"

enum URLS {
  default = '/task'
}

export const createTask = (payload: { projectId: string, description: string }) => {
  return post(
    URLS.default,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getToken()
      }
    }
  )
}

export const finishTask = (task: Task) => {
  return put(
    `${URLS.default}/${task.id}`,
    { ...task, finishedAt: new Date().toISOString() },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getToken()
      }
    }
  )
}