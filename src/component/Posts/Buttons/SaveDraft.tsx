import { Button, Flex } from '@chakra-ui/react';

interface SaveDraftProps {
  isDisabled?: boolean;
  loading?: boolean;
  functionality?: () => Promise<void>;
}

const SaveDraft = (props: SaveDraftProps) => {
  const { isDisabled, functionality, loading } = props;

  const buttonStyles = {
    _hover: isDisabled
      ? {
          backgroundColor: 'gray.50',
        }
      : {
          backgroundColor: 'gray.50',
        },
  };

  return (
    <Flex justify={'flex-end'}>
      <Button
        {...buttonStyles}
        isDisabled={isDisabled}
        isLoading={loading}
        onClick={functionality}
        variant='postOutline'
      >
        Save Draft
      </Button>
    </Flex>
  );
};

export default SaveDraft;
