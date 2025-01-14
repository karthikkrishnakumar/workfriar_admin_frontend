import React from "react";
import styles from "./confirmation-modal.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import ButtonComponent from "@/themes/components/button/button";

interface ConfirmationModalProps {
  isVisible: boolean;
  confirmationType: string;
  confirmationHandlerFunction: () => void;
  cancelationHandlerFunction: () => void;
  additionalData?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  confirmationType,
  confirmationHandlerFunction,
  cancelationHandlerFunction,
  additionalData,
}) => {
  switch (confirmationType) {
    case "submit":
      return (
        <ModalComponent
          isVisible={isVisible}
          title="Submit timesheet"
          theme="normal"
          onClose={cancelationHandlerFunction}
          content={
            <div className={styles.modalContent}>
              <p>Are you sure you want to submit timesheet ?</p>
              <p>Total time entered : {additionalData} hrs </p>
            </div>
          }
          bottomContent={
            <>
            <ButtonComponent label="No" theme="white" onClick={cancelationHandlerFunction}/>
            <ButtonComponent label="Yes" theme="black" onClick={confirmationHandlerFunction}/>
            </>
          }
        />
      );

    case "delete":
      return (
        <ModalComponent
          isVisible={isVisible}
          title="Delete timesheet"
          theme="danger"
          onClose={cancelationHandlerFunction}
          content={
            <div className={styles.modalContent}>
              <p>Are you sure you want to delete timesheet ?</p>
            </div>
          }
          bottomContent={
            <>
            <ButtonComponent label="No" theme="white" onClick={cancelationHandlerFunction}/>
            <ButtonComponent label="Yes" theme="black" onClick={confirmationHandlerFunction}/>
            </>
          }
        />
      );

    case "accept":
      return (
        <ModalComponent
          isVisible={isVisible}
          title="Accept timesheet"
          theme="normal"
          onClose={cancelationHandlerFunction}
          content={
            <div className={styles.modalContent}>
              <p>Are you sure you want to accept timesheet ?</p>
            </div>
          }
          bottomContent={
            <>
            <ButtonComponent label="No" theme="white" onClick={cancelationHandlerFunction}/>
            <ButtonComponent label="Yes" theme="black" onClick={confirmationHandlerFunction}/>
            </>
          }
        />
      );

    case "reject":
      return (
        <ModalComponent
          isVisible={isVisible}
          title="Reject timesheet"
          theme="danger"
          onClose={cancelationHandlerFunction}
          content={
            <div className={styles.modalContent}>
              <p>Are you sure you want to accept timesheet ?</p>
            </div>
          }
          bottomContent={
            <>
            <ButtonComponent label="No" theme="white" onClick={cancelationHandlerFunction}/>
            <ButtonComponent label="Yes" theme="black" onClick={confirmationHandlerFunction}/>
            </>
          }
        />
      );
  }
};

export default ConfirmationModal;
