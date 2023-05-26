import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

interface CommentsSkeletonProps {
  numberOfComments: number;
}

const CommentsSkeleton = (props: CommentsSkeletonProps) => {
  const { numberOfComments } = props;

  const skeletonArray = [...Array(numberOfComments)];
  return (
    <>
      {skeletonArray.map((_, index) => (
        <Box key={index}>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' />
        </Box>
      ))}
    </>
  );
};

export default CommentsSkeleton;
