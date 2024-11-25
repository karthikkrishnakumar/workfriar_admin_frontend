import React from "react";
import styles from "./button.module.scss"; // SCSS module for styles
import { Button } from "antd";

interface ButtonProps {
    label: string; 
    theme?: "black" | "white"; 
    onClick?: () => void; 
    flag?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  theme = "",
  onClick,
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
      default:
        return styles.default; 
    }
  };

  return (
    <Button
      className={`${styles.button} ${getButtonClass(theme)}`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default Button;
