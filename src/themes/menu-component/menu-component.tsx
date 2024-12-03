"use client";
import React, { ReactNode } from "react";
import { Dropdown, Menu } from "antd";
import { MenuProps } from "antd";
import styles from "./menu-component.module.scss";

interface DropDownModalProps {
  isVisible: boolean; // Controls visibility of the modal
  content: ReactNode; // Content to be displayed inside the modal
  theme: "black" | "white"; // Theme of the modal (black or white)
  onClose: () => void; // Function to close the modal
  parentRef: React.RefObject<HTMLDivElement>; // Reference to the parent component
  offsetTop?: number; // Optional offset for top positioning
  offsetLeft?: number; // Optional offset for left positioning
  showSubModal?: boolean;
  subModalContent?: ReactNode;
}

const CustomMenu: React.FC<DropDownModalProps> = ({
  isVisible,
  content,
  theme,
  onClose,
  parentRef,
  offsetTop = 0,
  offsetLeft = 0,
  showSubModal = false,
  subModalContent,
}) => {
  if (!parentRef.current) return null;

  // Menu items (main content)
  const mainMenuItems: MenuProps["items"] = [
    {
      key: "main-content",
      label: <div className={styles.modalContent}>{content}</div>,
    },
    ...(showSubModal
      ? [
          {
            key: "sub-modal",
            label: (
              <div className={styles.subModalContent}>{subModalContent}</div>
            ),
          },
        ]
      : []),
  ];

  return (
    <Dropdown
      visible={isVisible}
      trigger={["click"]}
      overlay={
        <Menu
          mode="inline"
          items={mainMenuItems}
          className={theme === "black" ? styles.blackTheme : styles.whiteTheme}
        />
      }
      getPopupContainer={() => parentRef.current!} // Attach dropdown to the parent ref
      placement="bottomLeft" // Default dropdown placement
      overlayStyle={{
        marginTop: offsetTop,
        marginLeft: offsetLeft,
        zIndex: 1000,
      }}
      onOpenChange={(visible) => {
        if (!visible) onClose(); // Handle close when dropdown visibility changes
      }}
    >
      <div />
    </Dropdown>
  );
};

export default CustomMenu;
