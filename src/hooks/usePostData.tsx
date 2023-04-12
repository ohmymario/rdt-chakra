import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebase/clientApp';
import { Community } from '@/atoms/communitiesAtom';
import { postsState } from '@/atoms/postsAtoms';
import { useRecoilState } from 'recoil';

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postsState);

  // VOTING
  const onVote = async () => {
    alert('Voting not implemented yet');
  };

  // WHEN USER CLICKS ON A POST
  const onSelectPost = () => {
    alert('Selecting a post not implemented yet');
  };

  // WHEN USER DELETES A POST
  const onDeletePost = async () => {
    alert('Deleting a post not implemented yet');
  };

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
