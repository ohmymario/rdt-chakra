import { Checkbox, Heading, Highlight, VStack } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

interface CreateCommunityModalAdultProps {
  isAdult: boolean;
  handleNSFW: () => void;
}

const CreateCommunityModalAdult = (props: CreateCommunityModalAdultProps) => {
  const { isAdult, handleNSFW } = props;

  return (
    <VStack width={'100%'} align='flex-start'>
      <Heading as='h4' size='sm' fontWeight='500'>
        Adult Content
      </Heading>
      <Checkbox isChecked={isAdult} onChange={() => handleNSFW()}>
        <Highlight
          query='NSFW'
          styles={{
            px: '1',
            py: '1',
            top: '-2px',
            position: 'relative',
            bg: 'red.400',
            color: 'white',
            fontSize: '2xs',
            fontWeight: 'bold',
          }}
        >
          NSFW 18+ year old community
        </Highlight>
      </Checkbox>
    </VStack>
  );
};

export default CreateCommunityModalAdult;
