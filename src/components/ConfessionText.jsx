import { Text, Highlight } from "@chakra-ui/react";
import color from "../styles/colors";

const ConfessionText = (props) => {
  const { confession, hashtags } = props;
  return <Text fontSize="lg">
     <Highlight query={hashtags}
        styles={{color: color.primary}}
      >
        {confession}
      </Highlight>
      </Text>;
};

export default ConfessionText;