import { useReducer, useState } from 'react';

// Firebase
import { auth, firestore } from '@/firebase/clientApp';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';

// Hooks
import { useAuthState } from 'react-firebase-hooks/auth';

// Types
import { AccessLevel } from '@/component/Modal/CreateCommunity/CreateCommunityModal';

type CreateCommunityFnType = (communityName: string, communityType: AccessLevel, isAdult: boolean) => Promise<boolean>;

type StateTypes = {
  loading: boolean;
  error: string | null;
};

type ActionTypes =
  | { type: 'START' }
  | { type: 'SUCCESS' }
  | { type: 'ERROR'; payload: string }
  | { type: 'RESET_ERROR' };

function reducer(state: StateTypes, action: ActionTypes): StateTypes {
  switch (action.type) {
    case 'START':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { ...state, loading: false, error: null };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'RESET_ERROR':
      return { ...state, loading: false, error: null };
    default:
      throw new Error('Unhandled action type');
  }
}

const useCreateCommunity = () => {
  const [user] = useAuthState(auth);

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: null,
  });

  const createCommunity: CreateCommunityFnType = async (communityName, communityType, isAdult) => {
    dispatch({ type: 'START' });

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

      dispatch({ type: 'SUCCESS' });
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({ type: 'ERROR', payload: error.message });
      } else {
        dispatch({ type: 'ERROR', payload: 'An unknown error occurred while creating the community.' });
      }
      return false;
    }
  };

  const resetCommunityError = () => {
    dispatch({ type: 'RESET_ERROR' });
  };

  return { createCommunity, loading: state.loading, error: state.error, resetCommunityError };
};

export default useCreateCommunity;
