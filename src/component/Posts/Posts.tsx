import { Community } from '@/atoms/communitiesAtom';
import { auth } from '@/firebase/clientApp';
import usePostsData from '@/hooks/usePostData';
import usePostLoader from '@/hooks/usePostLoader';
import { Stack, Text } from '@chakra-ui/react';
import { FunctionComponent, useEffect, useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostItem from './PostItem/PostItem';
import PostLoaderSkeleton from './PostLoaderSkeleton';

interface PostsProps {
  communityData: Community;
}

const Posts: FunctionComponent<PostsProps> = (props) => {
  const { communityData } = props;
  const [user] = useAuthState(auth);
  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePostsData();
  const { loading, error, posts } = usePostLoader(communityData.id);

  useEffect(() => {
    setPostStateValue((prev) => ({
      ...prev,
      posts,
    }));
  }, [posts, setPostStateValue]);

  const userVoteValues = useMemo(() => {
    return postStateValue.posts.map(
      (post) => postStateValue.postVotes.find((vote) => vote.postId === post.id)?.voteValue
    );
  }, [postStateValue.posts, postStateValue.postVotes]);

  return (
    <>
      {loading && <PostLoaderSkeleton count={4} />}
      {!loading && !error && (
        <Stack>
          {postStateValue.posts.map((post, index) => {
            const userIsCreator = user?.uid === post.creatorId;
            const userVoteValue = userVoteValues[index];

            return (
              <PostItem
                post={post}
                key={post.id}
                userIsCreator={userIsCreator}
                userVoteValue={userVoteValue}
                onVote={onVote}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
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
