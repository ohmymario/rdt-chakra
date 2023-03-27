import { Flex } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import TabItem from './TabItem';

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

interface inputType {
  title: string;
  description: string;
}

export type tabType = { label: string; icon: IconType; disabled?: boolean };

const NewPostForm: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState('Post');
  const [textInput, setTextInput] = useState<inputType>({ title: '', description: '' });
  const [selectedFile, setSelectedFile] = useState<string>();

  // add post to firebase
  const handleCreatePost = async () => {};

  // add image to firebase
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
      <Flex>{/* <TextInputs /> */}</Flex>
    </Flex>
  );
};

export default NewPostForm;
