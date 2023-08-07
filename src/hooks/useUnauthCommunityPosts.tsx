import { Post } from '@/atoms/postsAtoms';
import { firestore } from '@/firebase/clientApp';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const UseUnAuthCommunityPosts = () => {
  const [unAuthPosts, setUnAuthPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const postsCollection = collection(firestore, 'posts');
        const postVotesSort = orderBy('voteStatus', 'desc');
        const postsLimit = limit(10);
        const postsQuery = query(postsCollection, postVotesSort, postsLimit);

        const postDocs = await getDocs(postsQuery);
        const fetchedPosts = postDocs.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        setUnAuthPosts(fetchedPosts as Post[]);
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

    fetchCommunityPosts();
  }, []);

  return { unAuthPosts, loading, error };
};

export default UseUnAuthCommunityPosts;
