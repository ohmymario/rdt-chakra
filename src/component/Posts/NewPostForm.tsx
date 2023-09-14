import { Alert, AlertIcon, Flex, Text } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';

//Components
import ImageUpload from './PostForm/ImageUpload/ImageUpload';
import TextInputs from './PostForm/TextInputs/TextInputs';
import TabItem from './TabItem';

//Icons
import { Post } from '@/atoms/postsAtoms';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

import { firestore, storage } from '@/firebase/clientApp';
import { User as FirebaseUser } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import useSelectFile from '@/hooks/useSelectFile';

interface NewPostFormProps {
  user: FirebaseUser;
  communityImageURL?: string;
}

const formTabs: tabType[] = [
  {
    label: 'Post',
    icon: IoDocumentText,
  },
  {
    label: 'Image & Video',
    icon: IoImageOutline,
  },
  {
    label: 'Link',
    icon: BsLink45Deg,
  },
  {
    label: 'Poll',
    icon: BiPoll,
    disabled: true,
  },
  {
    label: 'Talk',
    icon: BsMic,
    disabled: true,
  },
];

export type tabLabels = 'Post' | 'Image & Video' | 'Link' | 'Poll' | 'Talk';
export type tabType = { label: tabLabels; icon: IconType; disabled?: boolean };

interface inputType {
  title: string;
  body: string;
}

const NewPostForm: FunctionComponent<NewPostFormProps> = (props) => {
  const { user, communityImageURL } = props;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<tabLabels>('Post');
  const [textInput, setTextInput] = useState<inputType>({ title: '', body: '' });
  // const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { selectedFile, onSelectFile, errorMessage, resetSelectedFile } = useSelectFile();

  const [loadingStates, setLoadingStates] = useState<Record<tabLabels, boolean>>({
    Post: false,
    'Image & Video': false,
    Link: false,
    Poll: false,
    Talk: false,
  });

  const setLoadingState = (tab: tabLabels, state: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [tab]: state }));
  };

  const resetError = () => setError(false);

  // Submit Post to Firebase
  const handleCreatePost = async () => {
    resetError();
    setLoading(true);

    const { communityId } = router.query;
    const { title, body } = textInput;
    const { uid, email } = user;

    const newPost: Post = {
      communityId: communityId as string,
      communityImageURL: communityImageURL || '',
      creatorId: uid,
      creatorDisplayName: email!.split('@')[0],
      title: title,
      body: body,
      numberOfComments: 0,
      voteStatus: 1,
      createdAt: serverTimestamp() as Timestamp,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url');
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
      router.back();
    } catch (error) {
      console.error('Error adding Post: ', error);
      setError(true);
    }

    setLoading(false);
  };

  // ActiveTab Post
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTextInput((prev) => ({ ...prev, [name]: value }));
  };

  const renderTabSelector = () => {
    if (activeTab === 'Post') {
      return (
        <TextInputs
          textInput={textInput}
          handleCreatePost={handleCreatePost}
          onTextChange={onTextChange}
          loading={loading}
        />
      );
    }

    if (activeTab === 'Image & Video') {
      return (
        <ImageUpload
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
          resetSelectedFile={resetSelectedFile}
          setActiveTab={setActiveTab}
          errorMessage={errorMessage}
        />
      );
    }

    if (activeTab === 'Link') {
      return <Text>Link Tab</Text>;
    }
  };

  return (
    <Flex direction='column' bg='white' borderRadius={4} w='100%'>
      <Flex>
        {formTabs.map((tab: tabType, index) => (
          <TabItem tab={tab} key={index} selected={tab.label === activeTab} setActiveTab={setActiveTab} />
        ))}
      </Flex>
      <Flex p={4}>{renderTabSelector()}</Flex>
      {error && (
        <Alert status='error' display='flex' justifyContent='center'>
          <AlertIcon />
          <Text>Error creating post</Text>
        </Alert>
      )}
    </Flex>
  );
};

export default NewPostForm;
