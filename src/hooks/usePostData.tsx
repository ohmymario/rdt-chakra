import { Post, postsState } from '@/atoms/postsAtoms';
import { firestore, storage } from '@/firebase/clientApp';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postsState);

  // VOTING
  const onVote = async () => {
    alert('Voting not implemented yet');
  };

  // WHEN USER CLICKS ON A POST
  const onSelectPost = () => {
    alert('Selecting a post not implemented yet');
  };

  // WHEN USER DELETES THEIR POST
  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      // Check for Image
      if (post.imageURL) {
        // Find the Image in Storage
        const imageRef = ref(storage, `posts/${post.id}/image`);
        // Delete the Image
        await deleteObject(imageRef);
      }
      // Find The Post in Firestore
      // Delete The Post
      const postRef = doc(firestore, 'posts', post.id!);
      await deleteDoc(postRef);
      // Update Recoil Dtate
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((oldPost) => oldPost.id !== post.id),
      }));
      return true;
    } catch (error: any) {
      console.log(error);
      return false;
    }
  };

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
