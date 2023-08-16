import { PostVote } from '@/atoms/postsAtoms';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import usePostsData from './usePostData';

import { handleFetchError } from '@/utils/handleFetchError';
import { User } from 'firebase/auth';
import { toPostVote } from '@/utils/convertToPostVote';

// This hook handles only the first 10 post IDs due to query constraints.
// Future Enhancement:
// 1. Divide post IDs into batches of 10.
// 2. Query each batch to fetch post votes.
// 3. Combine all results into one array.
// Use Promise.all for async handling, and consider performance and loading times.

// abstracts the fetch query and necessary data
const fetchUserPostVotesFromFirestore = async (user: User, postIDs: (string | undefined)[]): Promise<PostVote[]> => {
  const postVotesCollection = collection(firestore, `users/${user.uid}/postVotes`);
  const postVotesFilter = where('postId', 'in', postIDs);
  const postVotesQuery = query(postVotesCollection, postVotesFilter);
  const postVotesDocs = await getDocs(postVotesQuery);
  return postVotesDocs.docs.map(toPostVote);
};

const useUserPostVotes = () => {
  const [postVotes, setPostVotes] = useState<PostVote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [user, loadingUser] = useAuthState(auth);
  const { postStateValue } = usePostsData();

  const postIDs = useMemo(() => postStateValue.posts.map((post) => post.id).slice(0, 10), [postStateValue.posts]);

  const fetchUserPostVotes = useCallback(async () => {
    // early return if not all necessary data is ready
    if (!user || loadingUser || postIDs.length === 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedPostVotes = await fetchUserPostVotesFromFirestore(user, postIDs);
      setPostVotes(fetchedPostVotes);
    } catch (error: unknown) {
      setError(handleFetchError(error));
    } finally {
      setLoading(false);
    }
  }, [user, loadingUser, postIDs]);

  useEffect(() => {
    fetchUserPostVotes();
  }, [fetchUserPostVotes]);

  return { postVotes, loading, error };
};

export default useUserPostVotes;
