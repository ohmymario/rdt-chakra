import { Post, PostState, PostVote } from '@/atoms/postsAtoms';
import PersonalHome from '@/component/Community/PersonalHome';
import Premium from '@/component/Community/Premium';
import Recommendations from '@/component/Community/Recommendations/Recommendations';
import PageContent from '@/component/Layout/PageContent';
import PostItem from '@/component/Posts/PostItem/PostItem';
import PostsError from '@/component/Posts/PostsError';
import PostLoaderSkeleton from '@/component/Posts/PostSkeletonLoader/PostLoaderSkeleton';
import { auth } from '@/firebase/clientApp';
import useAuthCommunityPosts from '@/hooks/useAuthCommunityPosts';
import useCommunityData from '@/hooks/useCommunityData';
import usePostsData from '@/hooks/usePostData';
import useUnAuthCommunityPosts from '@/hooks/useUnauthCommunityPosts';
import useUserPostVotes from '@/hooks/useUserPostVotes';
import { Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Status {
  loading: boolean;
  error: Error | null;
  isFetching: boolean;
}

const Home: NextPage = () => {
  const [status, setStatus] = useState<Status>({
    loading: true,
    error: null,
    isFetching: false,
  });

  const [user, loadingUser] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();
  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePostsData();

  const { authPostsData } = useAuthCommunityPosts();
  const { unAuthPostsData } = useUnAuthCommunityPosts();
  const { userPostVotes } = useUserPostVotes();

  // Generic Function to Update State Value
  // Accepts Key / Value to update the state
  const updateStateValue = useCallback(
    <K extends keyof PostState>(key: K, value: PostState[K]) => {
      setPostStateValue((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setPostStateValue]
  );

  // Update State with Data
  const processPostData = useCallback(
    (loading: boolean, error: string | null, data: Post[] | PostVote[], key: keyof PostState) => {
      // Early Return
      if (error) {
        setStatus((prev) => ({
          ...prev,
          error: new Error(error),
          isFetching: false,
        }));
        return;
      }

      if (loading) {
        setStatus((prev) => ({
          ...prev,
          isFetching: true,
        }));
        return;
      }

      // Success
      setStatus((prev) => ({
        ...prev,
        loading: false,
        isFetching: false,
      }));

      // Update State with Data
      updateStateValue(key, data);
    },
    [updateStateValue]
  );

  // Get Community Posts
  useEffect(() => {
    if (user && !loadingUser) {
      const { snippetsFetched, mySnippets } = communityStateValue;
      const snippetsFound = snippetsFetched && mySnippets.length > 0;
      const snippetsNotFound = snippetsFetched && mySnippets.length === 0;

      if (snippetsFound) {
        processPostData(loadingAuthPosts, authError, authPosts, 'posts');
      }

      if (snippetsNotFound) {
        processPostData(loadingUnAuthPosts, unAuthError, unAuthPosts, 'posts');
      }
    }

    if (!user && !loadingUser) {
      processPostData(loadingUnAuthPosts, unAuthError, unAuthPosts, 'posts');
    }
  }, [
    user,
    loadingUser,
    communityStateValue,
    loadingAuthPosts,
    authError,
    authPosts,
    loadingUnAuthPosts,
    unAuthError,
    unAuthPosts,
    processPostData,
  ]);

  // // Get User Post Votes
  useEffect(() => {
    if (user && postStateValue.posts) {
      processPostData(loadingPostVotes, postVotesError, postVotes, 'postVotes');
    }

    return () => {
      updateStateValue('postVotes', []);
    };
  }, [user, postStateValue.posts, loadingPostVotes, postVotesError, postVotes, processPostData, updateStateValue]);

  const userVoteValues = useMemo(() => {
    return postStateValue.posts.map(
      (post) => postStateValue.postVotes.find((vote) => vote.postId === post.id)?.voteValue
    );
  }, [postStateValue.posts, postStateValue.postVotes]);

  return (
    <PageContent>
      <>
        {status.loading && <PostLoaderSkeleton count={4} />}
        {status.error && <PostsError error={status.error} />}

        {
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
                  onDeletePost={onDeletePost}
                  onSelectPost={onSelectPost}
                  onVote={onVote}
                  homePage
                />
              );
            })}
          </Stack>
        }
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
