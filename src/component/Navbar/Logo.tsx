// React & Next.js core
import { Flex, Image } from '@chakra-ui/react';

// Atoms
import { defaultMenuItem } from '@/atoms/directoryMenuAtom';

// Custom Hooks
import useDirectory from '@/hooks/useDirectory';

interface LogoProps {}

const Logo = (props: LogoProps) => {
  const { onSelectMenuItem } = useDirectory();

  const handleHomeClick = () => {
    // changes the Directory menu to Home
    onSelectMenuItem(defaultMenuItem);
  };

  return (
    <Flex align='center' cursor='pointer' onClick={handleHomeClick}>
      <Image src='/images/redditFace.svg' alt='logo' height='30px' />
      <Image
        src='/images/redditText.svg'
        alt='logo'
        height='40px'
        display={{
          base: 'none',
          md: 'none',
          lg: 'block',
        }}
      />
    </Flex>
  );
};

export default Logo;
