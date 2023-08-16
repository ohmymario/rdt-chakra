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

  if (
    typeof communityId !== 'string' ||
    typeof creatorId !== 'string' ||
    typeof creatorDisplayName !== 'string' ||
    typeof title !== 'string' ||
    typeof body !== 'string' ||
    typeof numberOfComments !== 'number' ||
    typeof voteStatus !== 'number' ||
    (imageURL && typeof imageURL !== 'string') ||
    (communityImageURL && typeof communityImageURL !== 'string') ||
    !(createdAt instanceof Timestamp)
  ) {
    throw new Error(`Malformed Post document: ${JSON.stringify(doc.data())}`);
  }

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

