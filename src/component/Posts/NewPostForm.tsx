import { Flex, Icon } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';

import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';
import TabItem from './TabItem';

interface NewPostFormProps {}

const formTabs = [
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

export type tabType = { label: string; icon: IconType; disabled?: boolean };

const NewPostForm: FunctionComponent<NewPostFormProps> = (props: NewPostFormProps) => {
  const [activeTab, setActiveTab] = useState('Post');

  return (
    <Flex direction='column' bg='white' borderRadius={4} w='100%'>
      <Flex>
        {formTabs.map((tab: tabType, index) => (
          <TabItem tab={tab} key={index} selected={tab.label === activeTab} setActiveTab={setActiveTab} />
        ))}
      </Flex>
    </Flex>
  );
};

export default NewPostForm;
