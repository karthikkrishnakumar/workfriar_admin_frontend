import React, { forwardRef } from "react";
import styles from "./card-section.module.scss";

// Define the CardSectionProps interface for the expected props
/**
 * Props for the CardSection component
 *
 * @param title - The title of the card section (required).
 * @param topRightContent - Content that will be displayed in the top-right corner (optional).
 * @param centerContent - Main content that will be displayed in the center of the card (required).
 * @param bottomContent - Content that will be displayed at the bottom (optional).
 * @param className - Additional custom classes to be added to the card element (optional).
 */
interface CardSectionProps {
  title: string;
  topRightContent?: React.ReactNode;
  centerContent: React.ReactNode;
  bottomContent?: React.ReactNode;
  className?: string;
}

// Using forwardRef to forward the ref to the div element correctly
/**
 * CardSection Component
 *
 * A reusable component that represents a section with a title,
 * optional top-right, center, and bottom content.
 * It forwards the ref to the root div element.
 *
 * @param props - The props that the component expects.
 * @param ref - The ref that will be forwarded to the root div.
 * @returns JSX.Element - The rendered component.
 */
const CardSection = forwardRef<HTMLDivElement, CardSectionProps>(
  (
    { title, topRightContent, centerContent, bottomContent, className },
    ref
  ) => {
    return (
      <div ref={ref} className={`${styles.card} ${className ?? ""}`}>
        {/* Top Section */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {/* Conditionally render top-right content if provided */}
          {topRightContent && (
            <div className={styles.topRight}>{topRightContent}</div>
          )}
        </div>

        {/* Center Content */}
        <div className={styles.centerContent}>{centerContent}</div>

        {/* Bottom Content */}
        {bottomContent && (
          <div className={styles.bottomContent}>{bottomContent}</div>
        )}
      </div>
    );
  }
);

// Export the component
export default CardSection;
