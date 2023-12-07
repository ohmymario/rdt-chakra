import { DocumentData, DocumentReference, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useState } from 'react';
import { firestore, storage } from '@/firebase/clientApp';
import useSelectFile from './useSelectFile';

export const usePostImageUpload = () => {
  // Error Message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Loading State
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
  const handleCatchError = (error: unknown) => {};

  // initiate upload
  const onUploadImage = async () => {
    // Load, Reset, and Check for Errors
    // Call upload function
  };

  return { onUploadImage };
};
