import { Flex, Tag, Text } from "@chakra-ui/react";
import color from "../styles/colors";

const Comment = (props) => {
  const { batchYear, comment } = props;
  return (
    <Flex padding="5px 0">
      <Tag size="sm" variant="subtle" marginTop="5px">
        {batchYear}
      </Tag>
      <Text fontSize="sm" marginLeft="10px">
        {comment}
      </Text>
    </Flex>
  );
};

export default Comment;
