import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

type AccessLevel = 'public' | 'restricted' | 'private';

export interface Community {
  createdAt: Timestamp;
  creatorId: string;
  name: string;
  nsfw: boolean;
  numberOfMembers: number;
  type: AccessLevel;
}
