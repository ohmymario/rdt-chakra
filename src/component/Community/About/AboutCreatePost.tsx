import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface AboutCreatePostProps {
  creatorId: string;
}

const AboutCreatePost = (props: AboutCreatePostProps) => {
  const { creatorId } = props;
  return (
    <Link href={`/r/${creatorId}/submit`} passHref>
      <Button colorScheme='blue' height='30px' width='100%' my={2}>
        Create Post
      </Button>
    </Link>
  );
};

export default AboutCreatePost;
