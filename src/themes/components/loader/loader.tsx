import React from 'react';
import styles from './loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderDiv}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
