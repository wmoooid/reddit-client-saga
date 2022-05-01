import React from 'react';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

interface LayoutContextProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutContext = React.createContext({} as LayoutContextProps);

export const Layout: React.FC = ({ children }) => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  return (
    <LayoutContext.Provider value={{ showSidebar, setShowSidebar }}>
      <Header />
      <Sidebar />
      <main className={'main'}>
        <div className={'container'}>{children}</div>
      </main>
    </LayoutContext.Provider>
  );
};
