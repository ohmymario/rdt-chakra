import { Button, Flex } from '@chakra-ui/react';

interface CancelProps {
  isDisabled?: boolean;
  loading?: boolean;
  functionality?: () => Promise<void>;
}

const Cancel = (props: CancelProps) => {
  const { isDisabled, functionality, loading } = props;

  const cancelButtonStyles = {
    color: 'blue.500',
    borderColor: 'blue.500',
    _hover: {
      bg: 'gray.50',
    },
  };

  return (
    <Flex justify={'flex-end'}>
      <Button
        {...cancelButtonStyles}
        isDisabled={isDisabled}
        isLoading={loading}
        onClick={functionality}
        variant='postOutline'
      >
        Cancel
      </Button>
    </Flex>
  );
};

export default Cancel;
