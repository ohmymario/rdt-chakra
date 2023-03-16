import { FunctionComponent } from 'react';
import { Community } from '@/atoms/communitiesAtom';
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';

interface HeaderProps {
  communityData: Community;
}

const Header: FunctionComponent<HeaderProps> = (props) => {
  const { communityData } = props;

  const isJoined = false;
  return (
    <Flex height='146px' direction='column'>
      <Box height='50%' width='100%' bg='blue.400' />
      <Flex justify='center' bg='white' flexGrow='1'>
        <Flex width='95%' maxW='860px' position='relative'>
          {communityData.imageURL ? (
            <Image alt={communityData.name} />
          ) : (
            <Icon
              as={FaReddit}
              position='absolute'
              boxSize={20}
              top={-3}
              bg='white'
              borderRadius='50%'
              border='3px solid'
              borderColor='white'
            />
          )}

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
                variant={isJoined ? 'outline' : 'solid'}
                onClick={() => {
                  console.log('clicked');
                  console.log('clicked');
                }}
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
