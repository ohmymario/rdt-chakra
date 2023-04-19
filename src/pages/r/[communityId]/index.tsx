import { communitiesState, Community } from '@/atoms/communitiesAtom';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import { FunctionComponent, useEffect } from 'react';
import safeJsonStringify from 'safe-json-stringify';

import CreatePostLink from '@/component/Community/CreatePostLink';
import Header from '@/component/Community/Header';
import NotFound from '@/component/Community/NotFound';
import PageContent from '@/component/Layout/PageContent';
import Posts from '@/component/Posts/Posts';
import { useSetRecoilState } from 'recoil';

interface CommunityPageProps {
  communityData: Community;
}

const CommunityPage: FunctionComponent<CommunityPageProps> = (props) => {
  const { communityData } = props;
  const setCommunityStateValue = useSetRecoilState(communitiesState);

  useEffect(() => {
    if (!communityData) return;

    setCommunityStateValue((prev) => {
      return {
        ...prev,
        currentCommunity: communityData,
      };
    });
  }, [communityData, setCommunityStateValue]);

  if (!communityData) return <NotFound />;

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
