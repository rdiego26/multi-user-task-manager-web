import { memo, useContext, useMemo } from "react"
import Context from "../../../config/Context";
import { finishTask } from "../../../core/services/tasks";
import { getMe } from "../../../core/services/user";
import { Task } from "../../../utils/types/task";
import * as S from './styled';

type Props = {
  tasks: Task[],
}

const Tasks = ({ tasks }: Props) => {
  const { actions } = useContext(Context);

  const {
    areAllFinished,
    availableTasks,
    finishedTasks
  } = useMemo(() => (
    tasks.reduce<{ areAllFinished: boolean, availableTasks: Task[], finishedTasks: Task[] }>(
      (acc, task) => ({
        areAllFinished: acc.areAllFinished && Boolean(task.finishedAt),
        availableTasks: task.finishedAt ? acc.availableTasks : [...acc.availableTasks, task],
        finishedTasks: task.finishedAt ? [...acc.finishedTasks, task] : acc.finishedTasks,
      }),
      { areAllFinished: true, availableTasks: [], finishedTasks: [] }
    )), [tasks])

  const handleChange = (task: Task) => async () => {
    await finishTask(task);
    const result = await getMe();
    if (result?.projects) {
      actions.setProjects(result.projects)
    }
  }

  return (
    <div>
      <S.TaskContainer>
        <header>
          To do
          {areAllFinished && <p>Congrats! 🎉</p>}
          {availableTasks.map(task => (
              <S.TaskItem key={task.id}>
                <input
                  type="checkbox"
                  onChange={handleChange(task)}
                  id={task.id}
                />
                <label
                  htmlFor={task.id}
                >
                  {task.description}
                </label>
              </S.TaskItem>
            ))}
        </header>
      </S.TaskContainer>

      <S.TaskContainer>
        <header>
          Done
          {finishedTasks.map(task => (
              <S.TaskItem key={task.id}>
                <input
                  type="checkbox"
                  onChange={handleChange(task)}
                  id={task.id}
                  checked={Boolean(task.finishedAt)}
                  disabled={Boolean(task.finishedAt)}
                />
                <label
                  htmlFor={task.id}
                >
                  {task.description}
                </label>
              </S.TaskItem>
            ))}
        </header>
      </S.TaskContainer>

    </div>
  )
}

export default memo(Tasks);
