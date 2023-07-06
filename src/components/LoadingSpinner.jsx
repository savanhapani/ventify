import { Flex, Spinner, Text } from "@chakra-ui/react";
import color from "../styles/colors";

const LoadindSpinner = (props) => {
  const { text } = props;
  return (
    <Flex alignItems="center">
      <Spinner
        thickness="3px"
        speed="0.65s"
        emptyColor="gray.200"
        color={color.primary}
        size="lg"
      />
      <Text fontSize="md" marginLeft="10px">
        {text}
      </Text>
    </Flex>
  );
};

export default LoadindSpinner;
