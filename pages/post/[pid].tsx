import React from 'react';
import usePost from '@/hooks/usePost';
import Head from 'next/head';
import { PostItem } from '@/components/PostList/PostItem/PostItem';
import { CommentsResponseCommentsDataType, CommentsResponsePostInfoType } from '@/types/comments';
import { useRouter } from 'next/router';
import { PostProvider } from '@/hooks/usePostContext';
import { PostPagePlaceholder } from '@/components/placeholders/PostPage.placeholder';
import { CommentsList } from '@/components/CommentsList/CommentsList';
import type { NextPage } from 'next';
import { CommentsProvider } from '@/hooks/useCommentsContext';
import { KeyedMutator } from 'swr';

interface PostPageProps {
  post: CommentsResponsePostInfoType;
  comments: CommentsResponseCommentsDataType[];
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<any[]>;
}

const PostPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { post, comments, isLoading, isError, mutate } = usePost(pid) as PostPageProps;
  if (isLoading) {
    return <PostPagePlaceholder />;
  }

  if (isError) {
    return <PostPagePlaceholder />;
  }

  return (
    <>
      <Head>
        <title>{post.data ? post.data.title : 'Another Reddit mirror'}</title>
      </Head>
      <PostProvider value={post.data}>
        <PostItem isPostPage={true} mutate={mutate} />
        <CommentsProvider value={comments}>
          <CommentsList />
        </CommentsProvider>
      </PostProvider>
    </>
  );
};

export default PostPage;
