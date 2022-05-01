import React from 'react';
import Head from 'next/head';
import { PostList } from '@/components/PostList/PostList';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const Listing: NextPage = () => {
  const router = useRouter();

  const listing = router.asPath;

  return (
    <>
      <Head>
        <title>{listing} – Reddit</title>
      </Head>
      <PostList listing={listing} />
    </>
  );
};

export default Listing;
