import { Flex, HStack } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

// expects 2 children
interface PageContentProps {
  children: [React.ReactNode, React.ReactNode];
}

const PageContent: FunctionComponent<PageContentProps> = (props) => {
  const { children } = props;
  return (
    <Flex justify='center' p='1rem 0'>
      <Flex justify='center' maxW='976px' width='95%' align='flex-start' gap={'1.5rem'}>
        {/* LHS */}
        <Flex direction='column' flex='1'>
          {children[0]}
        </Flex>
        {/* RHS */}
        <Flex
          display={{
            base: 'none',
            lg: 'flex',
          }}
          flex={{ base: '0 0 312px' }}
        >
          {children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContent;
