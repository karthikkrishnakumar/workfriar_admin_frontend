import React from "react";
import { Skeleton } from "antd";
import styles from "./skeleton-loader.module.scss";

interface SkeletonLoaderProps {
  count?: number; // Number of skeleton cards
  avatar?: boolean; // Whether to show an avatar skeleton
  title?: boolean; // Whether to show a title skeleton
  paragraph?: boolean | { rows: number }; // Paragraph rows or none
  active?: boolean; // Enable shimmer animation
  width?: string; // Custom width for skeleton card
  className?: string; // Custom className for styling theme
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 1,
  active = true,
  className,
}) => {
  return (
    <div className={`${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`${styles.skeletonItem}${className}`}>
          <Skeleton.Input active={active} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
