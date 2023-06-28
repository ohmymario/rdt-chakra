import { Heading, HeadingProps, HStack, Icon, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import { FaEye, FaLock, FaUserCircle } from 'react-icons/fa';
import { AccessLevel } from './CreateCommunityModal';

interface CreateCommunityModalTypesProps {
  communityType: AccessLevel;
  handleCommunityType: (e: string) => void;
}

interface RadioValues {
  [key: string]: string;
}

const headerStyles: HeadingProps = {
  as: 'h4',
  size: 'sm',
  mb: 2,
  fontWeight: '500',
};

const radioValues: RadioValues = {
  public: 'Anyone can view, post, and comment to this community',
  restricted: 'Anyone can view this community, but only approved users can post',
  private: 'Only approved users can view and submit to this community',
};

const CreateCommunityModalTypes = (props: CreateCommunityModalTypesProps) => {
  const { handleCommunityType, communityType } = props;
  return (
    <VStack width={'100%'} align='flex-start'>
      <Heading {...headerStyles}>Community Type</Heading>
      <RadioGroup onChange={(e) => handleCommunityType(e)} value={communityType}>
        {/* RADIO SELECTION */}
        {Object.keys(radioValues).map((key, i) => (
          <Radio size='md' mb={4} value={key} key={i}>
            <HStack>
              <Icon
                as={key === 'public' ? FaUserCircle : key === 'restricted' ? FaEye : FaLock}
                color='gray.500'
                top='-1px'
                position='relative'
              />

              <Text fontSize='10pt' fontWeight='600'>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>

              <Text fontSize='8pt' color='gray.500'>
                {radioValues[key]}
              </Text>
            </HStack>
          </Radio>
        ))}
      </RadioGroup>
    </VStack>
  );
};

export default CreateCommunityModalTypes;
