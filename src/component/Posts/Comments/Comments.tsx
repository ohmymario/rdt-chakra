import { Post, postsState } from '@/atoms/postsAtoms';
import { firestore } from '@/firebase/clientApp';
import { Box, Flex, FlexProps, SkeletonCircle, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { collection, doc, increment, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import CommentInput from './CommentInput';
import CommentItem, { Comment } from './CommentItem';
import CommentsEmpty from './CommentsEmpty';
import CommentsSkeleton from './CommentsSkeleton';

interface CommentsProps {
  user: User;
  selectedPost: Post;
  communityId: string;
}

const Comments = (props: CommentsProps) => {
  const { user, selectedPost, communityId } = props;

  const [commentText, setCommentText] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);

  const setPostState = useSetRecoilState(postsState);

  const onCreateComment = async () => {
    setCreateLoading(true);

    try {
      // create a comment document in firestore
      const batch = writeBatch(firestore);
      const firestoreCollection = collection(firestore, 'comments');
      const commentDocRef = doc(firestoreCollection);

      // All data needed for newComment
      const { id } = commentDocRef;
      const { uid, email } = user;
      const { id: postId, title: postTitle } = selectedPost;
      const creatorDisplayText = email!.split('@')[0];

      const newComment: Comment = {
        id,
        creatorId: uid,
        creatorDisplayText,
        communityId: communityId,
        postId: postId!,
        postTitle,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      // update post numberOfComments field by +1
      const postDocRef = doc(firestore, 'posts', postId!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      setCommentText('');
      setComments((prevComments) => [...prevComments, newComment]);
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));

      // update global state to reflect changes
    } catch (error) {
      console.log('Error creating comment: ', error);
    }
    setCreateLoading(false);
  };

  const onDeleteComment = async (comment: any) => {
    console.log(`🚀 ~ onDeleteComment ~ Deleting a Comment:`, onDeleteComment);

    // delete comment document in firestore
    // update post numberOfComments field by -1
    // update global state to reflect changes
  };

  const getPostComments = async () => {
    console.log('get post comments');
  };

  useEffect(() => {
    getPostComments();
  }, []);

  const BoxWrapperStyles = {
    bg: 'white',
    borderRadius: '0px 0px 4px 4px',
    p: 2,
  };

  const FlexWrapperStyles: FlexProps = {
    direction: 'column',
    pl: 10,
    pr: 4,
    mb: 6,
    fontSize: '10pt',
    width: '100%',
  };

  return (
    <Box {...BoxWrapperStyles}>
      {/* Input */}
      <Flex {...FlexWrapperStyles}>
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          user={user}
          createLoading={createLoading}
          onCreateComment={onCreateComment}
        />
      </Flex>
      {/* Comments Container */}
      <Stack spacing={6} p={2}>
        {fetchLoading ? (
          <CommentsSkeleton numberOfComments={3} />
        ) : (
          <>
            {comments.length === 0 ? (
              <CommentsEmpty />
            ) : (
              <>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    loadingDelete={false}
                    userId={user.uid}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Comments;
