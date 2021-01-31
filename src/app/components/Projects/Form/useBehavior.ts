import { useContext, useState } from "react";
import Context from "../../../../config/Context";
import { createProject } from "../../../../core/services/projects";
import { getMe } from "../../../../core/services/user";

const useBehavior = () => {
  const [loading, setLoading] = useState(false);
  const { state, actions } = useContext(Context);
  const handleSubmit = async (data: { name: string }) => {
    setLoading(true);
    const userId = state.user?.userId
    if(userId) {
      await createProject({ name: data.name, userId })
      const result = await getMe();
      if (result?.projects) {
        actions.setProjects(result.projects)
      }
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