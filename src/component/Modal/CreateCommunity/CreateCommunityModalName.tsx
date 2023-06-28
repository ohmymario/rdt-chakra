import { Box, Heading, Input, Text } from '@chakra-ui/react';

interface CreateCommunityModalNameProps {
  communityName: string;
  handleCommunityName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  charsRemain: number;
}

const subTextStyles = {
  fontSize: '8pt',
  color: 'gray.500',
};

const CreateCommunityModalName = (props: CreateCommunityModalNameProps) => {
  const { communityName, handleCommunityName, charsRemain } = props;
  return (
    <>
      <Box>
        <Heading as='h4' size='sm' mb={2} fontWeight='500'>
          Name
        </Heading>
        <Text {...subTextStyles}>Community names including capitalization cannot be changed.</Text>
      </Box>
      <Text position='relative' top='37px' left='10px' width='20px' color='gray.400'>
        r/
      </Text>
      <Input
        position='relative'
        pl='20px'
        size='sm'
        borderRadius='md'
        value={communityName}
        onChange={(e) => handleCommunityName(e)}
      />
      <Text {...subTextStyles} color={!charsRemain ? 'red' : 'gray.500'}>
        {charsRemain} characters remaining
      </Text>
    </>
  );
};

export default CreateCommunityModalName;
