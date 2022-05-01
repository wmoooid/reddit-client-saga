import React from 'react';
import styles from './Userbar.module.css';
import useMe from '@/hooks/useMe';
import { UserbarPlaceholder } from '../../placeholders/Userbar.placeholer';
import { Icon_User } from '@/components/icons/Icon_User';

export const Userbar: React.FC = () => {
  const { data, isLoading, isError } = useMe();

  const href = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=${process.env.REDIRECT_URL}&duration=permanent&scope=read submit identity mysubreddits vote`;

  if (isLoading) {
    return (
      <a href={href}>
        <UserbarPlaceholder />
      </a>
    );
  }

  if (isError) {
    return (
      <a href={href}>
        <UserbarPlaceholder />
      </a>
    );
  }

  if (data) {
    return (
      <a className={styles.profile} href={href}>
        <span className={styles.userAvatar}>
          <img className={styles.userAvatarImg} src={data.icon_img} alt='User avatar' />
        </span>
        <span className={styles.userName}>{data.name}</span>
      </a>
    );
  }

  return (
    <a className={styles.profile} href={href}>
      <Icon_User />
      <span className={styles.userName}>Log in</span>
    </a>
  );
};
