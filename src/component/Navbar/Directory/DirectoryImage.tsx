import { Image } from '@chakra-ui/react';
import { DirectoryMenuState } from '@/atoms/directoryMenuAtom';

interface DirectoryImageProps {
  directoryState: DirectoryMenuState;
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
  const { directoryState } = props;

  const {
    selectedMenuItem: { ImageURL, displayText },
  } = directoryState;

  return (
    <>
      <Image {...imageStyle} src={ImageURL} alt={`${displayText}`} />
    </>
  );
};

export default DirectoryImage;
