import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

type AccessLevel = 'public' | 'restricted' | 'private';

// Community - communities collection
export interface Community {
  createdAt: Timestamp;
  creatorId: string;
  name: string;
  nsfw: boolean;
  numberOfMembers: number;
  type: AccessLevel;
  imageURL?: string;
  id: string;
}

// User Community State - users collection
interface CommunityState {
  mySnippets: {
    communityId: string;
    isModerator?: boolean;
    imageURL?: string;
  }[];
}

export const communitiesState = atom<CommunityState>({
  key: 'communitiesState',
  default: {
    mySnippets: [],
  },
});
