import { Text } from '@chakra-ui/react';

interface DirectoryTextProps {
  displayText: string;
}

const directoryStyle = {
  pt: 1,
  fontWeight: 600,
  fontSize: '10pt',
  display: {
    base: 'none',
    md: 'none',
    lg: 'block',
  },
};

const DirectoryText = (props: DirectoryTextProps) => {
  const { displayText } = props;

  return (
    <>
      <Text {...directoryStyle}>{displayText}</Text>
    </>
  );
};

export default DirectoryText;
