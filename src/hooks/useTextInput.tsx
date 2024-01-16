import { useState } from 'react';

export interface inputType {
  title: string;
  body: string;
}

export const useTextInput = () => {
  const [textInput, setTextInput] = useState<inputType>({ title: '', body: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setTextInput((prev) => ({ ...prev, [name]: value }));
  };

  return { textInput, setTextInput, handleInputChange };
};
