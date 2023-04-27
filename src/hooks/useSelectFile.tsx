import { useState } from 'react';

const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const files = e.target.files;
    const checkForFile = files && files.length > 0;
    const oneMB = 1000000;
    if (checkForFile) {
      if (files[0].size > oneMB) {
        alert(`
            File size is too big!
            Please select an image less than 1MB.
            `);
        return;
      }
      reader.readAsDataURL(files[0]);
    }

    reader.onload = () => {
      const base64 = reader.result;
      if (base64 && typeof base64 === 'string') {
        setSelectedFile(base64);
      }
    };

    reader.onerror = (error) => {
      console.log('error', error);
    };
  };

  return { selectedFile, onSelectFile, setSelectedFile };
};

export default useSelectFile;
