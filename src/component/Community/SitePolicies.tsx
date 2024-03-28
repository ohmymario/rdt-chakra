import { Divider, Grid, GridItem, Stack, Text } from '@chakra-ui/react';

interface SitePoliciesProps {}

const SitePolicies = (props: SitePoliciesProps) => {
  return (
    <Stack fontSize={'12px'} bg={'white'} padding='12px' border='1px solid' borderColor='gray.300' borderRadius={4}>
      <Grid templateColumns='repeat(2, 1fr)' gap={1}>
        <GridItem w='100%'>User Agreement</GridItem>
        <GridItem w='100%'>Content Policy</GridItem>
        <GridItem w='100%'>Privacy Policy</GridItem>
        <GridItem w='100%'>Moderator Code Of Conduct</GridItem>
      </Grid>

      <Divider />

      <Text>Reddit, Inc. © 2024. All rights reserved.</Text>
    </Stack>
  );
};

export default SitePolicies;
