import ModalComponent from "@/themes/components/modal/modal";
import styles from "./submit-timesheet-modal.module.scss";
import ButtonComponent from "@/themes/components/button/button";
interface submitTimeDueProps {
  onClose: () => void; // Function to handle closing the modal
  totalTime: string;
}

const TimeDueModal: React.FC<submitTimeDueProps> = ({ onClose , totalTime}) => {
  return (
    <div className={styles.timeSheetSubmit}>
      <div>
        <ModalComponent
          isVisible={true}
          title={"Submit timesheet"}
          content={
            <div className={styles.centreContent}>
              <div>
              Are you sure you want to submit timesheet ?
             </div>  
              <div>
              Totel time entered:{totalTime} 
             </div>  
            </div>
          }
          bottomContent={
            <div>
              <ButtonComponent theme="white" label="No" onClick={onClose} />
              <ButtonComponent theme="black" label="Yes" />
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
