import PageContent from '@/component/Layout/PageContent';
import PostItem from '@/component/Posts/PostItem';
import { auth } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePostData';
import { FunctionComponent } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface PostPageProps {}

const PostPage: FunctionComponent<PostPageProps> = (props) => {
  const [user] = useAuthState(auth);
  const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePosts();
  const postMethods = { setPostStateValue, onDeletePost, onVote };

  return (
    <PageContent>
      <>
        {/* Selected Post */}

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
        {/* Comments */}
      </>

      <>{/* About */}</>
    </PageContent>
  );
};

export default PostPage;
