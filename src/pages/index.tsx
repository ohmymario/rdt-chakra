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
    (data: { data: Post[] | PostVote[]; loading: boolean; error: string | null }, key: keyof PostState) => {
      // Early Return
      if (data.error) {
        setStatus((prev) => ({
          ...prev,
          error: new Error(data.error as string),
          isFetching: false,
        }));
        return;
      }

      // Loading from hook
      if (data.loading) {
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
      updateStateValue(key, data.data);
    },
    [updateStateValue]
  );

  // Get Community Posts
  useEffect(() => {
    // Early Return
    if (loadingUser) return;

    if (!user) {
      processPostData(unAuthPostsData, 'posts');
      return;
    }

    // Destructure Values and return if no snippets are fetched
    const { snippetsFetched, mySnippets } = communityStateValue;
    if (!snippetsFetched) return;

    // User Found, Check if Communities Joined

    if (mySnippets.length === 0) {
      processPostData(unAuthPostsData, 'posts');
    }

    if (mySnippets.length > 0) {
      processPostData(authPostsData, 'posts');
    }
  }, [user, loadingUser, authPostsData, unAuthPostsData, communityStateValue, processPostData]);

  // // Get User Community Post Votes
  useEffect(() => {
    if (user && postStateValue.posts) {
      processPostData(userPostVotes, 'postVotes');
    }

    return () => {
      updateStateValue('postVotes', []);
    };
  }, [user, postStateValue.posts, userPostVotes, updateStateValue, processPostData]);

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
