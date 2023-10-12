import { Image } from '@chakra-ui/react';
import { DirectoryMenuState } from '@/atoms/directoryMenuAtom';

interface DirectoryImageProps {
  ImageURL: string;
  displayText: string;
}

const imageStyle = {
  boxSize: '24px',
  borderRadius: 'full',
  mr: {
    base: 1,
    md: 2,
  },
};

const DirectoryImage = (props: DirectoryImageProps) => {
  const { ImageURL, displayText } = props;

  return (
    <>
      <Image {...imageStyle} src={ImageURL} alt={displayText} />
    </>
  );
};

export default DirectoryImage;
