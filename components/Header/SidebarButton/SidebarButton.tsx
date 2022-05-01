import React from 'react';
import styles from './SidebarButton.module.css';
import { LayoutContext } from '@/components/Layout';
import { Icon_Burger } from '@/components/icons/Icon_Burger';

export const SidebarButton: React.FC = () => {
  const { showSidebar, setShowSidebar } = React.useContext(LayoutContext);
  return (
    <span
      onClick={() => {
        setShowSidebar(!showSidebar);
      }}
      className={styles.menuButton}>
      <Icon_Burger />
    </span>
  );
};
