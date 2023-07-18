import { useState } from 'react';

// Firebase
import { auth, firestore } from '@/firebase/clientApp';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';

// Hooks
import { useAuthState } from 'react-firebase-hooks/auth';

// Types
import { AccessLevel } from '@/component/Modal/CreateCommunity/CreateCommunityModal';

type CreateCommunityFnType = (communityName: string, communityType: AccessLevel, isAdult: boolean) => Promise<boolean>;

const useCreateCommunity = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const createCommunity: CreateCommunityFnType = async (communityName, communityType, isAdult) => {
    setLoading(true);
    setError('');

    try {
      await runTransaction(firestore, async (transaction) => {
        const communityDocRef = doc(firestore, 'communities', communityName);
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry r/${communityName} is taken. Try another name.`);
        }

        transaction.set(communityDocRef, {
          name: communityName,
          type: communityType,
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          nsfw: isAdult,
        });

        const communitySnippets = `users/${user?.uid}/communitySnippets`;
        const userDocRef = doc(firestore, communitySnippets, communityName);
        transaction.set(userDocRef, {
          communityId: communityName,
          isModerator: true,
        });
      });

      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createCommunity, loading, error };
};

export default useCreateCommunity;
