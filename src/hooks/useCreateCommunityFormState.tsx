import { useState } from 'react';

interface UseCreateCommunityFormStateReturnProps {
  communityName: string;
  charsRemain: number;
  communityType: AccessLevel;
  isAdult: boolean;
  handleCommunityName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCommunityType: (e: string) => void;
  handleNSFW: () => void;
  resetForm: () => void;
}

export type AccessLevel = 'public' | 'restricted' | 'private';

const useCreateCommunityFormState = (): UseCreateCommunityFormStateReturnProps => {
  const [communityName, setCommunityName] = useState<string>('');
  const [charsRemain, setCharsRemain] = useState<number>(21);
  const [communityType, setCommunityType] = useState<AccessLevel>('public');
  const [isAdult, setIsAdult] = useState<boolean>(false);

  const handleCommunityName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (name.length > 21) return;
    setCharsRemain(21 - name.length);
    setCommunityName(name);
  };

  const handleCommunityType = (e: string) => {
    setCommunityType(e as AccessLevel);
  };

  const handleNSFW = () => {
    setIsAdult(!isAdult);
  };

  const resetForm = () => {
    setCommunityName('');
    setCharsRemain(21);
    setCommunityType('public');
    setIsAdult(false);
  };

  return {
    communityName,
    charsRemain,
    communityType,
    isAdult,
    handleCommunityName,
    handleCommunityType,
    handleNSFW,
    resetForm,
  };
};

export default useCreateCommunityFormState;
