import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { User as FirebaseUser } from 'firebase/auth';

interface UserMenuProps {
  user: FirebaseUser | null | undefined;
}

const UserMenu: FunctionComponent<UserMenuProps> = (props: UserMenuProps) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>

        {/* Dark Mode on a Toggle */}
        {/* Help Center */}
        {/* More */}
        {/* Terms & Policies */}
        {/* Advertise on Reddit */}

        {/* Horizontal Line */}

        {/* Log In / Sign Up */}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
