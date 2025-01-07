import ModalComponent from "@/themes/components/modal/modal";
import styles from "./submit-timesheet-modal.module.scss";
import ButtonComponent from "@/themes/components/button/button";
import UseDashboardServices from "../../services/dashboard-services/dashboard-services";
import { message } from "antd";
interface SubmitTimeDueProps {
  onClose: () => void; // Function to handle closing the modal
  startDate: string;
  endDate: string;
  totalTime: string;
}

const TimeDueModal: React.FC<SubmitTimeDueProps> = ({
  onClose,
  startDate,
  endDate,
  totalTime,
}) => {

  const handleSaveTimesheetDue = async () => {
    try {
      const response = await UseDashboardServices().saveTimesheetDue(
        startDate,
        endDate
      );
      // Check if the response status is true
      if (response.status) {
        // Success message with response status message
        message.success(response.message || "Timesheet submitted successfully");
        location.reload()
      } else {
        // Handle failure if status is false or not present
        message.error(response.message || "Failed to submit timesheet");
      }
    } catch (error) {
      // In case of any error
      message.error("An error occurred while submitting the timesheet");
    }
  };

  return (
    <div className={styles.timeSheetSubmit}>
      <div>
        <ModalComponent
          isVisible={true}
          title={"Submit timesheet"}
          content={
            <div className={styles.centreContent}>
              <div>Are you sure you want to submit timesheet ?</div>
              <div>Totel time entered : {totalTime}</div>
            </div>
          }
          bottomContent={
            <div>
              <ButtonComponent theme="white" label="No" onClick={onClose} />
              <ButtonComponent
                theme="black"
                label="Yes"
                onClick={handleSaveTimesheetDue}
              />
            </div>
          }
          onClose={onClose}
          theme="normal"
        />
      </div>
    </div>
  );
};

export default TimeDueModal;
