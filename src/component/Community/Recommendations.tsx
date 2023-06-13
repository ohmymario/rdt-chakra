import { useEffect } from 'react';
import { firestore } from '@/firebase/clientApp';
import { Community } from '@/atoms/communitiesAtom';
import { useState } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import useCommunityData from '@/hooks/useCommunityData';

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

  return <div>Recommendations</div>;
};

export default Recommendations;
