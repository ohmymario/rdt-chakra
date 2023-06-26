import { Community } from '@/atoms/communitiesAtom';
import { Button, Box } from '@chakra-ui/react';

interface RecommendationsJoinLeaveButtonProps {
  item: Community;
  isJoined: boolean;
  handleCommunityStatus: (
    item: Community,
    isJoined: boolean,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const RecommendationsJoinLeaveButton = (props: RecommendationsJoinLeaveButtonProps) => {
  const { item, isJoined, handleCommunityStatus } = props;

  return (
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
  );
};

export default RecommendationsJoinLeaveButton;
