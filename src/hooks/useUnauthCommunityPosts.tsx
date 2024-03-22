import { Post } from '@/atoms/postsAtoms';
import { firestore } from '@/firebase/clientApp';
import { toPost } from '@/utils/convertToPost';
import { handleFetchError } from '@/utils/handleFetchError';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface useUnAuthPostResult {
  unAuthPostsData: {
    data: Post[];
    loading: boolean;
    error: string | null;
  };
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
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunityPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedPosts = await fetchUnAuthCommunityPosts();
      setData(fetchedPosts);
    } catch (error: unknown) {
      setError(handleFetchError(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCommunityPosts();
  }, [fetchCommunityPosts]);

  return { unAuthPostsData: { data, loading, error } };
};

export default useUnAuthCommunityPosts;
