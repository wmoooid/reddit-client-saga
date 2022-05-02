import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectSubscriptions } from 'reduxSaga/reducers/subscriptions/selectors';
import styles from '../Sidebar.module.css';

export const SubscriptionsList: React.FC = () => {
  const subscriptions = useSelector(selectSubscriptions);

  return (
    <nav className={styles.nav}>
      <strong className={styles.heading}>Subscriptions</strong>
      <ul className={styles.list}>
        {subscriptions.data.map((item) => (
          <Link key={item.data.id} href={item.data.url} shallow={true}>
            <li className={styles.item}>
              <img src={item.data.community_icon || item.data.icon_img} className={styles.itemIcon} />
              <span className={styles.itemName}>{item.data.display_name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
