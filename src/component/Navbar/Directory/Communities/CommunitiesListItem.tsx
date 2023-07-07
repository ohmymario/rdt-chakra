import UseDirectory from '@/hooks/useDirectory';
import { Flex, Icon, Image, MenuItem } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';
import { FaReddit } from 'react-icons/fa';

interface CommunitiesListItemProps {
  communityId: string;
  icon?: IconType;
  iconColor?: string;
  ImageURL?: string;
}

const CommunitiesListItem = (props: CommunitiesListItemProps) => {
  const { communityId, icon = FaReddit, iconColor = 'blue.500', ImageURL } = props;
  const { onSelectMenuItem } = UseDirectory();

  const displayText = `r/${communityId}`;
  const link = `/r/${communityId}`;

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

export default CommunitiesListItem;
