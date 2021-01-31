import { memo, useContext } from "react";
import Context from "../../../config/Context";
import Header from "../../components/Header";
import Projects from "../../components/Projects";
import NewProjectForm from "../../components/Projects/Form";

const Home = () => {
  const { state } = useContext(Context);

  return (
    <>
      <Header name={state?.user?.name} />
      <NewProjectForm />
      <section>
        {state.projects.length > 0 
          ? <Projects projects={state.projects} />
          : <p>No projects found. Please create one</p>
        }        
      </section>
    </>
  )
}

export default memo(Home);
