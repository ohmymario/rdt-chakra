import { communitiesState } from '@/atoms/communitiesAtom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaReddit } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DirectoryMenuItem, directoryMenuState } from '../atoms/directoryMenuAtom';

const useDirectory = () => {
  const router = useRouter();
  const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);

  const communityStateValue = useRecoilValue(communitiesState);
  const { currentCommunity } = communityStateValue;

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({ ...prev, selectedMenuItem: menuItem }));
    const link = menuItem.link;

    if (directoryState.isOpen === true) {
      toggleMenuOpen();
    }

    router.push(link);
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  useEffect(() => {
    if (router.pathname === '/') {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: 'Home',
          link: '/',
          icon: TiHome,
          iconColor: 'black',
        },
      }));
      return;
    }

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
  }, [currentCommunity, router.pathname, setDirectoryState]);

  return { directoryState, toggleMenuOpen, onSelectMenuItem };
};

export default useDirectory;
