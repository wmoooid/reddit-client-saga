import { CommentsResponseCommentsDataType } from '@/types/comments';
import React, { ReactNode, useContext } from 'react';

type CommentsContextType = CommentsResponseCommentsDataType[];

const CommentsContext = React.createContext({} as CommentsContextType);

export function useCommentsContext() {
  return useContext(CommentsContext);
}

interface CommentsProviderProps {
  children: ReactNode;
  value: CommentsContextType;
}

export const CommentsProvider: React.FC<CommentsProviderProps> = ({ children, value }) => {
  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>;
};
