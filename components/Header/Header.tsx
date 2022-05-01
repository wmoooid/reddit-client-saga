import styles from './Header.module.css';
import React from 'react';
import { SidebarButton } from './SidebarButton/SidebarButton';
import { Searchbar } from './Searchbar/Searchbar';
import { Userbar } from './Userbar/Userbar';
import { LayoutContext } from '../Layout';
import throttle from '@/utils/throttle';

export const Header: React.FC = () => {
  const [isdHide, setIsHide] = React.useState(false);
  const { showSidebar } = React.useContext(LayoutContext);

  React.useEffect(() => {
    let prevPosition = 0;

    function handleScroll() {
      let currentPosition = window.pageYOffset;

      const isScrollDown = currentPosition > prevPosition;
      isScrollDown ? setIsHide(true) : setIsHide(false);

      prevPosition = window.pageYOffset;
    }

    document.addEventListener('scroll', throttle(handleScroll, 300));

    return () => {
      document.removeEventListener('scroll', throttle(handleScroll, 300));
    };
  }, []);

  return (
    <header className={isdHide && !showSidebar ? styles.boxHide : styles.box}>
      <div className={styles.leftSide}>
        <SidebarButton />
        <span className={styles.divider}></span>
        <Searchbar />
      </div>
      <div className={styles.rightSide}>
        <span className={styles.allertsIcon}></span>
        <Userbar />
      </div>
    </header>
  );
};
