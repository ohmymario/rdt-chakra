import { useState } from 'react';
import { useRouter } from 'next/router';
import { firestore, auth } from '@/firebase/clientApp';
import { addDoc, collection, serverTimestamp, DocumentReference, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Post } from '@/atoms/postsAtoms';
import { useTextInput } from '@/hooks/useTextInput';

/**
 * @desc Manages the creation of a new post.
 * @param communityImageURL The image URL of the community.
 * @param selectedFile The selected file for image upload.
 * @param onUploadImage Function to upload an image.
 * @returns An object containing functions and states related to post creation.
 */

interface StatusState {
  error: string | null;
  loading: boolean;
  success: boolean;
}

export const usePostCreation = (
  communityImageURL: string | undefined,
  selectedFile: string | null,
  onUploadImage: (docRef: DocumentReference) => Promise<void>
) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [status, setStatus] = useState<StatusState>({
    error: null,
    loading: false,
    success: false,
  });

  const { textInput, handleInputChange } = useTextInput();

  const createPostObject = () => {
    const { communityId } = router.query;
    if (!user) return null; // Handle null user case

    const { uid, email } = user;
    const newPost: Post = {
      communityId: communityId as string,
      communityImageURL: communityImageURL || '',
      creatorId: uid,
      creatorDisplayName: email!.split('@')[0],
      title: textInput.title,
      body: textInput.body,
      numberOfComments: 0,
      voteStatus: 1,
      createdAt: serverTimestamp() as Timestamp,
    };

    return newPost;
  };

  const createPost = async () => {
    if (!user) {
      setStatus((prev) => ({ ...prev, error: 'User not authenticated' }));
      return;
    }

    setStatus({
      error: null,
      loading: true,
      success: false,
    });

    try {
      const newPost = createPostObject();
      if (!newPost) throw new Error('Invalid user data');

      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);
      if (selectedFile) await onUploadImage(postDocRef);

      setStatus((prev) => ({ ...prev, success: true }));
      router.push(`/r/${newPost.communityId}/comments/${postDocRef.id}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatus((prev) => ({ ...prev, error: `Error creating post: ${(error as Error).message}` }));
      } else {
        setStatus((prev) => ({ ...prev, error: `An unexpected error occurred. Please try again.` }));
      }
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return { createPost, handleInputChange, textInput, status };
};
