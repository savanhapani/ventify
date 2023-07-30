import { Text, Highlight } from "@chakra-ui/react";
import color from "../styles/colors";

const ConfessionText = (props) => {
  const { confession } = props;
  return <Text fontSize="lg">
     <Highlight
     query={['#CollegeLife', '#SleepyStudent', '#LibraryLurker']}
     styles={{
              px: "3",
              py: "1",
              color: color.primary,
     }}>
     {confession}
     </Highlight>
  </Text>;
};

export default ConfessionText;
