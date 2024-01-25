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

// Components
import NewPostFormError from './NewPostFormError';
import PostFormTitle from './PostForm/PostFormTitle/PostFormTitle';

// Hooks
import { useTabState } from '@/hooks/useTabState';
import { usePostCreation } from '@/hooks/usePostCreation';
import { usePostImageUpload } from '@/hooks/usePostImageUpload';

// Types
import { tabLabel } from '@/hooks/useTabState';
import NewPostFormSubmit from './NewPostFormSubmit';

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

  const [tabStatus, setTabStatus] = useState<StatusState>({
    Post: { loading: false, error: null },
    'Image & Video': { loading: false, error: null },
    Link: { loading: false, error: null },
    Poll: { loading: false, error: null },
    Talk: { loading: false, error: null },
  });

  const { activeTab, setActiveTab } = useTabState('Post');

  const {
    onUploadImage,
    onSelectFile,
    resetSelectedFile,
    selectedFile,
    status: postImageStatus,
  } = usePostImageUpload();

  const {
    createPost,
    textInput,
    handleInputChange,
    status: postCreationStatus,
  } = usePostCreation(user, communityImageURL, selectedFile, onUploadImage);

  const renderSelectedTabInput = () => {
    // POST BODY
    if (activeTab === 'Post') {
      return (
        <TextInputs
          textInput={textInput}
          handleInputChange={handleInputChange}
          errorMessage={tabStatus['Post'].error}
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
          errorMessage={tabStatus['Image & Video'].error}
          loading={tabStatus['Image & Video'].loading}
        />
      );
    }

    // LINK
    if (activeTab === 'Link') {
      return <Text>Link Tab Coming Soon</Text>;
    }
  };

  const isDisabled = textInput.title === '' || textInput.body === '';

  useEffect(() => {
    setTabStatus((prev) => ({
      ...prev,
      'Image & Video': { loading: postImageStatus.loading, error: postImageStatus.error },
      Post: { loading: postCreationStatus.loading, error: postCreationStatus.error },
    }));
  }, [postImageStatus, postCreationStatus]);

  return (
    <Flex {...newPostContainerStyles}>
      <Flex>
        {formTabs.map((tab: tabType, i) => (
          <TabItem tab={tab} key={i} selected={tab.label === activeTab} setActiveTab={setActiveTab} />
        ))}
      </Flex>

      <Flex direction={'column'} gap={3} width='100%' p={4}>
        <PostFormTitle textInput={textInput} onTextChange={handleInputChange} />
        {renderSelectedTabInput()}
        <NewPostFormSubmit isDisabled={isDisabled} loading={postCreationStatus.loading} createPost={createPost} />
      </Flex>
    </Flex>
  );
};

export default NewPostForm;
