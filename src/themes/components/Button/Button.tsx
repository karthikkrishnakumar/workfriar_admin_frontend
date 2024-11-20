import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
    label: string; 
    theme?: "black" | "white"; 
    onClick?: () => void; 
    flag?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, theme = "black", onClick, flag }) => {
    return (
        <button
            className={`${styles.button} ${theme === "black" ? styles.black : styles.white} ${
                flag ? styles.flagged : ""
            }`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
