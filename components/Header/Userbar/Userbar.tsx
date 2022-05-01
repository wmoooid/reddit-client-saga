import React from 'react';
import styles from './Userbar.module.css';
import { UserbarPlaceholder } from '../../placeholders/Userbar.placeholer';
import { Icon_User } from '@/components/icons/Icon_User';
import { useSelector } from 'react-redux';
import { selectMe } from 'reduxSaga/reducers/me/selectors';

export const Userbar: React.FC = () => {
  const me = useSelector(selectMe);

  const href = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=${process.env.REDIRECT_URL}&duration=permanent&scope=read submit identity mysubreddits vote`;

  if (me.isLoading) {
    return (
      <a href={href}>
        <UserbarPlaceholder />
      </a>
    );
  }

  if (me.isError) {
    return (
      <a href={href}>
        <UserbarPlaceholder />
      </a>
    );
  }

  if (me.data) {
    return (
      <a className={styles.profile} href={href}>
        <span className={styles.userAvatar}>
          <img className={styles.userAvatarImg} src={me.data?.icon_img} alt='User avatar' />
        </span>
        <span className={styles.userName}>{me.data?.name}</span>
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
