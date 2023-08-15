import { PostVote } from "@/atoms/postsAtoms";
import { QueryDocumentSnapshot } from 'firebase/firestore';

export const toPostVote = (doc: QueryDocumentSnapshot): PostVote => {
  const data = doc.data();
  const { id, postId, communityId, voteValue } = data;

  if (typeof postId !== 'string' || typeof communityId !== 'string' || typeof voteValue !== 'number') {
    throw new Error(`Malformed postVote document: ${JSON.stringify(data)}`);
  }

  return {
    id,
    postId,
    communityId,
    voteValue,
  };
}
