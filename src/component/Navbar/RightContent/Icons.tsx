import { FunctionComponent } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';
import { FaCommentDots } from 'react-icons/fa';

import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from 'react-icons/io5';

interface IconsProps {}

const iconStyles = {
  bg: 'white',
  color: 'gray.700',
  fontSize: 20,
  boxSize: 8,
  cursor: 'pointer',
  borderRadius: 4,
  _hover: { bg: 'gray.200' },
};

const Icons: FunctionComponent<IconsProps> = (props: IconsProps) => {
  return (
    <Flex>
      <HStack
        mr={1.5}
        spacing={1.5}
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
        <IconButton
          {...iconStyles}
          aria-label='Popular'
          icon={<BsArrowUpRightCircle />}
        />
        <IconButton
          {...iconStyles}
          aria-label='Coin'
          icon={<IoFilterCircleOutline />}
        />
        <IconButton
          {...iconStyles}
          aria-label='Happening Now'
          icon={<FaCommentDots />}
        />
      </HStack>

      <Center
        height='32px'
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
        <Divider orientation='vertical' />
      </Center>

      <HStack
        ml={{
          base: '0',
          md: '1.5',
        }}
        mr={1.5}
        spacing={1.5}
      >
        <IconButton {...iconStyles} aria-label='Chat' icon={<BsChatDots />} />
        <IconButton
          {...iconStyles}
          aria-label='Notifications'
          icon={<IoNotificationsOutline />}
        />
        <IconButton {...iconStyles} aria-label='Create Post' icon={<GrAdd />} />
      </HStack>
    </Flex>
  );
};

export default Icons;
