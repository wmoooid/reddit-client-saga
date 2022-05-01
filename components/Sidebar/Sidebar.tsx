import React from 'react';
import styles from './Sidebar.module.css';
import { GlobalListings } from './GlobalListings/GlobalListings';
import { SubscriptionsList } from './SubscriptionsList/SubscriptionsList';
import { LayoutContext } from '../Layout';

export const Sidebar = () => {
  const { showSidebar } = React.useContext(LayoutContext);

  return (
    <div className={showSidebar ? styles.container : styles.containerHide}>
      <GlobalListings />
      <SubscriptionsList />
    </div>
  );
};
