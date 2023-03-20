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

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

// User Community State - users collection
export interface CommunityState {
  mySnippets: CommunitySnippet[];
}

export const communitiesState = atom<CommunityState>({
  key: 'communitiesState',
  default: {
    mySnippets: [],
  },
});
