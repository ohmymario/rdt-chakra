import { Flex, HStack, Skeleton, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

const PostLoader: FunctionComponent = () => {
  return (
    <Flex mb={2}>
      <Flex flexDir='column' alignItems='center' justifyContent='flex-start' w={'40px'} p={2} bg='gray.300'>
        <SkeletonCircle size='20px' />
        <SkeletonText skeletonHeight='4' my='2' noOfLines={1} w='100%' />
        <SkeletonCircle size='20px' />
      </Flex>
      <VStack align='flex-start' flexDir='column' flexGrow={1} m='8px 8px 2px 4px' spacing={5}>
        <VStack align='flex-start' width='100%' spacing={3}>
          <SkeletonText noOfLines={1} skeletonHeight='2' w='80px' />
          <SkeletonText noOfLines={1} skeletonHeight='4' w='120px' mt={'20px'} />
        </VStack>
        <SkeletonText noOfLines={3} spacing='4' skeletonHeight='2' w={'100%'} mt={'20px'} />
        <Skeleton height='200px' w='100%' />
        <HStack spacing={2} justify='center'>
          <SkeletonText noOfLines={1} skeletonHeight='25' w='80px' />
          <SkeletonText noOfLines={1} skeletonHeight='25' w='80px' />
          <SkeletonText noOfLines={1} skeletonHeight='25' w='80px' />
        </HStack>
      </VStack>
    </Flex>
  );
};

export default PostLoader;
