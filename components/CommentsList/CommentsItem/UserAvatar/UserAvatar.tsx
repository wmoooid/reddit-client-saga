import useUser from '@/hooks/useUser';
import styles from './UserAvatar.module.css';

interface UserAvatarProps {
  userId: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ userId }) => {
  const { data } = useUser(userId);

  return <img src={data?.data?.icon_img} alt='' className={styles.avatar} />;
};
