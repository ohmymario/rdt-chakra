import { Flex } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';

import { IconType } from 'react-icons/lib';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { AiFillCloseCircle } from 'react-icons/ai';

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
  const [selectedFile, setSelectedFile] = useState<string>();

  // Submit Post to Firebase
  const handleCreatePost = async () => {};

  // ActiveTab Post
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTextInput((prev) => ({ ...prev, [name]: value }));
  };

  // ActiveTab Image & Video
  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onSelectImage');
  };

  // handle text field input
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {};

  return (
    <Flex direction='column' bg='white' borderRadius={4} w='100%'>
      <Flex>
        {formTabs.map((tab: tabType, index) => (
          <TabItem tab={tab} key={index} selected={tab.label === activeTab} setActiveTab={setActiveTab} />
        ))}
      </Flex>
      <Flex p={4}>
        <TextInputs />
      </Flex>
    </Flex>
  );
};

export default NewPostForm;
