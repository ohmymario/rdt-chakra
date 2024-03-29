import { useEffect } from 'react';
import { firestore } from '@/firebase/clientApp';
import { Community } from '@/atoms/communitiesAtom';
import { useState } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import useCommunityData from '@/hooks/useCommunityData';
import { Box, Button, Flex, FlexProps, Icon, Image, Skeleton, SkeletonCircle, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FaReddit } from 'react-icons/fa';
import RecommendationsSkeleton from './RecommendationsSkeleton';
import RecommendationsJoinLeaveButton from './RecommendationsJoinLeaveButton';
import RecommendationsLink from './RecommendationsLink';
import RecommendationsViewAll from './RecommendationsViewAll';

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
          <RecommendationsSkeleton />
        ) : (
          <>
            {communities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find((snippet) => snippet.communityId === item.id);

              return (
                <Link key={item.id} href={`/r/${item.id}`}>
                  <Flex {...communityWrappersStyles}>
                    <RecommendationsLink item={item} index={index} />

                    <RecommendationsJoinLeaveButton
                      handleCommunityStatus={handleCommunityStatus}
                      isJoined={isJoined}
                      item={item}
                    />
                  </Flex>
                </Link>
              );
            })}
            <RecommendationsViewAll />
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Recommendations;
