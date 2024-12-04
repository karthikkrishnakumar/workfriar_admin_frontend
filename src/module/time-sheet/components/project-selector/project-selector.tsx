"use client";
import React, { useState } from "react";
import styles from "./project-selector.module.scss";
import SearchBar from "@/themes/components/search-bar/search-bar";
import Icons from "@/themes/images/icons/icons";

interface ProjectSelectorProps {
  setSelectedProject?: (project: string) => void;
  showSubmodal: boolean;
  setShowSubmodal: (status: boolean) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  setSelectedProject,
  showSubmodal,
  setShowSubmodal,
}) => {
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  const toggleShowSubModal = (projectId: number, projectName: string) => {
    setActiveProjectId(projectId); // Highlight active project
    setShowSubmodal(!showSubmodal); // Toggle submodal visibility
    if (setSelectedProject) {
      setSelectedProject(projectName); // Pass selected project to parent
    }
  };

  const projects = [
    { id: 1, name: "Danti" },
    { id: 2, name: "One View" },
    { id: 3, name: "Soezy" },
    { id: 4, name: "Overhead" },
    { id: 5, name: "Unutilized" },
  ];

  return (
    <div className={styles.projectSelectorWrapper}>
      <h2>Projects</h2>
      <SearchBar placeholder="Search" />
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={`${styles.projectListItem} ${
              activeProjectId === project.id ? styles.active : ""
            }`}
            onClick={() => toggleShowSubModal(project.id, project.name)} // Updated click handler
          >
            <div className={styles.projectWrapper}>
              {project.name}
              <span>{Icons.arrowRightGrey}</span>
            </div>
          </li>
        ))}
      </ul>
      <button className={styles.addProjectButton}>
        <span>{Icons.plusGold}</span> Add Project
      </button>
    </div>
  );
};

export default ProjectSelector;
