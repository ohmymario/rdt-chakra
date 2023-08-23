import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';

interface UseSelectFileResult {
  selectedFile: string | null;
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
  setSelectedFile: Dispatch<SetStateAction<string | null>>;

  errorMessage: string | null;

  removeSelecetedFile: () => void;
}

// TODO: create method to remove selected file
// TODO: check if file is an image

const useSelectFile = (): UseSelectFileResult => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateFileSize = (file: File): boolean => {
    const oneMB = 1000000;
    if (file.size > oneMB) {
      setErrorMessage(`File size is too big! Please select an image less than 1MB.`);
      return false;
    }
    return true;
  };

  const validateFileType = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage(`File type is not supported! Please select an image of type jpeg or png`);
      return false;
    }
    return true;
  };

  const removeSelecetedFile = () => {
    setSelectedFile(null);
    setErrorMessage(null);
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files.length > 0 ? files[0] : null;

    // check if exists
    if (file) {
      setErrorMessage(null);

      // check if file valid
      if (validateFileSize(file) && validateFileType(file)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result;
          if (base64 && typeof base64 === 'string') {
            setSelectedFile(base64);
          }
        };

        reader.onerror = (error) => {
          console.log('error', error);
        };
      }
    }
  };

  return { selectedFile, onSelectFile, setSelectedFile, removeSelecetedFile, errorMessage };
};

export default useSelectFile;
