import { Flex, HStack, Icon, Spinner, Text } from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import { IoArrowRedoOutline, IoBookmarkOutline } from 'react-icons/io5';
import { SlPresent } from 'react-icons/sl';

interface PostItemActionsProps {
  numberOfComments: number;
  loadingDelete: boolean;
  userIsCreator: boolean;
  handleDelete: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>;
}

const actionStyles = {
  align: 'center',
  gap: 1.5,
  px: 1.5,
  py: 2,
  _hover: { bg: 'gray.200' },
};

const PostItemActions = (props: PostItemActionsProps) => {
  const { numberOfComments, handleDelete, userIsCreator, loadingDelete } = props;

  return (
    <HStack fontSize='xs' spacing={1} fontWeight={600} color='gray.500'>
      <Flex {...actionStyles}>
        <Icon as={BsChat} fontSize={20} />
        <Text>{numberOfComments} Comments</Text>
      </Flex>
      <Flex {...actionStyles}>
        <Icon as={SlPresent} fontSize={20} />
        <Text>Award</Text>
      </Flex>
      <Flex {...actionStyles}>
        <Icon as={IoArrowRedoOutline} fontSize={20} />
        <Text>Share</Text>
      </Flex>
      <Flex {...actionStyles}>
        <Icon as={IoBookmarkOutline} fontSize={20} />
        <Text>Save</Text>
      </Flex>
      <Flex {...actionStyles} onClick={(e) => handleDelete(e)}>
        {userIsCreator && (
          <>
            {loadingDelete ? (
              <Spinner size='sm' color='gray.500' />
            ) : (
              <>
                <Icon as={AiOutlineDelete} fontSize={20} cursor='pointer' />
                <Text>Delete</Text>
              </>
            )}
          </>
        )}
      </Flex>
    </HStack>
  );
};

export default PostItemActions;
