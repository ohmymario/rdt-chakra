import { IconType } from 'react-icons/lib';
import { TiHome } from 'react-icons/ti';
import { atom } from 'recoil';

// TYPES
export interface DirectoryMenuItem {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  ImageURL?: string;
}

interface DirectoryMenuState {
  isOpen: boolean;
  selectedMenuItem: DirectoryMenuItem;
}

// DEFAULTS
export const defaultMenuItem: DirectoryMenuItem = {
  displayText: 'Home',
  link: '/',
  icon: TiHome,
  iconColor: 'black',
};

export const defaultMenuState: DirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: defaultMenuItem,
};

// ATOM STATE
export const directoryMenuState = atom<DirectoryMenuState>({
  key: 'directoryMenuState',
  default: defaultMenuState,
});
