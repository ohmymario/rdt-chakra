import { Box, Button } from '@chakra-ui/react';

interface RecommendationsViewAllProps {}

const RecommendationsViewAll = (props: RecommendationsViewAllProps) => {
  return (
    <Box p='10px 20px'>
      <Button height='30px' width='100%'>
        View All
      </Button>
    </Box>
  );
};

export default RecommendationsViewAll;
