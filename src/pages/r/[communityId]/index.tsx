import { FunctionComponent } from 'react';
import { Community } from '@/atoms/communitiesAtom';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import safeJsonStringify from 'safe-json-stringify';

import NotFound from '@/component/Community/NotFound';
import Header from '@/component/Community/Header';
import PageContent from '@/component/Layout/PageContent';
import CreatePostLink from '@/component/Community/CreatePostLink';
import Posts from '@/component/Posts/Posts';

interface CommunityPageProps {
  communityData: Community;
}

const CommunityPage: FunctionComponent<CommunityPageProps> = (props) => {
  if (!props.communityData) return <NotFound />;
  const { communityData } = props;
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <>RHS</>
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(firestore, 'communities', context.query.communityId as string);
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
