import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FunctionComponent, useCallback, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import { auth, firestore } from '@/firebase/clientApp';

// Hooks
import usePostsData from '@/hooks/usePostData';
import useCommunityData from '@/hooks/useCommunityData';

// Atoms
import { Post } from '@/atoms/postsAtoms';

// Components
import PageContent from '@/component/Layout/PageContent';
import About from '@/component/Community/About/About';
import PostItem from '@/component/Posts/PostItem';
import Comments from '@/component/Posts/Comments/Comments';
interface PostPageProps {}

const PostPage: FunctionComponent<PostPageProps> = (props) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePostsData();
  const postMethods = { setPostStateValue, onDeletePost, onVote };
  const { communityStateValue } = useCommunityData();

  const { selectedPost } = postStateValue;
  const { pid } = router.query;

  const { currentCommunity } = communityStateValue;

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
      {selectedPost && (
        <>
          <PostItem
            post={selectedPost}
            {...postMethods}
            userVoteValue={postStateValue.postVotes.find((vote) => vote.postId === selectedPost?.id)?.voteValue}
            userIsCreator={user?.uid === selectedPost?.creatorId}
          />
          <Comments user={user as User} selectedPost={selectedPost} communityId={selectedPost?.communityId as string} />
        </>
      )}

      {currentCommunity && <About communityData={currentCommunity} />}
    </PageContent>
  );
};

export default PostPage;
