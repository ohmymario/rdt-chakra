import { Flex, HStack, Icon, Spinner, Text } from '@chakra-ui/react';

// React Icons
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

interface ActionItemProps {
  icon: React.ElementType;
  text: string;
  action?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>;
}

interface DeleteActionProps {
  loadingDelete: boolean;
  userIsCreator: boolean;
  handleDelete: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>;
}

const actionStyles = {
  align: 'center',
  gap: 1.5,
  px: 1.5,
  py: 2,
  cursor: 'pointer',
  _hover: { bg: 'gray.200' },
};

// Generic Component for any action item
const ActionItem = (props: ActionItemProps) => {
  const { icon, text, action } = props;

  const conditionalProps = action ? { onClick: action } : {};

  return (
    <Flex {...actionStyles} {...conditionalProps}>
      <Icon as={icon} fontSize={20} />
      <Text>{text}</Text>
    </Flex>
  );
};

// Delete Logic w/ loading state
const DeleteAction = (props: DeleteActionProps) => {
  const { loadingDelete, userIsCreator, handleDelete } = props;

  if (!userIsCreator) return null;

  if (loadingDelete) {
    return (
      <Flex {...actionStyles} width='70px' justifyContent='center'>
        <Spinner size='sm' color='gray.500' />
      </Flex>
    );
  }

  return <ActionItem icon={AiOutlineDelete} text='Delete' action={handleDelete} />;
};

const PostItemActions = (props: PostItemActionsProps) => {
  const { numberOfComments, loadingDelete, userIsCreator, handleDelete } = props;

  return (
    <HStack fontSize='xs' spacing={1} fontWeight={600} color='gray.500'>
      <ActionItem icon={BsChat} text={`${numberOfComments} Comments`} />
      <ActionItem icon={SlPresent} text='Award' />
      <ActionItem icon={IoArrowRedoOutline} text='Share' />
      <ActionItem icon={IoBookmarkOutline} text='Save' />
      <DeleteAction loadingDelete={loadingDelete} userIsCreator={userIsCreator} handleDelete={handleDelete} />
    </HStack>
  );
};

export default PostItemActions;
