import React from "react";
import { Button } from "antd";
import styles from "./button.module.scss"; // SCSS module for styles
import Icons from "@/themes/images/icons/icons";


interface ButtonProps {
  label?: string;
  theme?: "black" | "white" | "danger" | "filter";
  onClick?: () => void;
  filter?: boolean; // Add filter flag to props
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  theme = "",
  onClick,
  filter = false, // Default to false if not provided
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
      default:
        return styles.default;
    }
  };

  

  
  return (

 
    <Button
      className={`${styles.button} ${getButtonClass(theme)}`}
      onClick={onClick}
    
    >
      {!filter? label:Icons.filter} {/* Only show label if filter is false */}


    </Button>
  );
};

export default ButtonComponent;
