import { Post } from '@/atoms/postsAtoms';
import { QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';

export const toPost = (doc: QueryDocumentSnapshot): Post => {
  const { id } = doc;
  const {
    communityId,
    creatorId,
    creatorDisplayName,
    title,
    body,
    numberOfComments,
    voteStatus,
    imageURL,
    communityImageURL,
    createdAt,
  } = doc.data();

  return {
    id,
    communityId,
    creatorId,
    creatorDisplayName,
    title,
    body,
    numberOfComments,
    voteStatus,
    imageURL,
    communityImageURL,
    createdAt: createdAt as Timestamp,
  };
};

