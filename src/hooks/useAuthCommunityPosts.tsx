import { Post } from '@/atoms/postsAtoms';
import { firestore } from '@/firebase/clientApp';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import useCommunityData from './useCommunityData';

const UseAuthCommunityPosts = () => {
  const { communityStateValue } = useCommunityData();

  const [authPosts, setAuthPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      setLoading(true);
      setError(null);

      if (communityStateValue.mySnippets.length === 0) {
        return;
      }

      try {
        const userCommunityIDs = communityStateValue.mySnippets.map((snippet) => snippet.communityId);
        const postsCollection = collection(firestore, 'posts');
        const postVotesFilter = where('communityId', 'in', userCommunityIDs);
        const postsQuery = query(postsCollection, postVotesFilter);

        const postDocs = await getDocs(postsQuery);

        const fetchedPosts = postDocs.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        setAuthPosts(fetchedPosts as Post[]);
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
  }, [communityStateValue.mySnippets]);

  return { authPosts, loading, error };
};

export default UseAuthCommunityPosts;
