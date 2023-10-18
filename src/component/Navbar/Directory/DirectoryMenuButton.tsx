import { FunctionComponent } from 'react';

interface DirectoryMenuButtonProps {}

const DirectoryMenuButton = (props: DirectoryMenuButtonProps) => {
  return (
    <MenuButton as={Button} {...menuButtonStyle} onClick={toggleMenuOpen}>
      <HStack spacing={0.5} align='center' justify={'space-between'}>
        <Flex align='center'>
          {ImageURL && <DirectoryImage ImageURL={ImageURL} displayText={displayText} />}
          {!ImageURL && <DirectoryIcon icon={icon} iconColor={iconColor} />}
          <DirectoryText displayText={displayText} />
        </Flex>
        <ChevronDownIcon boxSize={5} color='gray.400' />
      </HStack>
    </MenuButton>
  );
};

export default DirectoryMenuButton;
