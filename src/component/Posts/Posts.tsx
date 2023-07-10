import { Community } from '@/atoms/communitiesAtom';
import { auth } from '@/firebase/clientApp';
import usePostsData from '@/hooks/usePostData';
import usePostLoader from '@/hooks/usePostLoader';
import { Stack, Text } from '@chakra-ui/react';
import { FunctionComponent, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostItem from './PostItem';
import PostLoaderSkeleton from './PostLoaderSkeleton';

interface PostsProps {
  communityData: Community;
}

const Posts: FunctionComponent<PostsProps> = (props) => {
  const { communityData } = props;
  const [user] = useAuthState(auth);

  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePostsData();
  const { loading, error, posts } = usePostLoader(communityData.id);

  const methods = { onVote, onSelectPost, onDeletePost };

  useEffect(() => {
    setPostStateValue((prev) => ({
      ...prev,
      posts,
    }));
  }, [posts, setPostStateValue]);

  return (
    <>
      {loading && <PostLoaderSkeleton count={4} />}
      {!loading && !error && (
        <Stack>
          {postStateValue.posts.map((post) => {
            const userIsCreator = user?.uid === post.creatorId;
            const userVoteValue = postStateValue.postVotes.find((vote) => vote.postId === post.id)?.voteValue;

            return (
              <PostItem
                post={post}
                key={post.id}
                userIsCreator={userIsCreator}
                userVoteValue={userVoteValue}
                {...methods}
              />
            );
          })}
        </Stack>
      )}
      {error && <Text>{error}</Text>}
    </>
  );
};

export default Posts;
