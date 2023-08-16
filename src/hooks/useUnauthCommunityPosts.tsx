import { Post } from '@/atoms/postsAtoms';
import { firestore } from '@/firebase/clientApp';
import { toPost } from '@/utils/convertToPost';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface useUnAuthPostResult {
  unAuthPosts: Post[];
  loading: boolean;
  error: string | null;
}

const fetchUnAuthCommunityPosts = async (): Promise<Post[]> => {
  const postsCollection = collection(firestore, 'posts');
  const postVotesSort = orderBy('voteStatus', 'desc');
  const postsLimit = limit(10);
  const postsQuery = query(postsCollection, postVotesSort, postsLimit);
  const postDocs = await getDocs(postsQuery);
  return postDocs.docs.map(toPost);
};

const useUnAuthCommunityPosts = (): useUnAuthPostResult => {
  const [unAuthPosts, setUnAuthPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunityPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedPosts = await fetchUnAuthCommunityPosts();
      setUnAuthPosts(fetchedPosts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCommunityPosts();
  }, [fetchCommunityPosts]);

  return { unAuthPosts, loading, error };
};

export default useUnAuthCommunityPosts;
