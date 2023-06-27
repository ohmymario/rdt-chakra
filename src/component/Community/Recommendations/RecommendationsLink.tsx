import { Community } from '@/atoms/communitiesAtom';
import { Flex, Icon, Image, Text } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';

interface RecommendationsLinkProps {
  item: Community;
  index: number;
}

const RecommendationsLink = (props: RecommendationsLinkProps) => {
  const { item, index } = props;
  return (
    <Flex w='80%' align='center'>
      <Flex w='15%'>
        <Text>{index + 1}</Text>
      </Flex>
      <Flex w='80%' align='center'>
        {item.imageURL ? (
          <Image src={item.imageURL} alt={item.name} borderRadius='full' boxSize='28px' mr={2} />
        ) : (
          <Icon as={FaReddit} fontSize={30} color='brand.100' mr={2} />
        )}
        <span>{`r/${item.id}`}</span>
      </Flex>
    </Flex>
  );
};

export default RecommendationsLink;
