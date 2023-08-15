import { Post } from '@/atoms/postsAtoms';
import { firestore } from '@/firebase/clientApp';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import useCommunityData from './useCommunityData';

import { toPost } from '@/utils/convertToPost';

interface useAuthPostResult {
  authPosts: Post[];
  loading: boolean;
  error: string | null;
}

// Fetches community posts from Firestore based on given community IDs
const fetchCommunityPostsFromFirestore = async (communityIds: string[]): Promise<Post[]> => {
  const postsCollection = collection(firestore, 'posts');
  const postVotesFilter = where('communityId', 'in', communityIds);
  const postsQuery = query(postsCollection, postVotesFilter);
  const postDocs = await getDocs(postsQuery);
  return postDocs.docs.map(toPost);
};

// Handles errors during the fetch operation, returning a user-friendly error message
const handleFetchError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred.';
};

const useAuthCommunityPosts = (): useAuthPostResult => {
  const { communityStateValue } = useCommunityData();

  const [authPosts, setAuthPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunityPosts = useCallback(async () => {
    if (communityStateValue.mySnippets.length === 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userCommunityIDs = communityStateValue.mySnippets.map((snippet) => snippet.communityId);
      const fetchedPosts = await fetchCommunityPostsFromFirestore(userCommunityIDs);
      setAuthPosts(fetchedPosts);
    } catch (error: unknown) {
      setError(handleFetchError(error));
    } finally {
      setLoading(false);
    }
  }, [communityStateValue.mySnippets]);

  useEffect(() => {
    fetchCommunityPosts();
  }, [fetchCommunityPosts]);

  return {
    authPosts,
    loading,
    error,
  };
};

export default useAuthCommunityPosts;
