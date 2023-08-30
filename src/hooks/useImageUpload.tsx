import { Community } from '@/atoms/communitiesAtom';
import { firestore, storage } from '@/firebase/clientApp';
import useSelectFile from '@/hooks/useSelectFile';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRef, useState } from 'react';

export const useImageUpload = (communityData: Community) => {
  // Image Upload / Input Ref
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { selectedFile, onSelectFile, errorMessage, removeSelectedFile } = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  const { id } = communityData;

  const uploadImageToStorage = async (selectedFile: string) => {
    const imageLocation = `communities/${id}/image`;
    const imageRef = ref(storage, imageLocation);
    await uploadString(imageRef, selectedFile, 'data_url');
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(firestore, 'communities', id), {
      imageURL: downloadURL,
    });
  };

  const onUpdateImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);

    try {
      await uploadImageToStorage(selectedFile);
      setUploadingImage(false);
      removeSelectedFile();
    } catch (error) {
      setUploadingImage(false);
      console.error(error);
    }
  };

  return {
    selectedFileRef,
    selectedFile,
    onSelectFile,
    uploadingImage,
    onUpdateImage,
  };
};
