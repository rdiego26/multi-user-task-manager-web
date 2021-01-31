import { memo } from "react";
import { Project } from "../../../utils/types/project"
import Tasks from "../Tasks";
import TaskForm from "../Tasks/Form";
import * as S from './styled';

type Props = {
  projects: Project[]
};

const Projects = ({ projects }: Props) => (
  <S.ProjectContainer>
    {projects.map(project => (
      <S.ProjectItem key={project.id}>
        <S.ProjectHeader>
          <S.ProjectTitle>
            {project.name} ({project.tasks.length} tasks)
          </S.ProjectTitle>
        </S.ProjectHeader>

        <Tasks tasks={project.tasks} />
        
        <footer>
          <TaskForm projectId={project.id} />
        </footer>
      </S.ProjectItem>
    ))}
  </S.ProjectContainer>
)

export default memo(Projects);
