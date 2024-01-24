import { storage } from '@/firebase/clientApp';
import { DocumentData, DocumentReference, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useEffect, useState } from 'react';
import useSelectFile from './useSelectFile';

interface StatusState {
  error: string | null;
  loading: boolean;
  success: boolean;
}

export const usePostImageUpload = () => {
  const [status, setStatus] = useState<StatusState>({
    error: null,
    loading: false,
    success: false,
  });

  const { selectedFile, onSelectFile, resetSelectedFile, errorMessage: fileSelectionError } = useSelectFile();

  useEffect(() => {
    setStatus((prev) => ({
      ...prev,
      error: fileSelectionError,
    }));
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

  const handleCatchError = (error: unknown, context: 'fileSelection' | 'upload') => {
    let prefix = context === 'fileSelection' ? 'File selection error: ' : 'Image upload error: ';
    if (error instanceof Error) {
      setStatus((prev) => ({
        ...prev,
        error: prefix + error.message,
      }));
    } else {
      setStatus((prev) => ({
        ...prev,
        error: prefix + 'An unknown error occurred. Please try again later.',
      }));
    }
  };

  // Initiate Upload
  const onUploadImage = async (docRef: DocumentReference<DocumentData>) => {
    setStatus({
      error: null,
      loading: true,
      success: false,
    });

    if (!selectedFile) {
      setStatus((prev) => ({
        ...prev,
        error: 'Image upload error: Please select an image to upload.',
        loading: false,
      }));
      return;
    }

    try {
      await uploadPostImageToStorage(docRef);
      setStatus((prev) => ({ ...prev, success: true }));
    } catch (error: unknown) {
      handleCatchError(error, 'upload');
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return { onUploadImage, onSelectFile, resetSelectedFile, selectedFile, status };
};
