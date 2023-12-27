import { tabLabels } from '@/component/Posts/NewPostForm';
import { storage } from '@/firebase/clientApp';
import { DocumentData, DocumentReference, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useEffect, useState } from 'react';
import useSelectFile from './useSelectFile';

export const usePostImageUpload = () => {
  // Local Error Message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // TODO: BRING LOADING STATE IN FROM NEW POST FORM
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const { selectedFile, onSelectFile, resetSelectedFile, errorMessage: fileSelectionError } = useSelectFile();

  useEffect(() => {
    setErrorMessage(fileSelectionError);
  }, [fileSelectionError]);

  // Upload Post Image to Cloud ☁️
  const uploadPostImageToStorage = async (docRef: DocumentReference<DocumentData>) => {
    if (!selectedFile) return;

    const imageLocation = `posts/${docRef.id}/image`;
    const imageRef = ref(storage, imageLocation);
    await uploadString(imageRef, selectedFile, 'data_url');
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(docRef, { imageURL: downloadURL });
  };

  // Handler Image Upload Errors with Message
  // Enhanced error handler with context for clearer error messages
  const handleCatchError = (error: unknown, context: 'fileSelection' | 'upload') => {
    let prefix = context === 'fileSelection' ? 'File selection error: ' : 'Image upload error: ';
    if (error instanceof Error) {
      setErrorMessage(prefix + error.message);
    } else {
      setErrorMessage(prefix + 'An unknown error occurred. Please try again later.');
    }
  };

  // Initiate Upload
  const onUploadImage = async (docRef: DocumentReference<DocumentData>) => {
    setLoadingState(true);

    // FILE CHECK
    if (!selectedFile) {
      handleCatchError(new Error('Please select an image to upload.'), 'fileSelection');
      setLoadingState(false);
      return;
    }

    // RESET ERROR
    setErrorMessage(null);

    // UPLOAD TRY CATCH FINALLY BLOCK
    try {
      await uploadPostImageToStorage(docRef);
    } catch (error: unknown) {
      handleCatchError(error, 'upload');
    } finally {
      setLoadingState(false);
    }
  };

  return { onUploadImage, onSelectFile, resetSelectedFile, selectedFile, loadingState, errorMessage };
};
