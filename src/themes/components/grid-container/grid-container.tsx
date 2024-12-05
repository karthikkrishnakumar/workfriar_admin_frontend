import React from "react";
import styles from "./grid-container.module.scss";
import CustomAvatar from "@/themes/components/avatar/avatar";

/**
 * GridContainerProps Interface
 * @interface
 * @property {boolean} isGrid - Determines whether the component should render as a grid or a stacked layout.
 * @property {object} [avatar] - Optional avatar object containing name, profile URL, and size.
 *   @property {string} name - Name of the avatar (used for accessibility or fallback text).
 *   @property {string} profile - Profile image URL of the avatar.
 *   @property {number} size - Size of the avatar in pixels.
 * @property {Array} fields - Array of field objects representing label-value pairs to display.
 *   @property {string} label - Label for the field.
 *   @property {string | number | null} value - Value associated with the label. If null, a default placeholder is displayed.
 */
interface GridContainerProps {
  isGrid: boolean;
  avatar?: { name: string; profile: string; size: number };
  fields: { label: string; value: string | number | null }[] | null;
}

/**
 * GridContainer Component
 * @description A reusable component to display content in a grid or stacked layout with optional avatar support.
 * @param {GridContainerProps} props - Props containing layout type, avatar data, and fields to display.
 * @returns {JSX.Element} A styled grid or stacked layout based on the `isGrid` prop.
 */
const GridContainer: React.FC<GridContainerProps> = ({
  isGrid,
  avatar,
  fields,
}) => {
  return (
    <div className={styles.header}>
      {/* Render as Grid if isGrid is true */}
      {isGrid ? (
        <div className={styles.headerGrid}>
          {/* Display Avatar if avatar prop is provided */}
          {avatar && (
            <CustomAvatar
              name={avatar.name}
              profile={avatar.profile}
              size={avatar.size}
            />
          )}

          {/* Map through fields array and render each field in a grid layout */}
          {fields?.map((field, index) => (
            <div className={styles.field} key={index}>
              <div className={styles.label}>{field.label}</div>
              <div className={styles.value}>{field.value || "--"}</div>
            </div>
          ))}
        </div>
      ) : (
        // Render as a stacked layout if isGrid is false
        fields?.map((field, index) => (
          <div className={styles.field} key={index}>
            <div className={styles.label}>{field.label}</div>
            <div className={styles.value}>
              {field.value || "No data available."}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GridContainer;
