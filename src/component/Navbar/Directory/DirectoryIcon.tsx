import { Icon } from '@chakra-ui/react';
import { DirectoryMenuState } from '@/atoms/directoryMenuAtom';

interface DirectoryIconProps {
  directoryState: DirectoryMenuState;
}

const DirectoryIcon = (props: DirectoryIconProps) => {
  const { directoryState } = props;

  const {
    selectedMenuItem: { icon, iconColor },
  } = directoryState;

  return (
    <Icon
      as={icon}
      color={iconColor}
      fontSize={24}
      mr={{
        base: 1,
        md: 2,
      }}
    />
  );
};

export default DirectoryIcon;
