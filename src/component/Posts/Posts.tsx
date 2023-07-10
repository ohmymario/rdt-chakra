import { Community } from '@/atoms/communitiesAtom';
import { Post } from '@/atoms/postsAtoms';
import { auth, firestore } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePostData';
import { Stack, Text } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostItem from './PostItem';
import PostLoaderSkeleton from './PostLoaderSkeleton';

interface PostsProps {
  communityData: Community;
}

const Posts: FunctionComponent<PostsProps> = (props) => {
  const { communityData } = props;
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>('');

  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePosts();
  const methods = { onVote, onSelectPost, onDeletePost };

  const getPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const posts = await fetchPosts();
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

  const fetchPosts = async () => {
    const postsCollection = collection(firestore, 'posts');
    const postFilter = where('communityId', '==', communityData.id);
    const postOrder = orderBy('createdAt', 'desc');
    const postQuery = query(postsCollection, postFilter, postOrder);
    const postDocs = await getDocs(postQuery);
    return postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

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
