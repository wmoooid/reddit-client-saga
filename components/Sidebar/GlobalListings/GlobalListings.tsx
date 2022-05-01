import { Icon_Best } from '@/components/icons/Icon_Best';
import { Icon_Controversial } from '@/components/icons/Icon_Controversial';
import { Icon_Hot } from '@/components/icons/Icon_Hot';
import { Icon_New } from '@/components/icons/Icon_New';
import { Icon_Rising } from '@/components/icons/Icon_Rising';
import { Icon_Top } from '@/components/icons/Icon_Top';
import Link from 'next/link';
import styles from '../Sidebar.module.css';

export const GlobalListings: React.FC = () => {
  const GLOBAL_LISTINGS = [
    { name: 'Best', icon: Icon_Best, href: '/best' },
    { name: 'Hot', icon: Icon_Hot, href: '/hot' },
    { name: 'New', icon: Icon_New, href: '/new' },
    { name: 'Controversial', icon: Icon_Controversial, href: '/controversial' },
    { name: 'Rising', icon: Icon_Rising, href: '/rising' },
    { name: 'Top', icon: Icon_Top, href: '/top' },
  ];
  return (
    <nav className={styles.nav}>
      <strong className={styles.heading}>Global listings</strong>
      <ul className={styles.list}>
        {GLOBAL_LISTINGS.map((item) => (
          <Link key={`${item.href}_${item.name}`} href={item.href} shallow={true}>
            <li className={styles.item}>
              <span className={styles.itemIcon}>
                <item.icon />
              </span>
              <span className={styles.itemName}>{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
