import { FunctionComponent } from 'react';

interface LogoProps {}

const Logo = (props: LogoProps) => {
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
