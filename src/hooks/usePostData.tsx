import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebase/clientApp';
import { Community } from '@/atoms/communitiesAtom';
import { postsState } from '@/atoms/postsAtoms';
import { useRecoilState } from 'recoil';

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postsState);

  const onVote = async () => {};

  const onSelectPost = async () => {};

  const onDeletePost = async () => {};

  return {
    postStateValue,
    setPostStateValue,
  };
};

export default usePosts;
