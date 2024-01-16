import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { FunctionComponent, useEffect, useState } from 'react';

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

const NewPostForm: FunctionComponent<NewPostFormProps> = (props) => {
  const { user, communityImageURL } = props;
  const [activeTab, setActiveTab] = useState<tabLabel>('Post');

  const [tabStatus, setTabStatus] = useState<StatusState>({
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
    textInput,
    setTextInput,
    loadingState: postLoadingState,
    error: postCreationError,
  } = usePostCreation(user, communityImageURL, selectedFile, onUploadImage);

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
          createPost={createPost}
          onTextChange={onTextChange}
          loading={tabStatus['Post'].loading}
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
          loading={tabStatus['Image & Video'].loading}
        />
      );
    }

    // LINK
    if (activeTab === 'Link') {
      return <Text>Link Tab Coming Soon</Text>;
    }
  };

  useEffect(() => {
    setTabStatus((prev) => ({
      ...prev,
      'Image & Video': { loading: imageLoadingState, error: imageUploadError },
      Post: { loading: postLoadingState, error: postCreationError },
    }));
  }, [postLoadingState, imageLoadingState, postCreationError, imageUploadError]);

  return (
    <Flex {...newPostContainerStyles}>
      {/* TOP TABS SELECTOR */}
      <Flex>
        {formTabs.map((tab: tabType, i) => (
          <TabItem tab={tab} key={i} selected={tab.label === activeTab} setActiveTab={setActiveTab} />
        ))}
      </Flex>

      <Flex direction={'column'} gap={3} width='100%' p={4}>
        <PostFormTitle textInput={textInput} onTextChange={onTextChange} />
        {renderSelectedTabInput()}
      </Flex>

      {/* ERROR */}
      <NewPostFormError error={tabStatus[activeTab].error} />
    </Flex>
  );
};

export default NewPostForm;
