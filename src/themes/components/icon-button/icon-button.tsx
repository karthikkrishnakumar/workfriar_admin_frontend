import React from 'react';
import styles from './icon-button.module.scss';


interface IconButtonProps {
  icon: React.ReactNode; 
  onClick?: () => void; 
}
const IconButton:React.FC<IconButtonProps> = ({icon,onClick}) => {
  return (
    <div className={styles.IconButtonWrapper}>
      <button className={styles.customButton}><span>{icon}</span></button>
    </div>
  )
}

export default IconButton
