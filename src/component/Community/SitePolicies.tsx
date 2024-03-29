import { Divider, Grid, GridItem, Stack, Text } from '@chakra-ui/react';

interface SitePoliciesProps {}

const SitePolicies = (props: SitePoliciesProps) => {
  const policies = ['User Agreement', 'Content Policy', 'Privacy Policy', 'Moderator Code Of Conduct'];

  return (
    <Stack fontSize={'12px'} bg={'white'} padding='12px' border='1px solid' borderColor='gray.300' borderRadius={4}>
      <Grid templateColumns='repeat(2, 1fr)' gap={1}>
        {policies.map((policy) => (
          <GridItem
            key={policy}
            _hover={{
              cursor: 'pointer',
            }}
            w='100%'
          >
            {policy}
          </GridItem>
        ))}
      </Grid>

      <Divider />

      <Text>Reddit, Inc. © 2024. All rights reserved.</Text>
    </Stack>
  );
};

export default SitePolicies;
