// React & Next.js core
import { Menu, MenuList } from '@chakra-ui/react';

// Icons

// Custom Hooks
import useDirectory from '@/hooks/useDirectory';

// Sub-components
import Communities from './Communities/Communities';

// User/Auth
import { User as FirebaseUser } from 'firebase/auth';
import DirectoryMenuButton from './DirectoryMenuButton';

interface DirectoryProps {
  user: FirebaseUser | null | undefined;
}

const Directory = (props: DirectoryProps) => {
  const { directoryState, toggleMenuOpen } = useDirectory();
  const { user } = props;

  const { selectedMenuItem } = directoryState;

  if (!user) return null;

  return (
    <Menu isOpen={directoryState.isOpen}>
      {/* BUTTON AND CURRENT COMMUNITY */}
      <DirectoryMenuButton selectedMenuItem={selectedMenuItem} toggleMenuOpen={toggleMenuOpen} />
      {/* DROPDOWN */}
      <MenuList fontSize='10pt'>
        <Communities />
      </MenuList>
    </Menu>
  );
};

export default Directory;
