import { Icon, IconProps, Image, ImageProps } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';

interface HeaderLogoProps {
  imageURL?: string;
}

const logoStyles: Partial<ImageProps & IconProps> = {
  position: 'absolute',
  top: -3,
  color: 'blue.500',
  bg: 'white',
  borderRadius: 'full',
  border: '3px solid',
  borderColor: 'white',
};

const HeaderLogo = (props: HeaderLogoProps) => {
  const { imageURL } = props;

  return imageURL ? (
    <Image src={imageURL} alt='logo' boxSize='66px' {...logoStyles} />
  ) : (
    <Icon as={FaReddit} boxSize={20} {...logoStyles} />
  );
};

export default HeaderLogo;
