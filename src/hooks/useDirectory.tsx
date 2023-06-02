import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { DirectoryMenuItem, directoryMenuState } from '../atoms/directoryMenuAtom';

const UseDirectory = () => {
  const router = useRouter();
  const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({ ...prev, selectedMenuItem: menuItem }));
    router.push(menuItem.link);
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  return { directoryState, toggleMenuOpen, onSelectMenuItem };
};

export default UseDirectory;
