import { FunctionComponent, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';

//Components
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';

//Icons
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

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

const NewPostForm: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<tabLabels>('Post');
  const [textInput, setTextInput] = useState<inputType>({ title: '', body: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Submit Post to Firebase
  const handleCreatePost = async () => {};

  // ActiveTab Post
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTextInput((prev) => ({ ...prev, [name]: value }));
  };

  // ActiveTab Image & Video
  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const files = e.target.files;
    const checkForFile = files && files.length > 0;
    if (checkForFile) {
      reader.readAsDataURL(files[0]);
    }

    reader.onload = () => {
      const base64 = reader.result;
      if (base64 && typeof base64 === 'string') {
        setSelectedFile(base64);
      }
    };

    reader.onerror = (error) => {
      console.log('error', error);
    };
  };

  return (
    <Flex direction='column' bg='white' borderRadius={4} w='100%'>
      <Flex>
        {formTabs.map((tab: tabType, index) => (
          <TabItem tab={tab} key={index} selected={tab.label === activeTab} setActiveTab={setActiveTab} />
        ))}
      </Flex>
      <Flex p={4}>
        {activeTab === 'Post' && (
          <TextInputs
            textInput={textInput}
            handleCreatePost={handleCreatePost}
            onTextChange={onTextChange}
            loading={loading}
          />
        )}

        {activeTab === 'Image & Video' && (
          <ImageUpload
            onSelectImage={onSelectImage}
            selectedFile={selectedFile}
            setActiveTab={setActiveTab}
            setSelectedFile={setSelectedFile}
          />
        )}
        {activeTab === 'Link' && <Text>Link Tab</Text>}
      </Flex>
    </Flex>
  );
};

export default NewPostForm;
