import ProjectTabs from "../components/project-tabs/project-tabs";

/**
 * Interface representing the project details view structure.
 * @interface ProjectDetailsViewProps
 */
interface ProjectDetailsViewProps {
  id: string;
}

const ProjectDetailsView = ({ id }: ProjectDetailsViewProps) => {
  return <ProjectTabs id={id} />;
};

export default ProjectDetailsView;
