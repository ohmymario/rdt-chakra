import { authModalState } from '@/atoms/authModalAtom';
import { communitiesState } from '@/atoms/communitiesAtom';
import { Post, postsState, PostVote } from '@/atoms/postsAtoms';
import { auth, firestore, storage } from '@/firebase/clientApp';
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue } from 'recoil';

const usePostsData = () => {
  const router = useRouter();

  const [user] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postsState);
  const currentCommunity = useRecoilValue(communitiesState).currentCommunity;

  const [modalState, setModalState] = useRecoilState(authModalState);

  // VOTING
  const onVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => {
    event.stopPropagation();
    // Bring user to the login if there is no user
    if (!user) {
      setModalState((prev) => ({
        view: 'login',
        isOpen: true,
      }));
      return;
    }

    // 1. Whether or not its a down vote or up vote
    // 2. Check if user has already voted
    // 3. If user has already voted then check if its a down vote or up vote

    try {
      // Retrieve the current vote status of the post.
      // Check if the logged-in user has already voted on the post in the community.
      // Create a batch to group multiple Firestore operations together.
      // Make a copy of the post, global state of posts, and the post votes.
      // Determine the change in vote value.
      const { voteStatus } = post;
      const existingVote = postStateValue.postVotes.find((vote) => vote.postId === post.id);
      const batch = writeBatch(firestore);
      const updatedPost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      let updatedPostVotes = [...postStateValue.postVotes];
      let voteChange = vote;

      // If the user has not voted on the post yet:
      if (!existingVote) {
        // Create a reference to where the vote will be stored in Firestore under the user's document.
        // Create a new PostVote object to store the user's vote information.
        // Add the new vote to the Firestore batch for the specific user.
        // Update the post's vote status by adding the user's vote (either -1 or 1).
        // Add the new vote object to the list of post votes.
        const postVoteRef = doc(collection(firestore, 'users', `${user?.uid}/postVotes`));
        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId: communityId,
          voteValue: vote,
        };
        batch.set(postVoteRef, newVote);
        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      } else {
        // USER HAS A VOTE ON THIS POST
        // Get existing vote reference in Firestore.
        // Determine if user is removing or changing vote.

        const postVoteRef = doc(firestore, 'users', `${user?.uid}/postVotes/${existingVote?.id}`);
        const removingVote = existingVote.voteValue === vote;

        if (removingVote) {
          // Handle removing vote: update vote status, remove vote from array, delete vote document.
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter((vote) => vote.id !== existingVote.id);
          batch.delete(postVoteRef);
          voteChange *= -1;
        } else {
          // Handle changing vote: update vote status, find vote index, update vote document, set vote change value.
          updatedPost.voteStatus = voteStatus + 2 * vote;
          const voteIdx = postStateValue.postVotes.findIndex((vote) => vote.id === existingVote.id);

          updatedPostVotes[voteIdx] = {
            ...existingVote,
            voteValue: vote,
          };

          batch.update(postVoteRef, { voteValue: vote });
          voteChange = 2 * vote;
        }
      }

      const postIdx = updatedPosts.findIndex((post) => post.id === updatedPost.id);
      updatedPosts[postIdx] = updatedPost;

      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }));

      if (postStateValue.selectedPost) {
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: updatedPost,
        }));
      }

      // Create post document reference in Firestore.
      // Update post's vote status in Firestore batch.
      // Commit Firestore batch to execute operations atomically.
      // Update global state to reflect changes.
      const postRef = doc(firestore, 'posts', post.id!);
      batch.update(postRef, { voteStatus: voteStatus + voteChange });
      await batch.commit();

      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }));
    } catch (error: any) {
      console.log(error);
    }
  };

  // WHEN USER CLICKS ON A POST
  const onSelectPost = (post: Post) => {
    const { id, communityId } = post;
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: post,
    }));
    router.push(`/r/${communityId}/comments/${id}`);
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

  // GET POST VOTES FROM FIRESTORE TO UPDATE GLOBAL STATE
  useEffect(() => {
    if (user && currentCommunity) {
      const getCommunityPostVotes = async (communityId: string) => {
        // Create a reference to the user's post votes in Firestore.
        // Get the user's post votes from Firestore.
        // Create a PostVote object for each post vote.
        // Update the global state of post votes.
        const postVotesRef = query(
          collection(firestore, 'users', `${user?.uid}/postVotes`),
          where('communityId', '==', communityId)
        );

        const postVotesSnapshot = await getDocs(postVotesRef);
        const postVotes = postVotesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PostVote[];

        setPostStateValue((prev) => ({
          ...prev,
          postVotes: postVotes,
        }));
      };
      getCommunityPostVotes(currentCommunity.id);
    }
  }, [user, currentCommunity, setPostStateValue]);

  // RESET POST VOTES WHEN USER LOGS OUT
  useEffect(() => {
    if (!user) {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    }
  }, [user, setPostStateValue]);

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePostsData;
