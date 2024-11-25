import React from "react";
import styles from "./card-section.module.scss";

interface CardSectionProps {
  title: string;
  topRightContent?: React.ReactNode;
  centerContent: React.ReactNode;
  bottomContent?: React.ReactNode;
  className?: string; 
}

const CardSection: React.FC<CardSectionProps> = ({
  title,
  topRightContent,
  centerContent,
  bottomContent,
  className,
}) => {
  return (
    <div
      className={`${styles.card} ${className || ''}`} 
    >
      {/* Top Section */}
     
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {topRightContent && <div className={styles.topRight}>{topRightContent}</div>}
      </div>

      {/* Center Content */}
      <div className={styles.centerContent}>{centerContent}</div>

      {/* Bottom Content */}
      {bottomContent && <div className={styles.bottomContent}>{bottomContent}</div>}
    </div>
  );
};

export default CardSection;
