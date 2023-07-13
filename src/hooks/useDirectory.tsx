import { communitiesState } from '@/atoms/communitiesAtom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaReddit } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DirectoryMenuItem, directoryMenuState } from '../atoms/directoryMenuAtom';

const useDirectory = () => {
  const router = useRouter();
  const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);

  const communityStateValue = useRecoilValue(communitiesState);
  const { currentCommunity } = communityStateValue;

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({ ...prev, selectedMenuItem: menuItem }));
    router.push(menuItem.link);

    if (directoryState.isOpen === true) {
      toggleMenuOpen();
    }
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  useEffect(() => {
    if (currentCommunity) {
      const packagedMenuItem = {
        displayText: `r/${currentCommunity.id}`,
        link: `/r/${currentCommunity.id}`,
        icon: FaReddit,
        iconColor: 'blue.500',
        ImageURL: currentCommunity.imageURL,
      };

      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: packagedMenuItem,
      }));
    }
  }, [currentCommunity]);

  return { directoryState, toggleMenuOpen, onSelectMenuItem };
};

export default useDirectory;
