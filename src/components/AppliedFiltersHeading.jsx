import { Heading, Text } from "@chakra-ui/react";
import color from "../styles/colors";

const AppliedFiltersHeading = (props) => {
  const { selectedCategories, selectedBatches } = props;

  if (selectedCategories.length === 0 && selectedBatches.length === 0) {
    return;
  }

  return (
    <Heading
      fontSize="21px"
      paddingTop="15px"
      paddingBottom="30px"
      fontWeight="400"
      textAlign="center"
      marginRight="50px"
      as="h2"
    >
      We are displaying confessions
      {selectedCategories.length > 0 && " categorized under "}
      <Text
        as="span"
        color={color.primary}
        fontWeight="600"
        textTransform="capitalize"
      >
        {selectedCategories.join(", ")}
      </Text>
      {selectedBatches.length > 0 && " from the batches "}
      <Text
        as="span"
        color={color.primary}
        fontWeight="600"
        textTransform="capitalize"
      >
        {[...selectedBatches].sort((a, b) => a - b).join(", ")}
      </Text>
    </Heading>
  );
};

export default AppliedFiltersHeading;
