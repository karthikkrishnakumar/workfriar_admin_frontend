import ProjectForecastTabs from "../components/project-forecast-tabs/project-forecast-tabs";

/**
 * Interface representing the project details view structure.
 * @interface ProjectDetailsViewProps
 */
interface ProjectDetailsViewProps {
  id: string;
}

const ForecastDetailsView = ({ id }: ProjectDetailsViewProps) => {
  return <ProjectForecastTabs id={id} />;
};

export default ForecastDetailsView;
