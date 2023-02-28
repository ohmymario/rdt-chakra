import { atom } from 'recoil';

// typescript

export interface AuthModalState {
  isOpen: boolean;
  view: 'login' | 'signup' | 'resetPassword';
}

// default state
const defaultModalState: AuthModalState = {
  isOpen: false,
  view: 'login',
};

// atom state to give to recoil
export const authModalState = atom<AuthModalState>({
  key: 'authModalState',
  default: defaultModalState,
});
