import { Post, PostVote } from '@/atoms/postsAtoms';
import PersonalHome from '@/component/Community/PersonalHome';
import Premium from '@/component/Community/Premium';
import Recommendations from '@/component/Community/Recommendations/Recommendations';
import PageContent from '@/component/Layout/PageContent';
import PostItem from '@/component/Posts/PostItem';
import PostLoaderSkeleton from '@/component/Posts/PostLoaderSkeleton';
import { auth, firestore } from '@/firebase/clientApp';
import UseAuthCommunityPosts from '@/hooks/useAuthCommunityPosts';
import useCommunityData from '@/hooks/useCommunityData';
import usePostsData from '@/hooks/usePostData';
import UseUnAuthCommunityPosts from '@/hooks/useUnauthCommunityPosts';
import { Stack } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, loadingUser] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();
  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePostsData();

  const { authPosts, loading: loadingAuthPosts, error: authError } = UseAuthCommunityPosts();
  const { unAuthPosts, loading: loadingUnAuthPosts, error: unAuthError } = UseUnAuthCommunityPosts();

  const methods = { onVote, onSelectPost, onDeletePost };

  const getUserPostVotes = async () => {
    try {
      const postIDs = postStateValue.posts.map((post) => post.id);

      if (postIDs.length === 0) {
        return;
      }

      const postVotesCollection = collection(firestore, `users/${user?.uid}/postVotes`);
      const postVotesFilter = where('postId', 'in', postIDs);
      const postVotesQuery = query(postVotesCollection, postVotesFilter);

      const postVotesDocs = await getDocs(postVotesQuery);

      const postVotes = postVotesDocs.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setPostStateValue((prev) => {
        return {
          ...prev,
          postVotes: postVotes as PostVote[],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleSetPosts = (posts: Post[]) => {
      setPostStateValue((prev) => {
        return {
          ...prev,
          posts: posts,
        };
      });
    };

    if (user && !loadingUser) {
      const { snippetsFetched, mySnippets } = communityStateValue;

      if (snippetsFetched && mySnippets.length > 0) {
        if (!loadingAuthPosts && !authError) setLoading(false);
        handleSetPosts(authPosts);
      } else if (snippetsFetched && mySnippets.length === 0) {
        if (!loadingUnAuthPosts && !unAuthError) setLoading(false);
        handleSetPosts(unAuthPosts);
      }
    }

    if (!user && !loadingUser) {
      if (!loadingUnAuthPosts && !unAuthError) setLoading(false);
      handleSetPosts(unAuthPosts);
    }
  }, [
    user,
    loadingUser,
    communityStateValue,
    authPosts,
    unAuthPosts,
    setPostStateValue,
    loadingAuthPosts,
    loadingUnAuthPosts,
    authError,
    unAuthError,
  ]);

  // Get user post votes
  useEffect(() => {
    if (user && postStateValue.posts) getUserPostVotes();

    return () => {
      setPostStateValue((prev) => {
        return {
          ...prev,
          postVotes: [],
        };
      });
    };
  }, [user, postStateValue.posts]);

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
