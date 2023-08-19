import { PostVote } from '@/atoms/postsAtoms';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import usePostsData from './usePostData';

import { handleFetchError } from '@/utils/handleFetchError';
import { User } from 'firebase/auth';
import { toPostVote } from '@/utils/convertToPostVote';

interface UserPostVotesResult {
  postVotes: PostVote[];
  loading: boolean;
  error: string | null;
}

// abstracts the fetch query and necessary data
const fetchUserPostVotesFromFirestore = async (user: User, postIDs: (string | undefined)[]): Promise<PostVote[]> => {
  const postVotesCollection = collection(firestore, `users/${user.uid}/postVotes`);
  const postVotesFilter = where('postId', 'in', postIDs);
  const postVotesQuery = query(postVotesCollection, postVotesFilter);
  const postVotesDocs = await getDocs(postVotesQuery);
  return postVotesDocs.docs.map(toPostVote);
};

const fetchUserPostVotesInBatches = async (user: User, postIDs: (string | undefined)[]): Promise<PostVote[]> => {
  // 10 posts per batch for firestore query
  const batchSize = 10;
  // calculate number of batches needed
  const numberOfBatches = { length: Math.ceil(postIDs.length / batchSize) };

  // Put all batched queries/promises into an array
  const batchQueries = Array.from(numberOfBatches, (_, i) => {
    const batchPostIDs = postIDs.slice(i * batchSize, i * batchSize + batchSize);
    return fetchUserPostVotesFromFirestore(user, batchPostIDs);
  });

  const allPostVotesBatches = await Promise.all(batchQueries);
  return allPostVotesBatches.flat();
};

const useUserPostVotes = (): UserPostVotesResult => {
  const [postVotes, setPostVotes] = useState<PostVote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [user, loadingUser] = useAuthState(auth);
  const { postStateValue } = usePostsData();

  const postIDs = useMemo(() => postStateValue.posts.map((post) => post.id), [postStateValue.posts]);

  const fetchUserPostVotes = useCallback(async () => {
    // early return if not all necessary data is ready
    if (!user || loadingUser || postIDs.length === 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedPostVotes = await fetchUserPostVotesInBatches(user, postIDs);
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
