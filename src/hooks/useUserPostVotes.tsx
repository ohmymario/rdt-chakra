import { PostVote } from '@/atoms/postsAtoms';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import usePostsData from './usePostData';

// This hook handles only the first 10 post IDs due to query constraints.
// Future Enhancement:
// 1. Divide post IDs into batches of 10.
// 2. Query each batch to fetch post votes.
// 3. Combine all results into one array.
// Use Promise.all for async handling, and consider performance and loading times.

const useUserPostVotes = () => {
  const [postVotes, setPostVotes] = useState<PostVote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [user, loadingUser] = useAuthState(auth);
  const { postStateValue } = usePostsData();

  const postIDs = useMemo(() => postStateValue.posts.map((post) => post.id).slice(0, 10), [postStateValue.posts]);

  useEffect(() => {
    const fetchUserPostVotes = async () => {
      setLoading(true);
      setError(null);

      if (!user || loadingUser || postIDs.length === 0) {
        return;
      }
      try {
        const postVotesCollection = collection(firestore, `users/${user.uid}/postVotes`);
        const postVotesFilter = where('postId', 'in', postIDs);
        const postVotesQuery = query(postVotesCollection, postVotesFilter);
        const postVotesDocs = await getDocs(postVotesQuery);
        const fetchedPostVotes = postVotesDocs.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setPostVotes(fetchedPostVotes as PostVote[]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserPostVotes();
  }, [user, postIDs, loadingUser]);

  return { postVotes, loading, error };
};

export default useUserPostVotes;
