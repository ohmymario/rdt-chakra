import { Text } from '@chakra-ui/react';

interface AboutWelcomeProps {
  name: string;
}

const AboutWelcome = (props: AboutWelcomeProps) => {
  const { name } = props;
  return (
    <Text>
      Welcome to r/{name}, the place for almost anything {name} related.
    </Text>
  );
};

export default AboutWelcome;
