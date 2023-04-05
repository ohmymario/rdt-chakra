import { Community } from '@/atoms/communitiesAtom';
import { FunctionComponent, useState } from 'react';

interface PostsProps {
  communityData: Community;
}

const Posts: FunctionComponent<PostsProps> = (props) => {
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      // get post from the firebase collection
    } catch (error: any) {
      console.error(error);
    }
  };

  return <h1>Posts</h1>;
};

export default Posts;
