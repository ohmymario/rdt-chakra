import { useState } from 'react';
import { useRouter } from 'next/router';
import { firestore } from '@/firebase/clientApp';
import { addDoc, collection, serverTimestamp, DocumentReference, Timestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { Post } from '@/atoms/postsAtoms';
import { useTextInput } from '@/hooks/useTextInput';

/**
 * @desc Manages the creation of a new post.
 * @param user The current logged in user.
 * @param communityImageURL The image URL of the community.
 * @param selectedFile The selected file for image upload.
 * @param onUploadImage Function to upload an image.
 * @returns An object containing functions and states related to post creation.
 */

export const usePostCreation = (
  user: User,
  communityImageURL: string | undefined,
  selectedFile: string | null,
  onUploadImage: (docRef: DocumentReference) => Promise<void>
) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const { textInput, setTextInput } = useTextInput();

  const createPostObject = () => {
    const { communityId } = router.query;
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
    setLoadingState(true);
    setError(null);

    try {
      const newPost = createPostObject();
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);

      if (selectedFile) {
        await onUploadImage(postDocRef);
      }

      // Redirect or perform further actions after successful post creation
      router.push(`/some/redirect/path`);
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error creating post: ${error.message}`);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoadingState(false);
    }
  };

  return { createPost, setTextInput, textInput, error, loadingState };
};
