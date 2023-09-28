import { Flex, Grid, Image, Skeleton } from '@chakra-ui/react';
import { SetStateAction, useEffect, useState } from 'react';

interface PostItemImageProps {
  imageURL: string | undefined;
  title?: string;
  loadingImage: boolean;
  setLoadingImage: (value: SetStateAction<boolean>) => void;
}

const PostItemImage = (props: PostItemImageProps) => {
  const { imageURL, title, loadingImage, setLoadingImage } = props;
  const [imageError, setImageError] = useState<boolean>(false);

  // Reset image error state when imageURL changes
  // so if there is an error on a previous image, it won't show up on the next image
  useEffect(() => {
    setImageError(false);
  }, [imageURL]);

  return (
    <Flex justifyContent='center' alignItems='center' w='100%' pl='4px'>
      <Skeleton isLoaded={!loadingImage} width='100%'>
        {imageURL && !imageError ? (
          <Image
            boxSize='100%'
            objectFit='contain'
            src={imageURL}
            alt={`image of ${title}`}
            onLoad={() => {
              setLoadingImage(false);
            }}
            onError={() => {
              setImageError(true);
              setLoadingImage(false);
            }}
          />
        ) : (
          <Grid
            w='100%'
            p={4}
            color='gray.500'
            height='250px'
            placeItems='center'
            border='1px solid'
            borderColor='gray.500'
            borderRadius={4}
          >
            No Image Found
          </Grid>
        )}
      </Skeleton>
    </Flex>
  );
};

export default PostItemImage;
