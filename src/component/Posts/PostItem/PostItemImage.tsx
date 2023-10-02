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
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    setImageError(null);
  }, [imageURL]);

  return (
    <Flex justifyContent='center' alignItems='center' w='100%' pl='4px'>
      <Skeleton isLoaded={!loadingImage} width='100%'>
        {imageURL && !imageError ? (
          <Image
            boxSize='100%'
            minH={250}
            objectFit='contain'
            src={imageURL}
            alt={`image of ${title}`}
            onLoad={() => setLoadingImage(false)}
            onError={() => {
              setImageError("We couldn't load this image, please try again later.");
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
            {imageError || 'No Image Found'}
          </Grid>
        )}
      </Skeleton>
    </Flex>
  );
};

export default PostItemImage;
