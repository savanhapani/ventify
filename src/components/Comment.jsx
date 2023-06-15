import { Flex, Tag, Text, Box } from "@chakra-ui/react";
import moment from "moment";

const Comment = (props) => {
  const { batchYear, comment, timeStamp, loggedInBatchYear } = props;
  return (
    <Box marginTop="5px" padding="5px 0">
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Tag
          size="md"
          variant={loggedInBatchYear == batchYear ? "subtle" : "outline"}
          colorScheme="purple"
        >
          {batchYear}
        </Tag>

        <Text fontSize="md" flex="1" marginLeft="10px">
          {comment}
        </Text>
      </Flex>
      <Text
        fontSize="xs"
        textAlign="end"
        marginTop="5px"
        color="blackAlpha.700"
      >
        {moment(timeStamp?.toDate()).fromNow()}
      </Text>
    </Box>
  );
};

export default Comment;
