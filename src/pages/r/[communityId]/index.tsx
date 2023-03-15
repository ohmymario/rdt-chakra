import { Community } from '@/atoms/communitiesAtom';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import { FunctionComponent } from 'react';
import safeJsonStringify from 'safe-json-stringify';

interface CommunityPageProps {
  communityData: Community;
}

const CommunityPage: FunctionComponent<CommunityPageProps> = (props) => {
  if (!props.communityData) return <div>Community doesn&apos;t exist</div>;
  const { communityData } = props;
  return <div>CommunityPage {JSON.stringify(communityData)}</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      'communities',
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    // Not Found
    const nullData = { props: { communityData: null } };
    if (!communityDoc.exists()) return nullData;

    // Found
    const dataObj = { id: communityDoc.id, ...communityDoc.data() };
    const communityData = JSON.parse(safeJsonStringify(dataObj));
    const data = { props: { communityData } };

    return data;
  } catch (error) {
    // error page
    console.error(error);
  }
}

export default CommunityPage;
