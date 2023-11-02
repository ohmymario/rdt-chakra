import { Flex, Input, InputProps, Text } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';

//Components
import ImageUpload from './PostForm/ImageUpload/ImageUpload';
import TextInputs from './PostForm/TextInputs/TextInputs';
import TabItem from './TabItem';

//Icons
import { Post } from '@/atoms/postsAtoms';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

import { firestore, storage } from '@/firebase/clientApp';
import useSelectFile from '@/hooks/useSelectFile';
import { User as FirebaseUser } from 'firebase/auth';
import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import NewPostFormError from './NewPostFormError';

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
  // {
  //   label: 'Talk',
  //   icon: BsMic,
  //   disabled: true,
  // },
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
  const [error, setError] = useState<string | null>(null);
  const { selectedFile, onSelectFile, errorMessage, resetSelectedFile } = useSelectFile();

  const [loadingStates, setLoadingStates] = useState<Record<tabLabels, boolean>>({
    Post: false,
    'Image & Video': false,
    Link: false,
    Poll: false,
    Talk: false,
  });

  // Generic Loading State Setter
  const setLoadingState = (tab: tabLabels, state: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [tab]: state }));
  };

  // Generic Text Input Handler
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTextInput((prev) => ({ ...prev, [name]: value }));
  };

  // Generic Error Resetter
  const resetError = () => setError(null);

  const createPostObject = () => {
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

    return newPost;
  };

  const handleUploadImage = async (docRef: DocumentReference<DocumentData>) => {
    setLoadingState('Image & Video', true);

    if (!selectedFile) {
      const errorMessage = 'No file selected';
      setError(errorMessage);
      setLoadingState('Image & Video', false);
      return;
    }

    try {
      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      await uploadString(imageRef, selectedFile, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(docRef, { imageURL: downloadURL });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = `Error uploading image: ${error.message}`;
        setError(errorMessage);
      } else {
        const errorMessage = 'An error occurred while uploading the image.';
        setError(errorMessage);
      }
    } finally {
      setLoadingState('Image & Video', false);
    }
  };

  const handleCreatePost = async () => {
    resetError();
    setLoadingState('Post', true);

    const newPost = createPostObject();

    try {
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);
      if (selectedFile) await handleUploadImage(postDocRef);
      router.back();
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = `Error creating post: ${error.message}`;
        setError(errorMessage);
      } else {
        console.error('Error adding Post: ', error);
      }
    }

    setLoadingState('Post', false);
  };

  const inputStyles: InputProps = {
    fontSize: '10pt',
    borderRadius: 4,
    _placeholder: {
      color: 'gray.500',
    },
    _focus: {
      outline: 'none',
      bg: 'white',
      border: '1px solid',
      borderColor: 'black',
    },
  };

  const renderTabSelector = () => {
    if (activeTab === 'Post') {
      return (
        <TextInputs
          inputStyles={inputStyles}
          textInput={textInput}
          handleCreatePost={handleCreatePost}
          onTextChange={onTextChange}
          loading={loadingStates['Post']}
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
          loading={loadingStates['Image & Video']}
        />
      );
    }

    if (activeTab === 'Link') {
      return <Text>Link Tab Coming Soon</Text>;
    }
  };

  return (
    <Flex direction='column' bg='white' borderRadius={4} w='100%'>
      {/* TOP TABS SELECTOR */}
      <Flex>
        {formTabs.map((tab: tabType, i) => (
          <TabItem tab={tab} key={i} selected={tab.label === activeTab} setActiveTab={setActiveTab} />
        ))}
      </Flex>

      <Flex direction={'column'} gap={3} width='100%' p={4}>
        {/* Title */}
        {/* TODO: KEEP TITLE ON ALL PAGES */}
        <Input
          name='title'
          placeholder='Title'
          value={textInput.title}
          onChange={(e) => onTextChange(e)}
          {...inputStyles}
        />

        {/* Input */}
        {/* TODO: Update name */}
        {renderTabSelector()}
      </Flex>
      {/* ERROR */}
      <NewPostFormError error={error} />
    </Flex>
  );
};

export default NewPostForm;
