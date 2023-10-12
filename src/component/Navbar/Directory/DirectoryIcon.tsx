import { Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

interface DirectoryIconProps {
  icon: IconType;
  iconColor: string;
}

const DirectoryIcon = (props: DirectoryIconProps) => {
  const { icon, iconColor } = props;

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
