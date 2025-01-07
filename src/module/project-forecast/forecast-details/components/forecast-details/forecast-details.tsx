"use client";
import { useState, useEffect } from "react";
import styles from "./forecast-details.module.scss";
import { Col, message, Row } from "antd";
import GridContainer from "@/themes/components/grid-container/grid-container";
import useProjectForecastService, {
  ProjectForecastData,
} from "@/module/project-forecast/project-forecast/services/project-forecast/project-forecast";
import EditForecastModal from "@/module/project-forecast/project-forecast/components/edit-forecast-modal/edit-forecast-modal";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import dayjs from "dayjs";

/**
 * Interface representing the forecast details structure.
 * This interface defines the props for the ForecastDetails component.
 * @interface ForecastDetailsProps
 */
interface ForecastDetailsProps {
  id: string;
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}

const ForecastDetails = ({
  id,
  isModalOpen,
  setModalOpen,
}: ForecastDetailsProps) => {
  const { fetchProjectForecastDetailsById, updateProjectForecast } =
    useProjectForecastService();
  const [forecast, setForecast] = useState<ProjectForecastData | null>(null);
  const [selectedForecast, setSelectedForecast] =
    useState<ProjectForecastData | null>(null);

  // useEffect hook to fetch forecast data based on the ID when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchProjectForecastDetailsById(id); // Make sure you pass the ID
        setForecast(result.data);
        setSelectedForecast({
          ...result,
          opportunity_start_date: dayjs(
            result.opportunity_start_date,
            "DD/MM/YYYY"
          ),
          opportunity_close_date: dayjs(
            result.opportunity_close_date,
            "DD/MM/YYYY"
          ),
          expected_start_date: dayjs(result.expected_start_date, "DD/MM/YYYY"),
          expected_end_date: dayjs(result.expected_end_date, "DD/MM/YYYY"),
        });
      } catch (error) {
        message.error("Failed to fetch project details.");
      }
    };

    fetchDetails();
  }, []);

  /**
   * Handles the form submission from the EditProjectForecastModal
   * @param {Record<string, any>} values - The updated values for the ProjectForecast
   */
  const handleEditProjectForecastSubmit = async (
    values: Record<string, any>
  ) => {
    try {
      const response = await updateProjectForecast(values);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
    setModalOpen(false); // Close modal after submission
  };

  if (!forecast) {
    return (
      <div className={styles.loadingWrapper}>
        <SkeletonLoader
          count={20}
          button={true}
          width="100%"
          classNameItem={styles.customSkeletonItem}
        />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.forecastDetailsWrapper}>
        <GridContainer
          isGrid={true}
          fields={[
            { label: "Opportunity name", value: forecast?.opportunity_name },
            {
              label: "Opportunity manager",
              value: forecast?.opportunity_manager,
            },
            { label: "Client name", value: forecast?.client_name },
          ]}
        />
        <GridContainer
          isGrid={false}
          fields={[
            {
              label: "Opportunity description",
              value: forecast?.opportunity_description || "",
            },
          ]}
        />
        <GridContainer
          isGrid={true}
          fields={[
            {
              label: "Opportunity start date",
              value: dayjs(forecast?.opportunity_start_date).format(
                "DD/MM/YYYY"
              ),
            },
            {
              label: "Tentative opportunity close date",
              value: dayjs(forecast?.opportunity_close_date).format(
                "DD/MM/YYYY"
              ),
            },
            { label: "Billing model", value: forecast?.billing_model || "" },
            {
              label: "Expected start date",
              value: dayjs(forecast?.expected_project_start_date).format("DD/MM/YYYY"),
            },
            {
              label: "Expected end date",
              value: dayjs(forecast?.expected_project_end_date).format("DD/MM/YYYY"),
            },
            {
              label: "Estimated revenue",
              value: forecast?.estimated_revenue || "",
            },
            { label: "Opportunity stage", value: forecast?.opportunity_stage },
            {
              label: "Expected resource breakdown",
              value: forecast?.expected_resource_breakdown || "",
            },
            { label: "Status", value: forecast?.status },
          ]}
        />
        <h3>Associated core members</h3>

        <GridContainer
          isGrid={true}
          fields={[
            { label: "Project Manager", value: forecast?.project_manager || "" },
            {
              label: "Product Manager",
              value: forecast?.product_manager || "",
            },
            { label: "Tech lead", value: forecast?.tech_lead || ""},
            { label: "Account Manager", value: forecast?.account_manager || ""},
          ]}
        />
        <h3>Team forecast</h3>
        <GridContainer
          isGrid={true}
          fields={[
            {
              label: "Estimated Project completion %",
              value: forecast?.estimated_project_completion || "",
            },
          ]}
          children={
            <div>
              <Row gutter={[16, 16]} align="middle" className={styles.gridRow}>
                <Col>
                  <p>Team member</p>
                </Col>
                <Col>
                  <p>Forecasted hours</p>
                </Col>
              </Row>

              {forecast?.team_forecast?.map((teamMember, index) => (
                <Row
                  key={index}
                  gutter={[16, 16]}
                  align="middle"
                  className={styles.gridRow}
                >
                  <Col>
                    <h4>{teamMember.name}</h4>
                  </Col>
                  <Col>
                    <h4>{teamMember.forecast_hours} hrs</h4>
                  </Col>
                </Row>
              ))}
            </div>
          }
        />
      </div>
      <EditForecastModal
        isEditModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleEditProjectForecastSubmit}
        initialValues={selectedForecast}
      />
    </div>
  );
};

export default ForecastDetails;
