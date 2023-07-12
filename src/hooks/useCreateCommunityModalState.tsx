import { useRecoilState } from 'recoil';
import { CommunityModalState, createCommunityModalState } from '@/atoms/communityModalAtom';

interface UseCreateCommunityModalStateReturn {
  modalState: CommunityModalState;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const useCreateCommunityModalState = (): UseCreateCommunityModalStateReturn => {
  const [modalState, setModalState] = useRecoilState(createCommunityModalState);

  const openModal = () => {
    setModalState((prev) => ({
      ...prev,
      isModalOpen: true,
    }));
  };

  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      isModalOpen: false,
    }));
  };

  const toggleModal = () => {
    setModalState((prevModalState) => ({
      ...prevModalState,
      isModalOpen: !prevModalState.isModalOpen,
    }));
  };

  return { modalState, openModal, closeModal, toggleModal };
};

export default useCreateCommunityModalState;
