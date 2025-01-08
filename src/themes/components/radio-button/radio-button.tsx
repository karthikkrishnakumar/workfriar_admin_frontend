"use client";

import styles from './radio-button.module.scss'; 
import React from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';

interface CustomRadioProps {
  checkedValue: string | number | null; // Allow null as a valid value
  value: string | number;
  onChange: (e: RadioChangeEvent) => void;
}

const RadioComponent: React.FC<CustomRadioProps> = ({ checkedValue, value, onChange }) => {
  const handleRadioChange = (e: RadioChangeEvent) => {
    onChange(e); 
  };

  return (
    <Radio 
      checked={checkedValue === value} 
      onChange={handleRadioChange} 
      value={value}
      className={styles.radio}
    />
  );
};

export default RadioComponent;
