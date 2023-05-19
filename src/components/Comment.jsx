import { Flex, Tag, Text } from "@chakra-ui/react";

const Comment = (props) => {
  const { batchYear, comment } = props;
  return (
    <Flex padding="5px 0" alignItems="center">
      <Tag size="sm" variant="subtle" marginTop="5px">
        {batchYear}
      </Tag>
      <Text fontSize="sm" marginLeft="10px" flex="1">
        {comment}
      </Text>
    </Flex>
  );
};

export default Comment;
