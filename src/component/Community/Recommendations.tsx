import { useEffect } from 'react';
import { firestore } from '@/firebase/clientApp';
import { Community } from '@/atoms/communitiesAtom';
import { useState } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import useCommunityData from '@/hooks/useCommunityData';
import { Box, Button, Flex, FlexProps, Icon, Image, Skeleton, SkeletonCircle, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FaReddit } from 'react-icons/fa';

interface RecommendationsProps {}

const Recommendations = (props: RecommendationsProps) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    setLoading(true);
    try {
      const communityCollections = collection(firestore, 'communities');
      const communitySort = orderBy('numberOfMembers', 'desc');
      const communityLimit = limit(5);
      const communityQuery = query(communityCollections, communitySort, communityLimit);
      const communityResponse = await getDocs(communityQuery);
      const communities = communityResponse.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCommunities(communities as Community[]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  const handleCommunityStatus = (
    item: Community,
    isJoined: boolean,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    onJoinOrLeaveCommunity(item, isJoined);
  };

  const topCommunitiesHeaderStyles: FlexProps = {
    align: 'flex-end',
    color: 'white',
    p: '6px 10px',
    height: '70px',
    borderRadius: '4px 4px 0px 0px',
    fontWeight: 700,
    bgImage: 'url(/images/recCommsArt.png)',
    backgroundSize: 'cover',
    bgGradient: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url('images/recCommsArt.png')",
  };

  const communityWrappersStyles: FlexProps = {
    position: 'relative',
    align: 'center',
    fontSize: '10pt',
    borderBottom: '1px solid',
    borderColor: 'gray.200',
    p: '10px 12px',
  };

  const recommendationsWrapperStyles: FlexProps = {
    direction: 'column',
    bg: 'white',
    borderRadius: 4,
    border: '1px solid',
    borderColor: 'gray.300',
    width: '100%',
  };

  return (
    <Flex {...recommendationsWrapperStyles}>
      <Flex {...topCommunitiesHeaderStyles}>Top Communities</Flex>

      <Flex direction='column'>
        {loading ? (
          <>
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
            </Stack>
          </>
        ) : (
          <>
            {communities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find((snippet) => snippet.communityId === item.id);

              return (
                <Link key={item.id} href={`/r/${item.id}`}>
                  <Flex {...communityWrappersStyles}>
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

                    <Box position='absolute' right='10px'>
                      <Button
                        height='22px'
                        fontSize='8pt'
                        variant={isJoined ? 'outline' : 'solid'}
                        onClick={(e) => handleCommunityStatus(item, isJoined, e)}
                      >
                        {isJoined ? 'Joined' : 'Join'}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              );
            })}
            <Box p='10px 20px'>
              <Button height='30px' width='100%'>
                View All
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Recommendations;
