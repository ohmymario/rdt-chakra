import { Post, PostState, PostVote } from '@/atoms/postsAtoms';
import PersonalHome from '@/component/Community/PersonalHome';
import Premium from '@/component/Community/Premium';
import Recommendations from '@/component/Community/Recommendations/Recommendations';
import PageContent from '@/component/Layout/PageContent';
import PostItem from '@/component/Posts/PostItem';
import PostLoaderSkeleton from '@/component/Posts/PostLoaderSkeleton';
import PostsError from '@/component/Posts/PostsError';
import { auth } from '@/firebase/clientApp';
import UseAuthCommunityPosts from '@/hooks/useAuthCommunityPosts';
import useCommunityData from '@/hooks/useCommunityData';
import usePostsData from '@/hooks/usePostData';
import UseUnAuthCommunityPosts from '@/hooks/useUnauthCommunityPosts';
import useUserPostVotes from '@/hooks/useUserPostVotes';
import { Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { use, useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home: NextPage = () => {
  // Local State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [user, loadingUser] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();
  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePostsData();

  const { authPosts, loading: loadingAuthPosts, error: authError } = UseAuthCommunityPosts();
  const { unAuthPosts, loading: loadingUnAuthPosts, error: unAuthError } = UseUnAuthCommunityPosts();
  const { postVotes, loading: loadingPostVotes, error: postVotesError } = useUserPostVotes();

  const updateStateValue = useCallback(
    <K extends keyof PostState>(key: K, value: PostState[K]) => {
      setPostStateValue((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setPostStateValue]
  );

  const processPostData = useCallback(
    (loading: boolean, error: string | null, data: Post[] | PostVote[], key: keyof PostState) => {
      if (error) {
        setError(new Error(error));
        return;
      }
      if (!loading) setLoading(false);
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
    authPosts,
    loadingUser,
    communityStateValue,
    loadingAuthPosts,
    authError,
    unAuthPosts,
    loadingUnAuthPosts,
    unAuthError,
    updateStateValue,
    processPostData,
  ]);

  // Get User Post Votes
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
        {loading ? (
          <PostLoaderSkeleton count={4} />
        ) : error ? (
          <PostsError error={error} />
        ) : (
          <Stack>
            {postStateValue.posts.map((post, index) => (
              <PostItem
                post={post}
                key={post.id}
                userIsCreator={user?.uid === post.creatorId}
                userVoteValue={userVoteValues[index]}
                onDeletePost={onDeletePost}
                onSelectPost={onSelectPost}
                onVote={onVote}
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
