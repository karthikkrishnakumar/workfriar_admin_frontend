import React, { useState, ReactNode } from "react";
import styles from "./tabbed-filter.module.scss";

interface TabbedComponentProps {
  tabs: { name: string; content: ReactNode }[];
}

const TabbedComponent: React.FC<TabbedComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.tabbedComponent}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${
              activeTab === index ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabbedComponent;
