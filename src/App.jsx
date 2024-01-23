// v1 working

import { useState } from "react";

import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex gap-8">
        <ProjectsSidebar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectsState.selectedProjectId}
        />
        <div className="flex-grow">{content}</div>
      </main>
      <footer className="text-center py-4">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl mb-2">
            Made by <span className="font-bold">Rakshit</span>
          </h3>
          <div className="flex gap-4">
            <a
              href="https://github.com/Acksout"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <img
                src="https://cdn.discordapp.com/attachments/1199226746902433802/1199226844084445214/github-color-svgrepo-com.svg?ex=65c1c608&is=65af5108&hm=0e6ada272b9959c4f598913f3b4c22f5620034136862b0d5051e116e37437e77&"
                alt="github-icon"
                width={35}
                height={35}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/rakshitsbb/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <img
                src="https://cdn.discordapp.com/attachments/1199226746902433802/1199226844638105670/linkedin-icon-svgrepo-com.svg?ex=65c1c608&is=65af5108&hm=ebb8894a41419e8923fc453b0389a00c1e76ae96800d042eb994653ef71f0cec&"
                alt="linkedin-icon"
                width={35}
                height={35}
              />
            </a>
            <a
              href="https://twitter.com/Rakshit1337"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <img
                src="https://cdn.discordapp.com/attachments/1199226746902433802/1199226844344487996/twitter-svgrepo-com.svg?ex=65c1c608&is=65af5108&hm=e2ff175f294ab5fe24347cfabbd82b0bdc080a92d1c5bedc100b310478f7fad0&"
                alt="twitter-icon"
                width={35}
                height={35}
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
