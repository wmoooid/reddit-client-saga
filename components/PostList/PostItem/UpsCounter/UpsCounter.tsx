import React from 'react';
import styles from './UpsCounter.module.css';
import { usePostContext } from '@/hooks/usePostContext';
import { formatNumber } from '@/utils/formatNumber';
import { getCookie } from 'cookies-next';
import { Icon_Upvote } from '@/components/icons/Icon_Upvote';
import { Icon_Downvote } from '@/components/icons/Icon_Downvote';
import { KeyedMutator } from 'swr';

interface UpsCounterProps {
  mutate: KeyedMutator<any[]>;
}

export const UpsCounter: React.FC<UpsCounterProps> = ({ mutate }) => {
  const { name, ups, likes } = usePostContext();

  const token = getCookie(`token`);

  async function handleUpvote() {
    await fetch('https://oauth.reddit.com/api/vote', {
      method: 'POST',
      headers: { Authorization: `bearer ${token}` },
      body: new URLSearchParams({
        id: `${name}`,
        dir: '1',
      }),
    });
    mutate();
  }

  async function handleDownvote() {
    await fetch('https://oauth.reddit.com/api/vote', {
      method: 'POST',
      headers: { Authorization: `bearer ${token}` },
      body: new URLSearchParams({
        id: `${name}`,
        dir: '-1',
      }),
    });
    mutate();
  }

  return (
    <div className={styles.upsCounter}>
      <button
        onClick={() => {
          handleUpvote();
        }}
        className={likes ? styles.upsUp_active : styles.upsUp}>
        <Icon_Upvote />
      </button>
      <strong className={styles.upsCount}>{formatNumber(ups)}</strong>
      <button
        onClick={() => {
          handleDownvote();
        }}
        className={likes === false ? styles.upsDown_active : styles.upsDown}>
        <Icon_Downvote />
      </button>
    </div>
  );
};
