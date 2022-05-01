import { useCommentsContext } from '@/hooks/useCommentsContext';
import { CommentsItem } from './CommentsItem/CommentsItem';
import styles from './CommentsList.module.css';

export const CommentsList: React.FC = () => {
  const comments = useCommentsContext();
  return (
    <section className={styles.container}>
      <h3 className={styles.heading}>Comments ({comments.length})</h3>
      <ul className={styles.list}>
        {comments.slice(0, -1).map((comment) => (
          <CommentsItem key={comment.data.id} comment={comment} />
        ))}
      </ul>
    </section>
  );
};
