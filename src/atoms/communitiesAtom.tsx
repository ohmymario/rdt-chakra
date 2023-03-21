import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

type AccessLevel = 'public' | 'restricted' | 'private';

// COMMUNITIES COLLECTION

// Community - SINGLE COMMUNITY
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

// USER COLLECTION

// Community Snippet - SINGLE SNIPPET
export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

// User Community State - COLLECTION OF SNIPPETS
export interface CommunityState {
  mySnippets: CommunitySnippet[];
}

// Default Atom State
export const communitiesState = atom<CommunityState>({
  key: 'communitiesState',
  default: {
    mySnippets: [],
  },
});
