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
    const modalPosition: React.CSSProperties = {
      position: 'absolute',
    };
  
    // Top positioning logic
    if (offsetTop !== 0) {
      modalPosition.top = `${parentBounds.bottom + offsetTop}px`;
    } else if (offsetBottom !== 0) {
      const availableSpaceBelow = window.innerHeight - parentBounds.bottom;
      const availableSpaceAbove = parentBounds.top;
  
      if (availableSpaceBelow >= 0) {
        // Prefer positioning below if there's enough space
        modalPosition.top = `${parentBounds.bottom + offsetBottom}px`;
      } else {
        // Fallback to positioning above if below doesn't work
        modalPosition.bottom = `${availableSpaceAbove + offsetBottom}px`;
      }
    }
  
    // Left positioning logic
    if (offsetLeft !== 0) {
      modalPosition.left = `${parentBounds.left + offsetLeft}px`;
    } else if (offsetRight !== 0) {
      const availableSpaceRight = window.innerWidth - parentBounds.right;
      const availableSpaceLeft = parentBounds.left;
  
      if (availableSpaceRight >= 0) {
        // Prefer positioning from right edge of parent
        modalPosition.left = `${parentBounds.right - offsetRight}px`;
      } else {
        // Fallback to positioning from left side
        modalPosition.right = `${availableSpaceLeft + offsetRight}px`;
      }
    }
  
    // Ensure the modal stays within viewport
    const ensureInViewport = () => {
      const modalWidth = modalRef.current?.offsetWidth || 0;
      const modalHeight = modalRef.current?.offsetHeight || 0;
  
      // Check horizontal positioning
      if (modalPosition.left !== undefined) {
        const left = parseInt(modalPosition.left as string);
        if (left + modalWidth > window.innerWidth) {
          delete modalPosition.left;
          modalPosition.right = '10px';
        }
      }
  
      // Check vertical positioning
      if (modalPosition.top !== undefined) {
        const top = parseInt(modalPosition.top as string);
        if (top + modalHeight > window.innerHeight) {
          delete modalPosition.top;
          modalPosition.bottom = '10px';
        }
      }
    };
  
    // Call viewport check
    ensureInViewport();
  
    return modalPosition;
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
