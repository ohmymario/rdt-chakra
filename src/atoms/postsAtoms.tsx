import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export interface Post {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  communityImageURL?: string;
  createdAt: Timestamp;
}

export interface PostVote {
  id?: string;
  postId: string;
  communityId: string;
  voteValue: number;
}

export interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  postVotes: PostVote[];
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
};

export const postsState = atom<PostState>({
  key: 'postsState',
  default: defaultPostState,
});
