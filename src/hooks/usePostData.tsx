import { Post, postsState, PostVote } from '@/atoms/postsAtoms';
import { auth, firestore, storage } from '@/firebase/clientApp';
import { deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

const usePosts = () => {
  const [user] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postsState);

  // VOTING
  const onVote = async (post: Post, vote: number, communityId: string) => {
    // 1. Whether or not its a down vote or up vote
    // 2. Check if user has already voted
    // 3. If user has already voted then check if its a down vote or up vote
    alert('Voting not implemented yet');

    try {
      const { voteStatus } = post;

      // Check if the logged in user has a vote on the post community
      const existingVote = postStateValue.postVotes.find((vote) => vote.postId === post.id);

      // copy all needed data from the post state
      const batch = writeBatch(firestore);
      const updatedPost = { ...postStateValue.posts };
      const updatedPosts = [...postStateValue.postVotes];
      let voteChange = vote;

      if (!existingVote) {
        // location to store the votes
        const postVoteRef = doc(firestore, 'users', `${user?.uid}/postVotes`);

        // completely new vote object
        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId: communityId,
          voteValue: vote,
        };

        // prime this operation in the batch
        batch.set(postVoteRef, newVote);

        // if its a down vote or up vote
        // total community votes = - 1
        // total community votes = + 1;
      } else {
        if (removingVote) {
          // removing vote
          // add/substract 1 from post.voteStatus
          // delete the postVote document from the user
        } else {
          // Changing their vote
          // add/substract 2 from post.voteStatus
          // update the postVote document from the user
        }
      }

      // Update the post in the batch
    } catch (error: any) {
      console.log(error);
    }
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
