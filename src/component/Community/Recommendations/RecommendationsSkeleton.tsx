import { Stack, Flex, SkeletonCircle, Skeleton } from '@chakra-ui/react';

const RecommendationsSkeleton = () => {
  return (
    <Stack mt={2} p={3}>
      <Flex justify='space-between' align='center'>
        <SkeletonCircle size='10' />
        <Skeleton height='10px' w='70%' />
      </Flex>
      <Flex justify='space-between' align='center'>
        <SkeletonCircle size='10' />
        <Skeleton height='10px' w='70%' />
      </Flex>
      <Flex justify='space-between' align='center'>
        <SkeletonCircle size='10' />
        <Skeleton height='10px' w='70%' />
      </Flex>
      <Flex justify='space-between' align='center'>
        <SkeletonCircle size='10' />
        <Skeleton height='10px' w='70%' />
      </Flex>
      <Flex justify='space-between' align='center'>
        <SkeletonCircle size='10' />
        <Skeleton height='10px' w='70%' />
      </Flex>
    </Stack>
  );
};

export default RecommendationsSkeleton;
