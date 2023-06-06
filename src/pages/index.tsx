import { communitiesState } from '@/atoms/communitiesAtom';
import { Post } from '@/atoms/postsAtoms';
import PageContent from '@/component/Layout/PageContent';
import PostItem from '@/component/Posts/PostItem';
import PostLoader from '@/component/Posts/PostLoader';
import { auth, firestore } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePostData';
import { Stack } from '@chakra-ui/react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const communityStateValue = useRecoilValue(communitiesState);

  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePosts();
  const methods = { onVote, onSelectPost, onDeletePost };

  const authUserFeed = () => {
    setLoading(true);

    try {
    } catch (error) {}

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
      console.error(error);
    }

    setLoading(false);
  };

  const getUserPostVotes = () => {};

  useEffect(() => {
    if (!user && !loadingUser) {
      publicUserFeed();
    }
  }, [user, loadingUser]);

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
              />
            ))}
          </Stack>
        )}
      </>
      <h1>Recommendations</h1>
    </PageContent>
  );
};

export default Home;
