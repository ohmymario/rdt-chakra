import { Community } from '@/atoms/communitiesAtom';
import { firestore, storage } from '@/firebase/clientApp';
import useSelectFile from '@/hooks/useSelectFile';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRef, useState } from 'react';

export const useImageUpload = (communityData: Community) => {
  // Image Upload / Input Reference
  const selectedFileRef = useRef<HTMLInputElement>(null);

  // success/error/uploading states
  const [error, setError] = useState<string | null>(null);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  // handle file selection / where file is held in state
  const { selectedFile, onSelectFile, resetSelectedFile } = useSelectFile();

  const { id } = communityData;

  // going to cloud ☁️
  const uploadImageToStorage = async (selectedFile: string) => {
    const imageLocation = `communities/${id}/image`;
    const imageRef = ref(storage, imageLocation);
    await uploadString(imageRef, selectedFile, 'data_url');
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(firestore, 'communities', id), {
      imageURL: downloadURL,
    });
  };

  // handle errors
  // TODO: refactor this to handle firebase errors
  const handleCatchError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unknown error occurred. Please try again later.');
    }
  };

  // initiate upload
  const onUpdateImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);
    setError(null);

    try {
      await uploadImageToStorage(selectedFile);
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
    selectedFileRef,
    selectedFile,
    uploadingImage,
    isUploadSuccessful,
    error,
  };
};
