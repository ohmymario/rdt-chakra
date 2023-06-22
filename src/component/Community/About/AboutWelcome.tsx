import { Text } from '@chakra-ui/react';

interface AboutWelcomeProps {
  creatorId: string;
}

const AboutWelcome = (props: AboutWelcomeProps) => {
  const { creatorId } = props;
  return (
    <Text>
      Welcome to r/{creatorId}, the place for almost anything {creatorId} related.
    </Text>
  );
};

export default AboutWelcome;
