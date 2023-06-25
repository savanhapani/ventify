import { Text } from "@chakra-ui/react";

const ConfessionText = (props) => {
  const { confession } = props;
  return <Text fontSize="lg">{confession}</Text>;
};

export default ConfessionText;
