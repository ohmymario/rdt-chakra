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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  // handle file selection / where file is held in state
  const { selectedFile, onSelectFile, resetSelectedFile } = useSelectFile();

  const { id } = communityData;

  // Upload Community Image to Cloud ☁️
  const uploadCommunityImageToStorage = async (selectedFile: string, imageLocation: string) => {
    // pointer to future image location
    const imageRef = ref(storage, imageLocation);

    // Upload image to storage
    await uploadString(imageRef, selectedFile, 'data_url');

    // Get image URL to append to community document
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(firestore, 'communities', id), {
      imageURL: downloadURL,
    });
  };

  // handle errors
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
    selectedFileRef,
    selectedFile,
    uploadingImage,
    isUploadSuccessful,
    errorMessage,
  };
};
