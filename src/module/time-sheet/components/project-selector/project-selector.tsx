"use client";
import React, { useEffect, useState } from "react";
import styles from "./project-selector.module.scss";
import SearchBar from "@/themes/components/search-bar/search-bar";
import Icons from "@/themes/images/icons/icons";
import { ProjectList } from "@/interfaces/timesheets/timesheets";
import UseAllTimesheetsServices from "../../services/all-timesheet-services/all-time-sheet-services";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import { Empty } from "antd";

/**
 * Interface for the props of the ProjectSelector component.
 *
 * @interface ProjectSelectorProps
 * @property {Function} [setSelectedProject] - Optional callback function to pass the selected project to the parent component.
 * @property {boolean} showSubmodal - Boolean to control the visibility of the submodal.
 * @property {Function} setShowSubmodal - Function to toggle the visibility of the submodal.
 */
interface ProjectSelectorProps {
  setSelectedProject?: (project: ProjectList) => void;
  showSubmodal: boolean;
  setShowSubmodal: (status: boolean) => void;
}

/**
 * ProjectSelector component allows the user to select a project from a list.
 * It displays a search bar and a list of projects with the ability to select a project.
 * Once a project is selected, the submodal visibility is toggled, and the selected project is passed to the parent.
 *
 * @component
 * @example
 * // Usage example:
 * <ProjectSelector showSubmodal={showSubmodal} setShowSubmodal={setShowSubmodal} setSelectedProject={setSelectedProject} />
 *
 * @param {ProjectSelectorProps} props - Component properties.
 * @returns {React.ReactElement} The rendered component.
 */
const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  setSelectedProject,
  showSubmodal,
  setShowSubmodal,
}) => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  /**
   * Toggles the visibility of the submodal and sets the active project.
   * Also passes the selected project to the parent component.
   *
   * @param {string} projectId - The ID of the selected project.
   * @param {string} projectName - The name of the selected project.
   */
  const toggleShowSubModal = (projectId: string, projectName: string) => {
    setActiveProjectId(projectId); // Highlight active project
    setShowSubmodal(!showSubmodal); // Toggle submodal visibility
    if (setSelectedProject) {
      setSelectedProject({ id: projectId, project_name: projectName }); // Pass selected project to parent
    }
  };

  const [projects, setProjects] = useState<ProjectList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const response =
        await UseAllTimesheetsServices().fetchProjectsToAddNewTimesheet();
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Effect hook to fetch the list of projects from the service.
   */
  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className={styles.projectSelectorWrapper}>
      <h2>Projects</h2>
      <SearchBar value="" placeholder="Search" onChange={() => {}} />
      {loading ? (
        <SkeletonLoader />
      ) : projects.length === 0 ? (
        <Empty />
      ) : (
        <>
          <ul>
            {projects?.map((project) => (
              <li
                key={project.id}
                className={`${styles.projectListItem} ${
                  activeProjectId === project.id ? styles.active : ""
                }`}
                onClick={() =>
                  toggleShowSubModal(project.id, project.project_name)
                } // Updated click handler
              >
                <div className={styles.projectWrapper}>
                  {project.project_name}
                  <span>{Icons.arrowRightGrey}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <button className={styles.addProjectButton}>
        <span>{Icons.plusGold}</span> Add Project
      </button>
    </div>
  );
};

export default ProjectSelector;
