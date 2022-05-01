import { Icon_Search } from '@/components/icons/Icon_Search';
import React from 'react';
import styles from './Searchbar.module.css';
import { SearchPopup } from './SearchPopup/SearchPopup';

export const Searchbar: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }
  function handleSearchbarClick() {
    setIsOpen(true);
  }

  return (
    <div className={styles.container}>
      <span className={styles.searchIcon}>
        <Icon_Search />
      </span>
      <input
        type='text'
        value={query}
        onClick={handleSearchbarClick}
        onChange={handleQueryChange}
        className={styles.searchText}
        placeholder='Search'
      />
      {isOpen && query && <SearchPopup query={query} setQuery={setQuery} setIsOpen={setIsOpen} />}
    </div>
  );
};
