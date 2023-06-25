import { Community } from '@/atoms/communitiesAtom';
import { Box, Flex } from '@chakra-ui/react';

import useCommunityData from '@/hooks/useCommunityData';
import HeaderJoinLeaveButton from './HeaderJoinLeaveButton';
import HeaderLogo from './HeaderLogo';
import HeaderText from './HeaderText';

interface HeaderProps {
  communityData: Community;
}

const Header = (props: HeaderProps) => {
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
            <HeaderText name={communityData.name} />
            <HeaderJoinLeaveButton
              isJoined={isJoined}
              loading={loading}
              handleJoinOrLeaveCommunity={handleJoinOrLeaveCommunity}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
