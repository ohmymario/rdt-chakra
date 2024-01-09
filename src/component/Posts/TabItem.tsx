import { tabLabel } from '@/hooks/useTabState';
import { Flex, Icon } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { tabType } from './NewPostForm';

interface TabItemProps {
  tab: tabType;
  selected: boolean;
  setActiveTab: (tab: tabLabel) => void;
}

const TabItem: FunctionComponent<TabItemProps> = (props) => {
  const {
    tab: { label, icon, disabled },
    selected,
    setActiveTab,
  } = props;

  const handleSelection = () => {
    if (disabled) return;
    setActiveTab(label);
  };

  const flexStyles = {
    justify: 'center',
    alignItems: 'center',
    height: '51px',
    fontSize: '10pt',
    fontWeight: '700',
    flexGrow: 1,
    color: selected ? 'blue.500' : disabled ? 'gray.200' : 'gray.400',
    borderBottom: selected ? '2px solid' : '1px solid',
    borderColor: selected ? 'blue.500' : 'gray.200',
    cursor: disabled ? 'not-allowed' : 'pointer',
    _hover: {
      bg: disabled ? 'unset' : 'gray.100',
    },
    _notLast: {
      borderRight: '1px solid',
      borderRightColor: 'gray.200',
    },
  };

  return (
    <Flex {...flexStyles} onClick={() => handleSelection()}>
      <Flex mr={2}>
        <Icon as={icon} boxSize={6} />
      </Flex>
      <Flex>{label}</Flex>
    </Flex>
  );
};

export default TabItem;
