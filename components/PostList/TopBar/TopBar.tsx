import React from 'react';
import styles from './TopBar.module.css';
import { PostListContext } from '../PostList';
import { Icon_ListView } from '@/components/icons/Icon_ListView';
import { Icon_TileView } from '@/components/icons/Icon_TileView';

export const TopBar: React.FC = () => {
  const { listing, setIsTile } = React.useContext(PostListContext);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{listing}</h2>
      <div className={styles.viewPicker}>
        <span
          className={styles.viewPickerIcon}
          onClick={() => {
            setIsTile(false);
          }}>
          <Icon_ListView />
        </span>
        <span
          className={styles.viewPickerIcon}
          onClick={() => {
            setIsTile(true);
          }}>
          <Icon_TileView />
        </span>
      </div>
    </div>
  );
};
