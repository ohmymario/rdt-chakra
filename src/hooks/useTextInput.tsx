import { useState } from 'react';

export interface InputType {
  title: string;
  body: string;
}

/**
 * @desc Manages the text input state for a form.
 * @returns An object containing the text input state, a state setter function, and an input change handler.
 */

export const useTextInput = () => {
  const [textInput, setTextInput] = useState<InputType>({ title: '', body: '' });

  /**
   * @desc Handles changes to text input fields and updates the state.
   * @param e - The React change event from the input fields.
   */

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setTextInput((prev) => ({ ...prev, [name]: value }));
  };

  return { textInput, handleInputChange };
};
