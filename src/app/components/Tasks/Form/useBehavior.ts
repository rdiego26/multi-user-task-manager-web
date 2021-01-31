import { useContext, useState } from "react";
import Context from "../../../../config/Context";
import { createTask } from "../../../../core/services/tasks";
import { getMe } from "../../../../core/services/user";

const useBehavior = ({ projectId }: { projectId: string }) => {
  const [loading, setLoading] = useState(false);
  const { actions } = useContext(Context);

  const handleSubmit = async (data: { description: string }) => {
    setLoading(true);
    await createTask({ projectId, description: data.description })
    const result = await getMe();
    if (result?.projects) {
      actions.setProjects(result.projects)
    }
    setLoading(false);
  }


  return {
    state: {
      loading
    },
    actions: {
      handleSubmit
    }
  }
}

export default useBehavior;