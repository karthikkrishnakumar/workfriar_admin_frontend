import React from "react";
import styles from "./skeleton-loader.module.scss";

interface SkeletonLoaderProps {
  count?: number; // Number of skeleton cards
  avatar?: boolean; // Whether to show an avatar skeleton
  title?: boolean; // Whether to show a title skeleton
  paragraph?: boolean | { rows: number }; // Paragraph rows or none
  input?: boolean; // Whether to show an input skeleton
  button?: boolean; // Whether to show a button skeleton
  profile?: boolean; 
  active?: boolean; // Enable shimmer animation
  width?: string; // Custom width for skeleton card
  className?: string; // Custom className for styling theme
  classNameItem?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 1,
  avatar = false,
  title = false,
  paragraph = false,
  input = false,
  button = false,
  profile = false,
  active = true,
  width = "100%",
  className = "",
  classNameItem = "",
}) => {
  return (
    <div className={`${className}`} style={{ width }}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`${styles.skeletonItem} ${className}`}>
          {/* Profile loader layout */}
          {profile && (
            <div className={`${styles.skeletonProfile} ${classNameItem}`}>
              <div className={`${styles.skeletonProfileAvatar}`} />
              <div className={`${styles.skeletonProfileContent}`}>
                <div className={`${styles.skeletonProfileTitle} `} />
                <div className={`${styles.skeletonSmallParagraph}`} />
              </div>
            </div>
          )}

          {/* Regular skeleton loader */}
          {avatar && !profile && (
            <div className={`${styles.skeletonAvatar} ${classNameItem}`} />
          )}
          {title && !profile && (
            <div className={`${styles.skeletonTitle} ${classNameItem}`} />
          )}
          {paragraph && !profile && (
            <div
              className={`${styles.skeletonParagraph} ${classNameItem}`}
              style={{
                height:
                  paragraph && typeof paragraph === "object"
                    ? `${paragraph.rows * 20}px`
                    : "15px",
              }}
            />
          )}
          {input && !profile && (
            <div className={`${styles.skeletonInput} ${classNameItem}`} />
          )}
          {button && !profile && (
            <div className={`${styles.skeletonButton} ${classNameItem}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
