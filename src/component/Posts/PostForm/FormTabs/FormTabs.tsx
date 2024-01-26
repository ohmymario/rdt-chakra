import { tabLabel } from '@/hooks/useTabState';
import { Flex } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import FormTab from './FormTab';

interface FormTabsProps {
  activeTab: tabLabel;
  setActiveTab: (tab: tabLabel) => void;
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

const FormTabs = (props: FormTabsProps) => {
  const { activeTab, setActiveTab } = props;

  return (
    <Flex>
      {formTabs.map((tab: tabType, i) => (
        <FormTab tab={tab} key={i} selected={tab.label === activeTab} setActiveTab={setActiveTab} />
      ))}
    </Flex>
  );
};

export default FormTabs;
