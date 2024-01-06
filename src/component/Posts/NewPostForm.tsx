import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { FunctionComponent, useEffect, useState } from 'react';

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

// Firebase
import { firestore } from '@/firebase/clientApp';
import { User as FirebaseUser } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';

// Router
import { useRouter } from 'next/router';

// Components
import PostFormTitle from './PostForm/PostFormTitle/PostFormTitle';
import NewPostFormError from './NewPostFormError';

// Hooks
import { usePostImageUpload } from '@/hooks/usePostImageUpload';
import { usePostCreation } from '@/hooks/usePostCreation';

// Types
import { tabLabels } from '@/hooks/useTabState';

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
];

export type tabType = { label: tabLabels; icon: IconType; disabled?: boolean };

const newPostContainerStyles: FlexProps = {
  direction: 'column',
  bg: 'white',
  borderRadius: 4,
  w: '100%',
};

export interface inputType {
  title: string;
  body: string;
}

const NewPostForm: FunctionComponent<NewPostFormProps> = (props) => {
  const { user, communityImageURL } = props;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<tabLabels>('Post');
  const [textInput, setTextInput] = useState<inputType>({ title: '', body: '' });
  const [error, setError] = useState<string | null>(null);

  const [loadingStates, setLoadingStates] = useState<Record<tabLabels, boolean>>({
    Post: false,
    'Image & Video': false,
    Link: false,
    Poll: false,
    Talk: false,
  });

  const {
    onUploadImage,
    onSelectFile,
    resetSelectedFile,
    selectedFile,
    loadingState: imageLoadingState,
    errorMessage: imageUploadError,
  } = usePostImageUpload();

  const {
    createPost,
    loadingState: postLoadingState,
    error: postCreationError,
  } = usePostCreation(user, communityImageURL, selectedFile, textInput, onUploadImage);

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

  const renderSelectedTabInput = () => {
    // POST BODY
    if (activeTab === 'Post') {
      return (
        <TextInputs
          textInput={textInput}
          handleCreatePost={createPost}
          onTextChange={onTextChange}
          loading={loadingStates['Post']}
        />
      );
    }

    // IMAGE UPLOAD
    if (activeTab === 'Image & Video') {
      return (
        <ImageUpload
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
          resetSelectedFile={resetSelectedFile}
          setActiveTab={setActiveTab}
          errorMessage={imageUploadError}
          loading={loadingStates['Image & Video']}
        />
      );
    }

    // LINK
    if (activeTab === 'Link') {
      return <Text>Link Tab Coming Soon</Text>;
    }
  };

  useEffect(() => {
    setLoadingStates((prev) => ({ ...prev, 'Image & Video': imageLoadingState }));
  }, [imageLoadingState]);

  useEffect(() => {
    setError(imageUploadError);
  }, [imageUploadError]);

  return (
    <Flex {...newPostContainerStyles}>
      {/* TOP TABS SELECTOR */}
      <Flex>
        {formTabs.map((tab: tabType, i) => (
          <TabItem tab={tab} key={i} selected={tab.label === activeTab} setActiveTab={setActiveTab} />
        ))}
      </Flex>

      <Flex direction={'column'} gap={3} width='100%' p={4}>
        {/* Title Component */}
        <PostFormTitle textInput={textInput} onTextChange={onTextChange} />
        {/* Selected Input */}
        {renderSelectedTabInput()}
      </Flex>
      {/* ERROR */}
      <NewPostFormError error={error} />
    </Flex>
  );
};

export default NewPostForm;
