import UseDirectory from '@/hooks/useDirectory';
import { Flex, Icon, Image, MenuItem } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';
import { FaReddit } from 'react-icons/fa';
import { DirectoryMenuItem } from '@/atoms/directoryMenuAtom';

interface CommunitiesListItemProps {
  communityId: string;
  icon?: IconType;
  iconColor?: string;
  ImageURL?: string;
}

const IconColorDefault = 'blue.500';
const IconDefault = FaReddit;

const CommunitiesListItem = (props: CommunitiesListItemProps) => {
  const { communityId, icon = IconDefault, iconColor = IconColorDefault, ImageURL } = props;
  const { onSelectMenuItem } = UseDirectory();

  const displayText = `r/${communityId}`;
  const link = `/r/${communityId}`;

  const handleMenuItemClick = () => {
    const MenuItemData: DirectoryMenuItem = {
      displayText,
      link,
      icon,
      iconColor,
      ImageURL,
    };

    onSelectMenuItem(MenuItemData);
  };

  return (
    <MenuItem width='100%' fontSize='10pt' _hover={{ bg: 'gray.100' }} onClick={handleMenuItemClick}>
      <Flex align='center'>
        {ImageURL && (
          <Image
            src={ImageURL}
            borderRadius='full'
            boxSize='18px'
            mr={2}
            alt={displayText ? `${displayText} icon` : ''}
          />
        )}
        {!ImageURL && <Icon as={icon} fontSize={20} mr={2} color={iconColor} />}
        {displayText}
      </Flex>
    </MenuItem>
  );
};

export default CommunitiesListItem;
