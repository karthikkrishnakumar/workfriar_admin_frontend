"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import styles from "./drop-down-modal.module.scss";

interface DropDownModalProps {
  isVisible: boolean; // Controls visibility of the modal
  content: ReactNode; // Content to be displayed inside the modal
  theme: "black" | "white"; // Theme of the modal (black or white)
  onClose: () => void; // Function to close the modal
  parentRef: React.RefObject<HTMLDivElement>; // Reference to the parent component
  offsetTop?: number; // Optional offset for top positioning
  offsetLeft?: number; // Optional offset for left positioning
  offsetRight?: number; // Optional offset for right positioning
  offsetBottom?: number; // Optional offset for bottom positioning
  showSubModal?: boolean;
  subModalContent?: ReactNode;
}

/**
 * A reusable dropdown modal component with dynamic positioning and themes.
 *
 * @param {DropDownModalProps} props - Props passed to the component.
 * @returns {JSX.Element | null} The rendered DropDownModal component or null when not visible.
 */
const DropDownModal: React.FC<DropDownModalProps> = ({
  isVisible,
  content,
  theme,
  onClose,
  parentRef,
  offsetTop = 0, // Default offset values
  offsetLeft = 0,
  offsetRight = 0,
  offsetBottom = 0,
  showSubModal = false,
  subModalContent,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * Handles clicks outside the modal to close it.
   *
   * @param {MouseEvent} event - The mouse click event.
   */
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      parentRef.current &&
      !parentRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    // Add event listener to close the modal when clicking outside
    if (isVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isVisible]);

  /**
   * Calculates the position of the modal based on parent element and provided offsets.
   *
   * @returns {React.CSSProperties} Style object to position the modal.
   */
  const calculatePosition = () => {
    if (!parentRef.current) return {};
    const parentBounds = parentRef.current.getBoundingClientRect();

    return {
      top: offsetTop !== 0 ? `${parentBounds.bottom + offsetTop}px` : undefined,
      bottom:
        offsetBottom !== 0
          ? `${window.innerHeight - parentBounds.top + offsetBottom}px`
          : undefined,
      left:
        offsetLeft !== 0 ? `${parentBounds.left + offsetLeft}px` : undefined,
      right:
        offsetRight !== 0
          ? `${window.innerWidth - parentBounds.right + offsetRight}px`
          : undefined,
    };
  };

  return isVisible ? (
    <div
      className={`${styles.modalWrapper} ${
        theme === "black" ? styles.blackTheme : styles.whiteTheme
      }`}
      style={calculatePosition()} // Apply calculated position based on parent and offsets
      ref={modalRef}
    >
      <div className={styles.modalContent}>{content}</div> {/* Modal content */}
      {showSubModal && (
        <div className={styles.subModalContent}>{subModalContent}</div>
      )}
    </div>
  ) : null; // Return null if modal is not visible
};

export default DropDownModal;
