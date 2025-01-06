"use client";
import React, { ReactNode } from "react";
import styles from "./tabs.module.scss";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

interface TabComponentProps {
  headings: {
    key: string;
    label: string | ReactNode;
    content: React.ReactNode;
  }[]; // Array of headings and content
  onChange?: (key: string) => void;
  subHeading?: ReactNode;
  activeKey?: string;
}

/**
 * A reusable tab component that dynamically renders Ant Design tabs.
 * @param {TabComponentProps} props - Props for the TabComponent
 * @returns {JSX.Element} The rendered TabComponent
 */
const TabComponent: React.FC<TabComponentProps> = ({
  headings,
  onChange,
  subHeading,
  activeKey,
}) => {
  // Map headings into TabItems format for Ant Design
  const tabItems: TabsProps["items"] = headings.map((heading) => ({
    key: heading.key,
    label: <div className={styles.labelWrapper}>{heading.label}</div>,
    children: heading.content, // Content to render inside the tab
  }));

  return (
    <div className={styles.tabWrapper}>
      <div className={styles.subHeading}>{subHeading}</div>
      <Tabs
        items={tabItems}
        className={styles.customTabs}
        onChange={onChange}
        activeKey={activeKey}
      />
    </div>
  );
};

export default TabComponent;
