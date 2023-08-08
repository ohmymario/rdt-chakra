import { Post, PostState, PostVote } from '@/atoms/postsAtoms';
import PersonalHome from '@/component/Community/PersonalHome';
import Premium from '@/component/Community/Premium';
import Recommendations from '@/component/Community/Recommendations/Recommendations';
import PageContent from '@/component/Layout/PageContent';
import PostItem from '@/component/Posts/PostItem';
import PostLoaderSkeleton from '@/component/Posts/PostLoaderSkeleton';
import { auth } from '@/firebase/clientApp';
import UseAuthCommunityPosts from '@/hooks/useAuthCommunityPosts';
import useCommunityData from '@/hooks/useCommunityData';
import usePostsData from '@/hooks/usePostData';
import UseUnAuthCommunityPosts from '@/hooks/useUnauthCommunityPosts';
import useUserPostVotes from '@/hooks/useUserPostVotes';
import { Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, loadingUser] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();
  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePostsData();

  const { authPosts, loading: loadingAuthPosts, error: authError } = UseAuthCommunityPosts();
  const { unAuthPosts, loading: loadingUnAuthPosts, error: unAuthError } = UseUnAuthCommunityPosts();
  const { postVotes, loading: loadingPostVotes, error: postVotesError } = useUserPostVotes(user, postStateValue);

  const methods = { onVote, onSelectPost, onDeletePost };

  const updateStateValue = useCallback(
    <K extends keyof PostState>(key: K, value: PostState[K]) => {
      setPostStateValue((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setPostStateValue]
  );

  // Get Community Posts
  useEffect(() => {
    if (user && !loadingUser) {
      const { snippetsFetched, mySnippets } = communityStateValue;

      if (snippetsFetched && mySnippets.length > 0) {
        if (!loadingAuthPosts && !authError) setLoading(false);
        updateStateValue('posts', authPosts);
      } else if (snippetsFetched && mySnippets.length === 0) {
        if (!loadingUnAuthPosts && !unAuthError) setLoading(false);
        updateStateValue('posts', unAuthPosts);
      }
    }

    if (!user && !loadingUser) {
      if (!loadingUnAuthPosts && !unAuthError) setLoading(false);
      updateStateValue('posts', unAuthPosts);
    }
  }, [
    user,
    loadingUser,
    communityStateValue,
    authPosts,
    loadingAuthPosts,
    authError,
    unAuthPosts,
    loadingUnAuthPosts,
    unAuthError,
    setPostStateValue,
    updateStateValue,
  ]);

  // Get User Post Votes
  useEffect(() => {
    if (user && postStateValue.posts) {
      updateStateValue('postVotes', postVotes);
    }

    return () => {
      updateStateValue('postVotes', []);
    };
  }, [user, postStateValue.posts, postVotes, updateStateValue]);

  return (
    <PageContent>
      <>
        {loading ? (
          <PostLoaderSkeleton count={4} />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                post={post}
                key={post.id}
                userIsCreator={user?.uid === post.creatorId}
                userVoteValue={postStateValue.postVotes.find((vote) => vote.postId === post.id)?.voteValue}
                {...methods}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <Stack spacing={5}>
        <Recommendations />
        <Premium />
        <PersonalHome />
      </Stack>
    </PageContent>
  );
};

export default Home;
