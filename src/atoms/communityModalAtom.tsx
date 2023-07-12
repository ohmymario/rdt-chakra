import { atom } from 'recoil';

// INTERFACE
export interface CommunityModalState {
  isModalOpen: boolean;
}

// DEFAULT STATE
const defaultModalState: CommunityModalState = {
  isModalOpen: false,
};

// ATOM
export const createCommunityModalState = atom<CommunityModalState>({
  key: 'createCommunityModalState',
  default: defaultModalState,
});
