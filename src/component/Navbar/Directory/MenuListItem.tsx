import UseDirectory from '@/hooks/useDirectory';
import { Flex, Icon, Image, MenuItem } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

interface MenuListItemProps {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  ImageURL?: string;
}

const MenuListItem = (props: MenuListItemProps) => {
  const { displayText, link, icon, iconColor, ImageURL } = props;
  const { onSelectMenuItem } = UseDirectory();
  return (
    <MenuItem
      width='100%'
      fontSize='10pt'
      _hover={{ bg: 'gray.100' }}
      onClick={() => {
        onSelectMenuItem({
          displayText,
          link,
          icon,
          iconColor,
          ImageURL,
        });
      }}
    >
      <Flex align='center'>
        {ImageURL ? (
          <Image src={ImageURL} borderRadius='full' boxSize='18px' mr={2} alt={`${displayText} icon`} />
        ) : (
          <Icon as={icon} fontSize={20} mr={2} color={iconColor} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};

export default MenuListItem;
