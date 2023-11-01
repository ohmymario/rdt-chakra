import PostLoader from './PostLoader';

interface PostLoaderSkeletonProps {
  count: number;
}

const PostLoaderSkeleton = (props: PostLoaderSkeletonProps) => {
  const { count } = props;
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <PostLoader key={i} />
      ))}
    </>
  );
};

export default PostLoaderSkeleton;
