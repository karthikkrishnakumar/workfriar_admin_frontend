import React from "react";
import { Input, InputProps } from "antd";
import styles from "./Input.module.scss";

interface CustomInputProps extends InputProps {
  label: string;
  width?: string | number; // Custom width for the input box
  height?: string | number;
}

const InputComponent: React.FC<CustomInputProps> = ({
  label,
  width = "100%",
  height = "100%",
  ...restProps
}) => (
  <div className={styles.inputContainer}>
    <label className={styles.label}>{label}</label>
    <Input {...restProps} />
  </div>
);

export default InputComponent;
