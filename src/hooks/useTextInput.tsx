import { useState } from 'react';

export interface inputType {
  title: string;
  body: string;
}

export const useTextInput = () => {
  const [textInput, setTextInput] = useState<inputType>({ title: '', body: '' });

  return { textInput, setTextInput };
};
