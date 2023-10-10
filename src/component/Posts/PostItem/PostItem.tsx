import { FunctionComponent, useState } from 'react';
import { Post } from '@/atoms/postsAtoms';
import { Flex, FlexProps, StackProps, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

// Utils
import timestampToRelativeString from '@/utils/timestampToRelativeString';

// Icons
import PostItemActions from './PostItemActions';
import PostItemError from './PostItemError';
import PostItemHeader from './PostItemHeader';
import PostItemImage from './PostItemImage';
import PostItemVoting from './PostItemVoting';

interface PostItemProps {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (event: React.MouseEvent<SVGElement, MouseEvent>, post: Post, vote: number, communityId: string) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
}

const PostItem: FunctionComponent<PostItemProps> = (props) => {
  // TODO: FIND A WAY TO DO THIS WITHOUT USING useRouter SEVERAL TIMES
  const router = useRouter();

  const { post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost, homePage } = props;
  const {
    title,
    body,
    createdAt,
    communityId,
    imageURL,
    voteStatus,
    numberOfComments,
    communityImageURL,
    creatorDisplayName,
  } = post;

  const singlePostPage = !onSelectPost;
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // only one delete request at a time
    if (loadingDelete) return;

    setLoadingDelete(true);
    event.stopPropagation();
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error('Failed to delete post');
      }

      if (singlePostPage) {
        router.push(`/r/${communityId}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to delete post');
      }
    }

    setLoadingDelete(false);
  };

  const containerStyles: FlexProps = {
    border: '1px solid',
    bg: 'white',
    borderColor: singlePostPage ? 'white' : 'gray.300',
    borderRadius: singlePostPage ? '4px 4px 0px 0px' : '4px',
    cursor: singlePostPage ? 'unset' : 'pointer',
    _hover: {
      borderColor: singlePostPage ? 'none' : 'gray.500',
    },
  };

  const postContentStyles: StackProps = {
    align: 'flex-start',
    flexDir: 'column',
    flexGrow: 1,
    m: '8px 8px 2px 4px',
    spacing: 2,
  };

  return (
    <Flex {...containerStyles} onClick={() => onSelectPost && onSelectPost(post)}>
      {/* ERROR */}
      {error && <PostItemError error={error} />}
      {/* VOTING COLUMN */}
      <PostItemVoting
        post={post}
        userVoteValue={userVoteValue}
        onVote={onVote}
        communityId={communityId}
        singlePostPage={singlePostPage}
        voteStatus={voteStatus}
      />
      {/* POST TEXT */}
      <VStack {...postContentStyles}>
        {/* POST HEADER */}
        <PostItemHeader
          communityId={communityId}
          communityImageURL={communityImageURL}
          creatorDisplayName={creatorDisplayName}
          title={title}
          body={body}
          homePage={homePage}
          createdAt={createdAt}
          timestampToRelativeString={timestampToRelativeString}
        />

        {/* POST IMAGE */}
        {imageURL && (
          <PostItemImage
            imageURL={imageURL}
            title={title}
            loadingImage={loadingImage}
            setLoadingImage={setLoadingImage}
          />
        )}

        {/* ACTIONS  */}
        <PostItemActions
          numberOfComments={numberOfComments}
          loadingDelete={loadingDelete}
          userIsCreator={userIsCreator}
          handleDelete={handleDelete}
        />
      </VStack>
    </Flex>
  );
};

export default PostItem;
