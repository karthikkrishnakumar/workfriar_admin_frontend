import React from "react";
import { Button } from "antd";
import styles from "./button.module.scss"; // SCSS module for styles

interface ButtonProps {
  label?: string;
  theme?:
    | "black"
    | "white"
    | "danger"
    | "filter"
    | "disabled"
    | "link"
    | "golden"
    | "mixed-gold";
  onClick?: () => void;
  link?: boolean;
  disabled?: boolean;
  filter?: boolean; // Add filter flag to props
  className?: string;
  content?: React.ReactNode; // Content prop for custom rendering
  defaultIcon?: React.ReactNode; // Icon to display by default
  hoverIcon?: React.ReactNode; // Icon to display on hover
  loading?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  theme = "",
  onClick,
  link = false,
  disabled = false,
  filter = false, // Default to false if not provided
  className = "",
  content,
  defaultIcon,
  hoverIcon,
}) => {
  // Determine class based on the theme prop
  const getButtonClass = (theme: string) => {
    switch (theme) {
      case "danger":
        return styles.red;
      case "white":
        return styles.white;
      case "black":
        return styles.black;
      case "filter":
        return styles.filter;
      case "disabled":
        return styles.disabled;
      case "link":
        return styles.link;
      case "golden":
        return styles.golden;
      case "mixed-gold":
        return styles.mixedGold;
      default:
        return styles.default;
    }
  };

  // Determine what to render in the button
  // const renderContent = () => {
  //   switch (true) {
  //     case !!content: // Render content if provided
  //       return content;
  //     case filter: // Render filter icon with label
  //       return (
  //         <span>
  //           {Icons.filter}
  //           {label}
  //         </span>
  //       );
  //     default: // Render label as default
  //       return label;
  //   }
  // };

  return (
    <Button
      className={`
      ${styles.button} 
      ${className}
      ${getButtonClass(theme)} 
      ${disabled && styles.disableCursor}
      ${link && styles.linkButton}
      `}
      onClick={onClick}
      icon={content}
    >
      {defaultIcon && (
        <span className={styles.iconWrapper}>
          <span className={styles.defaultIcon}>{defaultIcon}</span>
          <span className={styles.hoverIcon}>{hoverIcon}</span>
        </span>
      )}
      {label}
    </Button>
  );
};

export default ButtonComponent;
