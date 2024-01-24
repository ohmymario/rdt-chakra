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

interface StatusState {
  error: string | null;
  loading: boolean;
  success: boolean;
}

export const usePostCreation = (
  user: User,
  communityImageURL: string | undefined,
  selectedFile: string | null,
  onUploadImage: (docRef: DocumentReference) => Promise<void>
) => {
  const router = useRouter();

  const [status, setStatus] = useState<StatusState>({
    error: null,
    loading: false,
    success: false,
  });

  const { textInput, handleInputChange } = useTextInput();

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
    setStatus({
      error: null,
      loading: true,
      success: false,
    });

    try {
      const newPost = createPostObject();
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);

      if (selectedFile) await onUploadImage(postDocRef);

      // TODO - Redirect to the newly created post
      // TODO - SUCCESS FOR STATUS
      setStatus({
        error: null,
        loading: false,
        success: true,
      });

      router.push(`/some/redirect/path`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatus({
          error: `Error creating post: ${error.message}`,
          loading: false,
          success: false,
        });
      } else {
        setStatus({
          error: 'An unexpected error occurred. Please try again.',
          loading: false,
          success: false,
        });
      }
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return { createPost, handleInputChange, textInput, status };
};
