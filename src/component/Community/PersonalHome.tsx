import { Flex, Icon, Stack, Button, Text, FlexProps } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';

interface PersonalHomeProps {}

const flexWrapperStyles: FlexProps = {
  direction: 'column',
  bg: 'white',
  borderRadius: 4,
  cursor: 'pointer',
  p: '12px',
  border: '1px solid',
  borderColor: 'gray.300',
  position: 'sticky',
};

const flexInnerStyles: FlexProps = {
  align: 'flex-end',
  color: 'white',
  p: '6px 10px',
  bg: 'blue.500',
  height: '34px',
  borderRadius: '4px 4px 0px 0px',
  fontWeight: 600,
  bgImage: 'url(/images/redditPersonalHome.png)',
  backgroundSize: 'cover',
};

const PersonalHome = (props: PersonalHomeProps) => {
  return (
    <Flex {...flexWrapperStyles}>
      <Flex {...flexInnerStyles}></Flex>
      <Flex direction='column' p='12px'>
        <Flex align='center' mb={2}>
          <Icon as={FaReddit} fontSize={50} color='brand.100' mr={2} />
          <Text fontWeight={600}>Home</Text>
        </Flex>
        <Stack spacing={3}>
          <Text fontSize='9pt'>Your personal Reddit frontpage, built for you.</Text>

          {/* TODO: Check if the user is signed in if not open up the login */}
          {/* TODO: If they are signed in then scroll up and open menu */}
          <Button height='30px'>Create Post</Button>

          {/* TODO: Check if the user is signed in if not open up the login */}
          {/* TODO: signed in then open up create community modal */}
          <Button variant='outline' height='30px'>
            Create Community
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default PersonalHome;
