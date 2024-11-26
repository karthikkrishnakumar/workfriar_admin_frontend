"use client";
import React from "react";
import styles from './tabs.module.scss';
import { Tabs } from "antd";
import type { TabsProps } from "antd";

interface TabComponentProps {
  headings: { key: string; label: string; content: React.ReactNode }[]; // Array of headings and content
}

/**
 * A reusable tab component that dynamically renders Ant Design tabs.
 * @param {TabComponentProps} props - Props for the TabComponent
 * @returns {JSX.Element} The rendered TabComponent
 */
const TabComponent: React.FC<TabComponentProps> = ({ headings }) => {
  // Map headings into TabItems format for Ant Design
  const tabItems: TabsProps["items"] = headings.map((heading) => ({
    key: heading.key,
    label: heading.label,
    children: heading.content, // Content to render inside the tab
  }));

  return <Tabs items={tabItems} className={styles.customTabs} />;
};

export default TabComponent;
