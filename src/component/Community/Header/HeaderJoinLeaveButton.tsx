import { Button, Flex } from '@chakra-ui/react';

interface HeaderJoinLeaveButtonProps {
  isJoined: boolean;
  loading: boolean;
  handleJoinOrLeaveCommunity: () => void;
}

const buttonStyles = {
  height: '32px',
  pr: 6,
  pl: 6,
};

const HeaderJoinLeaveButton = (props: HeaderJoinLeaveButtonProps) => {
  const { isJoined, loading, handleJoinOrLeaveCommunity } = props;
  return (
    <Flex>
      <Button
        {...buttonStyles}
        isLoading={loading}
        variant={isJoined ? 'outline' : 'solid'}
        onClick={handleJoinOrLeaveCommunity}
      >
        {isJoined ? 'Joined' : 'Join'}
      </Button>
    </Flex>
  );
};

export default HeaderJoinLeaveButton;
