import { Community } from '@/atoms/communitiesAtom';
import { Post } from '@/atoms/postsAtoms';
import { auth, firestore } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePostData';
import { Stack } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostItem from './PostItem';

interface PostsProps {
  communityData: Community;
}

const Posts: FunctionComponent<PostsProps> = (props) => {
  const { communityData } = props;
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePosts();
  const methods = { onVote, onSelectPost, onDeletePost };

  const getPosts = useCallback(async () => {
    try {
      // reference to the posts collection
      const postsCollection = collection(firestore, 'posts');

      // query to get the posts
      const postFilter = where('communityId', '==', communityData.id);
      const postOrder = orderBy('createdAt', 'desc');
      const postQuery = query(postsCollection, postFilter, postOrder);

      // fetch the posts
      const postDocs = await getDocs(postQuery);

      // create array of post objects
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // update the posts state with the array of posts from firestore
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.error(error);
    }
  }, [communityData.id, setPostStateValue]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Stack>
      {postStateValue.posts.map((post) => (
        <PostItem
          post={post}
          key={post.id}
          userIsCreator={user?.uid === post.creatorId}
          userVoteValue={undefined}
          {...methods}
        />
      ))}
    </Stack>
  );
};

export default Posts;
