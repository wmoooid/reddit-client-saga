import { Icon_Downvote } from '@/components/icons/Icon_Downvote';
import { Icon_Upvote } from '@/components/icons/Icon_Upvote';
import { formatNumber } from '@/utils/formatNumber';
import styles from './CommentBar.module.css';

interface CommentBar {
  ups: number;
}

export const CommentBar: React.FC<CommentBar> = ({ ups }) => {
  return (
    <>
      <button className={styles.upsUp}>
        <Icon_Upvote />
      </button>
      <strong className={styles.upsCount}>{formatNumber(ups)}</strong>
      <button className={styles.upsDown}>
        <Icon_Downvote />
      </button>
    </>
  );
};
