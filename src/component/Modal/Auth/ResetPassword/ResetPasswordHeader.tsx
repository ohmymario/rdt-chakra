import { Heading, Icon, Text } from '@chakra-ui/react';
import { BsReddit } from 'react-icons/bs';

const ResetPasswordHeader = () => {
  return (
    <>
      <Icon alignSelf='center' as={BsReddit} color='brand.100' fontSize={40} />
      <Heading size='md'>Reset your password</Heading>
      <Text fontSize='sm'>Enter the email associated with your account and we&apos;ll send you a reset link.</Text>
    </>
  );
};

export default ResetPasswordHeader;
