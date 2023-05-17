import { Post } from '@/atoms/postsAtoms';
import { User } from 'firebase/auth';
import { useEffect } from 'react';

interface CommentsProps {
  user: User;
  selectedPost: Post;
  communityId: string;
}

const Comments = (props: CommentsProps) => {
  const { user, selectedPost, communityId } = props;

  const onCreateComment = async () => {
    console.log('create comment');
  };

  const onDeleteComment = async () => {
    console.log('delete comment');
  };

  const getPostComments = async () => {
    console.log('get post comments');
  };

  useEffect(() => {
    getPostComments();
  }, []);

  return <div>Commentsss</div>;
};

export default Comments;
