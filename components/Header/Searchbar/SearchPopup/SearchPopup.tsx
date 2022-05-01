import { AvatarPlaceholder } from '@/components/placeholders/Avatar.placeholder';
import useSearch from '@/hooks/useSearch';
import { formatNumber } from '@/utils/formatNumber';
import Link from 'next/link';
import React from 'react';
import styles from './SearchPopup.module.css';

interface SearchPopupProps {
  query: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchPopup: React.FC<SearchPopupProps> = ({ query, setIsOpen, setQuery }) => {
  const [debouncedQuery, setDebouncedQuery] = React.useState('');

  function handleItemClick() {
    setIsOpen(false);
    setQuery('');
  }

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const { list } = useSearch(query);

  return (
    <div className={styles.popupContainer} ref={ref}>
      <ul className={styles.popupList}>
        {list.map((item) => (
          <Link key={item.name} href={`/r/${item.name}`} shallow={true}>
            <li onClick={handleItemClick} className={styles.popupItem}>
              <span className={styles.itemImageContainer}>
                {item.icon_img ? (
                  <img src={item.icon_img} className={styles.itemImage} />
                ) : (
                  <AvatarPlaceholder color={item.key_color} name={item.name} />
                )}
              </span>
              <span className={styles.itemInfo}>
                <span className={styles.itemText}>{item.name}</span>
                <span className={styles.itemSubscribers}>{`${formatNumber(item.subscriber_count)} subscribers`}</span>
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
