import { Community } from '@/atoms/communitiesAtom';
import { firestore, storage } from '@/firebase/clientApp';
import useSelectFile from '@/hooks/useSelectFile';
import { doc, DocumentData, DocumentReference, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRef, useState } from 'react';

export const useImageUpload = (communityData: Community) => {
  // Image Upload / Input Reference
  const selectedFileRef = useRef<HTMLInputElement>(null);

  // Error Message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Loading State
  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  // Check if Upload was Successful
  const [isUploadSuccessful, setIsUploadSuccessful] = useState<boolean>(false);

  // handle file selection / where file is held in state
  const { selectedFile, onSelectFile, resetSelectedFile } = useSelectFile();

  const { id } = communityData;

  // Upload Community Image/Avatar to Cloud ☁️
  const uploadCommunityImageToStorage = async (selectedFile: string, imageLocation: string) => {
    // Pointer to future image location
    const imageRef = ref(storage, imageLocation);

    // Upload Logo/Image to Storage
    await uploadString(imageRef, selectedFile, 'data_url');

    // Get image URL to append to community document
    const downloadURL = await getDownloadURL(imageRef);

    // Update Document with Logo/Image URL
    await updateDoc(doc(firestore, 'communities', id), {
      imageURL: downloadURL,
    });
  };

  // Upload Post Image to Cloud ☁️
  const uploadPostImageToStorage = async (
    docRef: DocumentReference<DocumentData>,
    selectedFile: string,
    imageLocation: string
  ) => {
    //pointer to storage location
    const imageRef = ref(storage, imageLocation);

    // upload image to storage
    await uploadString(imageRef, selectedFile, 'data_url');

    // get image url to append to post document
    const downloadURL = await getDownloadURL(imageRef);

    // update post document with image url
    await updateDoc(docRef, { imageURL: downloadURL });
  };

  // Handler Errors with Message
  const handleCatchError = (error: unknown) => {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage('An unknown error occurred. Please try again later.');
    }
  };

  // initiate upload
  const onUpdateImage = async () => {
    if (!selectedFile) {
      const errorMessage = 'Please select an image to upload.';
      setErrorMessage(errorMessage);

      return;
    }
    setUploadingImage(true);
    setErrorMessage(null);

    try {
      const imageLocation = `communities/${id}/image`;
      await uploadCommunityImageToStorage(selectedFile, imageLocation);
      resetSelectedFile();
    } catch (error: unknown) {
      handleCatchError(error);
    } finally {
      setUploadingImage(false);
    }
  };

  return {
    onSelectFile,
    onUpdateImage,
    uploadPostImageToStorage,
    selectedFileRef,
    selectedFile,
    uploadingImage,
    isUploadSuccessful,
    errorMessage,
  };
};
