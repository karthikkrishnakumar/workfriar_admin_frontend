"use client";

import styles from './checkbox.module.scss'; 
import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';


interface CustomCheckboxProps {
  checked: boolean;
  onChange: (e: CheckboxChangeEvent) => void;
}

const CheckboxComponent: React.FC<CustomCheckboxProps> = ({ checked, onChange }) => {
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    onChange(e); 
  };

  return (
    <Checkbox 
      checked={checked} 
      onChange={handleCheckboxChange} 
      className={styles.checkbox} 
    />
  );
};

export default CheckboxComponent;
