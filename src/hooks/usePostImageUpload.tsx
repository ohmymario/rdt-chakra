import { storage } from '@/firebase/clientApp';
import { DocumentData, DocumentReference, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useState } from 'react';
import useSelectFile from './useSelectFile';

export const usePostImageUpload = () => {
  // Error Message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Loading State
  // TODO: BRING LOADING STATE IN FROM NEW POST FORM
  const [loadingState, setLoadingState] = useState<boolean>(false);

  // handle file selection / where file is held in state
  const { selectedFile, onSelectFile, resetSelectedFile } = useSelectFile();

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
      const errorMessage = `Error uploading image: ${error.message}`;
      setErrorMessage(errorMessage);
    } else {
      const errorMessage = 'An error occurred while uploading the image.';
      setErrorMessage(errorMessage);
    }
  };

  // Initiate Upload
  const onUploadImage = async (docRef: DocumentReference<DocumentData>) => {
    // LOADING
    setLoadingState(true);
    // setLoadingState('Image & Video', true);

    // FILE CHECK
    if (!selectedFile) {
      const errorMessage = 'Please select an image to upload.';
      setErrorMessage(errorMessage);
      // setLoadingState('Image & Video', false);
      setLoadingState(false);
      return;
    }

    // RESET ERROR
    setErrorMessage(null);

    // UPLOAD TRY CATCH FINALLY BLOCK
    try {
      const imageLocation = `posts/${docRef.id}/image`;
      await uploadPostImageToStorage(docRef, selectedFile, imageLocation);
    } catch (error: unknown) {
      handleCatchError(error);
    } finally {
      // setLoadingState('Image & Video', false);
      setLoadingState(false);
    }
  };

  return { onUploadImage, onSelectFile, resetSelectedFile, selectedFile, loadingState, errorMessage };
};
