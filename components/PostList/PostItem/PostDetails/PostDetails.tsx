import React from 'react';
import styles from './PostDetails.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePostContext } from '@/hooks/usePostContext';
import { formatDate } from '@/utils/formatDate';

interface PostDetailsProps {
  isPostPage?: boolean;
  isTile?: boolean;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ isPostPage = false, isTile = false }) => {
  const { title, subreddit_name_prefixed, created, id } = usePostContext();

  const router = useRouter();

  if (isTile) {
    return (
      <div className={styles.postDetailsTile}>
        <Link href={`/post/${id}`} shallow={true}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
        <div className={styles.creatorInfo}>
          <Link href={`/${subreddit_name_prefixed}`} shallow={true}>
            <small className={styles.subreddit}>{subreddit_name_prefixed}</small>
          </Link>
          <small className={styles.creatorDate}>{formatDate(created)}</small>
        </div>
      </div>
    );
  }

  if (isPostPage) {
    return (
      <div className={styles.postDetailsPage}>
        <div className={styles.creatorInfoPage}>
          <Link href={`/${subreddit_name_prefixed}`} shallow={true}>
            <small className={styles.subreddit}>{subreddit_name_prefixed}</small>
          </Link>
          <small className={styles.creatorDatePage}>{formatDate(created)}</small>
        </div>
        <h1 onClick={() => router.back()} className={styles.titlePage}>
          {title}
        </h1>
      </div>
    );
  }

  return (
    <div className={styles.postDetails}>
      <Link href={`/post/${id}`} shallow={true}>
        <h3 className={styles.title}>{title}</h3>
      </Link>
      <div className={styles.creatorInfo}>
        <Link href={`/${subreddit_name_prefixed}`} shallow={true}>
          <small className={styles.subreddit}>{subreddit_name_prefixed}</small>
        </Link>
        <small className={styles.creatorDate}>{formatDate(created)}</small>
      </div>
    </div>
  );
};
