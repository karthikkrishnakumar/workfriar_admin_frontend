import React from "react";
import styles from "./skeleton-loader.module.scss";

interface SkeletonLoaderProps {
  count?: number; // Number of skeleton cards
  avatar?: boolean; // Whether to show an avatar skeleton
  title?: boolean; // Whether to show a title skeleton
  paragraph?: boolean | { rows: number }; // Paragraph rows or none
  input?: boolean; // Whether to show an input skeleton
  button?: boolean; // Whether to show a button skeleton
  active?: boolean; // Enable shimmer animation
  width?: string; // Custom width for skeleton card
  className?: string; // Custom className for styling theme
  classNameItem?:string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 1,
  avatar = false,
  title = false,
  paragraph = false,
  input = false,
  button = false,
  active = true,
  width = "100%",
  className = "",
  classNameItem=""
}) => {
  return (
    <div className={`${className}`} style={{ width }}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`${styles.skeletonItem} ${className}`}>
          {avatar && <div className={`${styles.skeletonAvatar} ${classNameItem}`} />}
          {title && <div className={`${styles.skeletonTitle} ${classNameItem}`} />}
          {paragraph && (
            <div
              className={`${styles.skeletonParagraph} ${classNameItem}`}
              style={{ height: paragraph && typeof paragraph === "object" ? `${paragraph.rows * 20}px` : "15px" }}
            />
          )}
          {input && <div className={`${styles.skeletonInput} ${classNameItem}`} />}
          {button && <div className={`${styles.skeletonButton} ${classNameItem}`} />}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
