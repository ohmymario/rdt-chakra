import { FunctionComponent } from 'react';
import { Community } from '@/atoms/communitiesAtom';
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';

import useCommunityData from '@/hooks/useCommunityData';
import HeaderLogo from './HeaderLogo';

interface HeaderProps {
  communityData: Community;
}

const Header: FunctionComponent<HeaderProps> = (props) => {
  const { communityData } = props;

  const { communityStateValue, onJoinOrLeaveCommunity, loading } = useCommunityData();

  const isJoined = !!communityStateValue.mySnippets.find((community) => community.communityId === communityData.id);

  const handleJoinOrLeaveCommunity = () => {
    onJoinOrLeaveCommunity(communityData, isJoined);
  };

  return (
    <Flex height='146px' direction='column'>
      <Box height='50%' width='100%' bg='blue.400' />
      <Flex justify='center' bg='white' flexGrow='1'>
        <Flex width='95%' maxW='984px' position='relative'>
          <HeaderLogo imageURL={communityStateValue.currentCommunity?.imageURL} />
          <Flex padding='10px 16px' ml='80px' border=''>
            <Flex direction='column' mr={6}>
              <Text fontWeight={800} fontSize='16pt'>
                {communityData.name}
              </Text>
              <Text fontWeight={600} fontSize='10pt' color='gray.400'>
                r/{communityData.name}
              </Text>
            </Flex>
            <Flex>
              <Button
                height='32px'
                pr={6}
                pl={6}
                isLoading={loading}
                variant={isJoined ? 'outline' : 'solid'}
                onClick={handleJoinOrLeaveCommunity}
              >
                {isJoined ? 'Joined' : 'Join'}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
