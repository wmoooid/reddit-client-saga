import React from 'react';
import styles from './PostItem.module.css';
import { UpsCounter } from './UpsCounter/UpsCounter';
import { PostDetails } from './PostDetails/PostDetails';
import { PostPreview } from './PostPreview/PostPreview';
import { MenuButton } from './MenuButton/MenuButton';
import { KeyedMutator } from 'swr';

interface PostItemProps {
  isPostPage?: boolean;
  isTile?: boolean;
  mutate: KeyedMutator<any[]>;
}

export const PostItem: React.FC<PostItemProps> = ({ isPostPage = false, isTile = false, mutate }) => {
  if (isTile) {
    return (
      <li className={styles.tileBox}>
        <div className={styles.tileTop}>
          <div className={styles.tileLeft}>
            <UpsCounter mutate={mutate} />
            <span className={styles.tileDivider}></span>
            <PostDetails isTile={isTile} />
          </div>
          <div className={styles.rightSide}>
            <span className={styles.space}></span>
            <MenuButton />
          </div>
        </div>
        <PostPreview isPostPage={isTile} />
      </li>
    );
  }

  if (isPostPage) {
    return (
      <section className={styles.boxPage}>
        <div className={styles.topSide}>
          <UpsCounter mutate={mutate} />
          <span className={styles.dividerPage}></span>
          <PostDetails isPostPage={isPostPage} />
        </div>
        <PostPreview isPostPage={isPostPage} />
      </section>
    );
  }
  return (
    <li className={styles.box}>
      <div className={styles.leftSide}>
        <UpsCounter mutate={mutate} />
        <span className={styles.divider}></span>
        <PostDetails />
      </div>
      <div className={styles.rightSide}>
        <PostPreview />
        <span className={styles.space}></span>
        <MenuButton />
      </div>
    </li>
  );
};
