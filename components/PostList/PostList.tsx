import React from 'react';
import styles from './PostList.module.css';
import useInfiniteListing from '@/hooks/useInfiniteListing';
import { PostItem } from './PostItem/PostItem';
import { PostListPlaceholder } from '../placeholders/PostList.placeholder';
import { PostProvider } from '@/hooks/usePostContext';
import { TopBar } from './TopBar/TopBar';

interface PostListProps {
  listing: string;
}

interface PostListContextProps {
  listing: string;
  setIsTile: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostListContext = React.createContext({} as PostListContextProps);

export const PostList: React.FC<PostListProps> = ({ listing }) => {
  const { posts, isLoading, isValidating, isError, size, setSize, mutate } = useInfiniteListing(listing);

  const [isTile, setIsTile] = React.useState(true);

  if (isLoading) {
    return <PostListPlaceholder />;
  }

  if (isError) {
    return <PostListPlaceholder />;
  }

  if (posts) {
    return (
      <PostListContext.Provider value={{ listing, setIsTile }}>
        <TopBar />
        <ul className={styles.list}>
          {posts.map((post) => (
            <PostProvider key={`${post.data.id}_provider`} value={post.data}>
              <PostItem key={post.data.id} isTile={isTile} mutate={mutate} />
              <span className={styles.divider}></span>
            </PostProvider>
          ))}
        </ul>
        {isValidating ? (
          <div className='placeholder'>
            <div className={styles.moreLoading}>Loading...</div>
          </div>
        ) : (
          <button className={styles.moreButton} onClick={() => setSize(size + 1)}>
            Load More
          </button>
        )}
      </PostListContext.Provider>
    );
  }

  return <PostListPlaceholder />;
};
