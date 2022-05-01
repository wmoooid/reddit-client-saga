import React, { ReactNode, useContext } from 'react';
import { CommentsResponsePostInfoDataType } from '@/types/comments';
import { ListingsResponseChildrenDataType } from '@/types/listings';

type PostContextType = CommentsResponsePostInfoDataType | ListingsResponseChildrenDataType;

const PostContext = React.createContext({} as PostContextType);

export function usePostContext() {
  return useContext(PostContext);
}

interface PostProviderProps {
  children: ReactNode;
  value: PostContextType;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children, value }) => {
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
