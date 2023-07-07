import { Community } from '@/atoms/communitiesAtom';
import { Post } from '@/atoms/postsAtoms';
import { auth, firestore } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePostData';
import { Stack, Text } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostItem from './PostItem';
import PostLoader from './PostLoader';

interface PostsProps {
  communityData: Community;
}

const Posts: FunctionComponent<PostsProps> = (props) => {
  const { communityData } = props;
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>('EORRR');

  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePosts();
  const methods = { onVote, onSelectPost, onDeletePost };

  const getPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const postsCollection = collection(firestore, 'posts');
      const postFilter = where('communityId', '==', communityData.id);
      const postOrder = orderBy('createdAt', 'desc');
      const postQuery = query(postsCollection, postFilter, postOrder);
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
    setLoading(false);
  }, [communityData.id, setPostStateValue]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      {loading && (
        <>
          <PostLoader />
          <PostLoader />
          <PostLoader />
          <PostLoader />
        </>
      )}
      {!loading && !error && (
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
      {error && <Text>{error}</Text>}
    </>
  );
};

export default Posts;
