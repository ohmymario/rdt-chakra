import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';

interface UseSelectFileResult {
  selectedFile: string | null;
  errorMessage: string | null;

  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;

  // TODO: remove ability for components to set selected file directly
  setSelectedFile: Dispatch<SetStateAction<string | null>>;
  removeSelecetedFile: () => void;
}

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
      setErrorMessage(`File type is not supported! Please select an image of type of jpeg or png.`);
      return false;
    }
    return true;
  };

  const removeSelecetedFile = () => {
    setSelectedFile(null);
    setErrorMessage(null);
  };

  const handleFileError = (error: ProgressEvent<FileReader>) => {
    console.error('File reading error', error);
    setErrorMessage('An error occurred while reading the file. Please try again.');
  };

  const handleFileLoad = (event: ProgressEvent<FileReader>) => {
    const base64 = event.target?.result;
    if (base64 && typeof base64 === 'string') {
      setSelectedFile(base64);
    }
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files.length > 0 ? files[0] : null;

    // file exists?
    if (file) {
      setErrorMessage(null);

      // file valid ? load : error
      if (validateFileSize(file) && validateFileType(file)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => handleFileLoad(event);
        reader.onerror = (error) => handleFileError(error);
      }
    }
  };

  return { selectedFile, errorMessage, onSelectFile, setSelectedFile, removeSelecetedFile };
};

export default useSelectFile;
