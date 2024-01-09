import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { FunctionComponent, use, useEffect, useState } from 'react';

//Components
import ImageUpload from './PostForm/ImageUpload/ImageUpload';
import TextInputs from './PostForm/TextInputs/TextInputs';
import TabItem from './TabItem';

//Icons
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

// Firebase
import { User as FirebaseUser } from 'firebase/auth';

// Router
import { useRouter } from 'next/router';

// Components
import NewPostFormError from './NewPostFormError';
import PostFormTitle from './PostForm/PostFormTitle/PostFormTitle';

// Hooks
import { usePostCreation } from '@/hooks/usePostCreation';
import { usePostImageUpload } from '@/hooks/usePostImageUpload';

// Types
import { tabLabel } from '@/hooks/useTabState';

interface NewPostFormProps {
  user: FirebaseUser;
  communityImageURL?: string;
}

interface TabStatus {
  loading: boolean;
  error: string | null;
}

interface StatusState {
  Post: TabStatus;
  'Image & Video': TabStatus;
  Link: TabStatus;
  Poll: TabStatus;
  Talk: TabStatus;
}

export type tabType = { label: tabLabel; icon: IconType; disabled?: boolean };

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
  const [activeTab, setActiveTab] = useState<tabLabel>('Post');
  const [textInput, setTextInput] = useState<inputType>({ title: '', body: '' });

  const [loadingStates, setLoadingStates] = useState<Record<tabLabel, boolean>>({
    Post: false,
    'Image & Video': false,
    Link: false,
    Poll: false,
    Talk: false,
  });
  const [error, setError] = useState<string | null>(null);

  // Status State to replace loadingStates and error
  const [status, setStatus] = useState<StatusState>({
    Post: { loading: false, error: null },
    'Image & Video': { loading: false, error: null },
    Link: { loading: false, error: null },
    Poll: { loading: false, error: null },
    Talk: { loading: false, error: null },
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

  // Generic Text Input Handler
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTextInput((prev) => ({ ...prev, [name]: value }));
  };

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
    setLoadingStates((prev) => ({
      ...prev,
      'Image & Video': imageLoadingState,
      Post: postLoadingState,
    }));
  }, [postLoadingState, imageLoadingState]);

  useEffect(() => {
    if (activeTab === 'Post') {
      setError(postCreationError);
    }

    if (activeTab === 'Image & Video') {
      setError(imageUploadError);
    }

    if (activeTab === 'Link') {
      setError(null);
    }
  }, [postCreationError, imageUploadError]);

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
