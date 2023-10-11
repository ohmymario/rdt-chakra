import { Text } from '@chakra-ui/react';

interface DirectoryTextProps {}

const DirectoryText = (props: DirectoryTextProps) => {
  return (
    <Text
      pt={1}
      display={{
        base: 'none',
        md: 'none',
        lg: 'block',
      }}
      fontWeight={600}
      fontSize='10pt'
    >
      {/* {directoryState.selectedMenuItem.displayText} */}
      Display Text Here
    </Text>
  );
};

export default DirectoryText;
