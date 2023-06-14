import { Post, PostVote } from '@/atoms/postsAtoms';
import Recommendations from '@/component/Community/Recommendations';
import PageContent from '@/component/Layout/PageContent';
import PostItem from '@/component/Posts/PostItem';
import PostLoader from '@/component/Posts/PostLoader';
import { auth, firestore } from '@/firebase/clientApp';
import useCommunityData from '@/hooks/useCommunityData';
import usePosts from '@/hooks/usePostData';
import { Stack } from '@chakra-ui/react';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const { communityStateValue } = useCommunityData();

  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePosts();
  const methods = { onVote, onSelectPost, onDeletePost };

  const authUserFeed = async () => {
    setLoading(true);

    try {
      if (!communityStateValue.mySnippets.length) {
        publicUserFeed();
        return;
      }

      const userCommunityIDs = communityStateValue.mySnippets.map((snippet) => snippet.communityId);
      const postsCollection = collection(firestore, 'posts');
      const postVotesFilter = where('communityId', 'in', userCommunityIDs);
      const postsQuery = query(postsCollection, postVotesFilter);

      const postDocs = await getDocs(postsQuery);

      const posts = postDocs.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setPostStateValue((prev) => {
        return {
          ...prev,
          posts: posts as Post[],
        };
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const publicUserFeed = async () => {
    setLoading(true);

    try {
      const postsCollection = collection(firestore, 'posts');
      const postVotesSort = orderBy('voteStatus', 'desc');
      const postsLimit = limit(10);
      const postsQuery = query(postsCollection, postVotesSort, postsLimit);

      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setPostStateValue((prev) => {
        return {
          ...prev,
          posts: posts as Post[],
        };
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

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

  // Authenticated user feed
  useEffect(() => {
    if (communityStateValue.snippetsFetched) authUserFeed();
  }, [communityStateValue.snippetsFetched]);

  // Public user feed
  useEffect(() => {
    if (!user && !loadingUser) publicUserFeed();
  }, [user, loadingUser]);

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
          <>
            <PostLoader />
            <PostLoader />
            <PostLoader />
            <PostLoader />
          </>
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
      <>
        <Recommendations />
      </>
    </PageContent>
  );
};

export default Home;
