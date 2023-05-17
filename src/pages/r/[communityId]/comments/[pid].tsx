import { Post } from '@/atoms/postsAtoms';
import About from '@/component/Community/About';
import PageContent from '@/component/Layout/PageContent';
import Comments from '@/component/Posts/Comments/Comments';
import PostItem from '@/component/Posts/PostItem';
import { auth, firestore } from '@/firebase/clientApp';
import useCommunityData from '@/hooks/useCommunityData';
import usePosts from '@/hooks/usePostData';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FunctionComponent, useCallback, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface PostPageProps {}

const PostPage: FunctionComponent<PostPageProps> = (props) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePosts();
  const postMethods = { setPostStateValue, onDeletePost, onVote };
  const { communityStateValue } = useCommunityData();

  const { selectedPost } = postStateValue;
  const { pid } = router.query;
  const fetchPost = useCallback(
    async (postId: string) => {
      try {
        const postDocRef = doc(firestore, 'posts', postId);
        const postSnap = await getDoc(postDocRef);
        setPostStateValue((prevState) => ({
          ...prevState,
          selectedPost: { ...postSnap.data(), id: postSnap.id } as Post,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    [setPostStateValue]
  );

  useEffect(() => {
    if (!selectedPost && pid) {
      fetchPost(pid as string);
    }
  }, [selectedPost, pid, fetchPost]);

  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            {...postMethods}
            userVoteValue={
              postStateValue.postVotes.find((vote) => vote.postId === postStateValue.selectedPost?.id)?.voteValue
            }
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
          />
        )}
        <Comments />
      </>

      <>{communityStateValue.currentCommunity && <About communityData={communityStateValue.currentCommunity} />}</>
    </PageContent>
  );
};

export default PostPage;
