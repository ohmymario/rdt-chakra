import { Post } from '@/atoms/postsAtoms';
import { firestore } from '@/firebase/clientApp';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface PostLoaderResult {
  loading: boolean;
  error: string | null;
  posts: Post[];
}

const usePostLoader = (communityId: string): PostLoaderResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const postsCollection = collection(firestore, 'posts');
      const postFilter = where('communityId', '==', communityId);
      const postOrder = orderBy('createdAt', 'desc');
      const postQuery = query(postsCollection, postFilter, postOrder);
      const postDocs = await getDocs(postQuery);
      const fetchedPosts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[];

      setPosts(fetchedPosts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, [communityId]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    loading,
    error,
    posts,
  };
};

export default usePostLoader;
