import { useEffect, useState } from 'react';
import { communitiesState, CommunityState, Community, CommunitySnippet } from '@/atoms/communitiesAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { authModalState } from '@/atoms/authModalAtom';

type UseCommunityDataReturnType = {
  communityStateValue: CommunityState;
  onJoinOrLeaveCommunity: (communityData: Community, isJoined: boolean) => void;
  loading: boolean;
};

const useCommunityData = (): UseCommunityDataReturnType => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const setAuthModalState = useSetRecoilState(authModalState);

  // Global state for a signed in user's communities
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communitiesState);

  // Join or leave a community
  const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
    // If the user is not logged in, open the login modal
    if (!user) {
      setAuthModalState({ isOpen: true, view: 'login' });
      return;
    }
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

  const joinCommunity = async (communityData: Community) => {
    const { imageURL, id } = communityData;

    try {
      // Batch write location
      const batch = writeBatch(firestore);

      // new snippet
      const newSnippet: CommunitySnippet = {
        communityId: id,
        isModerator: false,
        imageURL: imageURL || '',
      };

      // locations
      const communitySnippets = `users/${user?.uid}/communitySnippets`;
      const communities = `communities`;

      // references
      const userCommunitySnippetsRef = doc(firestore, communitySnippets, id);
      const communityRef = doc(firestore, communities, id);

      // batch write
      batch.set(userCommunitySnippetsRef, newSnippet, { merge: true });
      batch.update(communityRef, { numberOfMembers: increment(1) });

      // commit batch
      await batch.commit();

      // update global atom state
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log(error);
    }
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      // Batch write location
      const batch = writeBatch(firestore);

      // locations
      const communitySnippets = `users/${user?.uid}/communitySnippets`;
      const communities = `communities`;

      // references
      const userCommunitySnippetsRef = doc(firestore, communitySnippets, communityId);
      const communityRef = doc(firestore, communities, communityId);

      // batch write
      batch.delete(userCommunitySnippetsRef);
      batch.update(communityRef, { numberOfMembers: increment(-1) });

      // commit batch
      await batch.commit();

      // update global atom state
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter((x) => x.communityId !== communityId),
      }));
    } catch (error: any) {
      console.log(error);
    }
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
