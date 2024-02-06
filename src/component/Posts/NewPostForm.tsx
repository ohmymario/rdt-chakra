import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { FunctionComponent, useEffect, useState } from 'react';

//Components
import ImageUpload from './PostForm/ImageUpload/ImageUpload';
import TextInputs from './PostForm/TextInputs/TextInputs';

// Components
import PostFormTitle from './PostForm/PostFormTitle/PostFormTitle';

// Hooks
import { usePostCreation } from '@/hooks/usePostCreation';
import { usePostImageUpload } from '@/hooks/usePostImageUpload';
import { useTabState } from '@/hooks/useTabState';

// Types
import NewPostFormSubmit from './NewPostFormSubmit';
import FormTabs from './PostForm/FormTabs/FormTabs';

interface NewPostFormProps {
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

const newPostContainerStyles: FlexProps = {
  direction: 'column',
  bg: 'white',
  borderRadius: 4,
  w: '100%',
};

const NewPostForm: FunctionComponent<NewPostFormProps> = (props) => {
  const { communityImageURL } = props;

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
  } = usePostCreation(communityImageURL, selectedFile, onUploadImage);

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
      <FormTabs setActiveTab={setActiveTab} activeTab={activeTab} />

      <Flex direction={'column'} gap={3} width='100%' p={4}>
        {/* FORM TITLE */}
        <PostFormTitle textInput={textInput} onTextChange={handleInputChange} />

        {/* FORM INPUT */}
        {renderSelectedTabInput()}
        <NewPostFormSubmit isDisabled={isDisabled} loading={postCreationStatus.loading} createPost={createPost} />
      </Flex>
    </Flex>
  );
};

export default NewPostForm;
