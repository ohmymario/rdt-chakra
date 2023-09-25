import { Flex, Grid, Image, Skeleton } from '@chakra-ui/react';
import { SetStateAction } from 'react';

interface PostItemImageProps {
  imageURL: string | undefined;
  title?: string;
  loadingImage: boolean;
  setLoadingImage: (value: SetStateAction<boolean>) => void;
}

const PostItemImage = (props: PostItemImageProps) => {
  const { imageURL, title, loadingImage, setLoadingImage } = props;

  return (
    <Flex justifyContent='center' alignItems='center' w='100%' pl='4px'>
      <Skeleton isLoaded={!loadingImage} width='100%'>
        {imageURL ? (
          <Image
            boxSize='100%'
            objectFit='contain'
            src={imageURL}
            alt={`image of ${title}`}
            onLoad={() => {
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
