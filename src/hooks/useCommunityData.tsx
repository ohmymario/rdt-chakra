import { useEffect, useState } from 'react';
import { communitiesState, CommunityState, Community, CommunitySnippet } from '@/atoms/communitiesAtom';
import { useRecoilState } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, getDocs } from 'firebase/firestore';

type UseCommunityDataReturnType = {
  communityStateValue: CommunityState;
  onJoinOrLeaveCommunity: (communityData: Community, isJoined: boolean) => void;
  loading: boolean;
};

const useCommunityData = (): UseCommunityDataReturnType => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Where to save the community data to globally use
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communitiesState);

  // Check if the user is in the community
  // removes or add them based on the isJoined boolean
  const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
    if (isJoined) return leaveCommunity(communityData.id);
    joinCommunity(communityData);
  };

  // Get all the communities the user is in and save them to the global state
  const getMySnippets = async () => {
    setLoading(true);

    try {
      const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`));
      const snippetsArray = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippetsArray as CommunitySnippet[],
      }));
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const joinCommunity = (communityData: Community) => {
    console.log('joining community');
  };

  const leaveCommunity = (communityId: string) => {
    console.log('leaving community');
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
