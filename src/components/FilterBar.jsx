import {
  Card,
  CardBody,
  Box,
  Select,
  Heading,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import {
  confessCategories,
  availableBatches,
  confessionsSortingOptions,
} from "../assets/data/data";
import FilterTags from "./FilterTags";
import color from "../styles/colors";

export default function FilterBar(props) {
  const {
    handleCategorySelection,
    selectedCategories,
    handleBatchSelection,
    selectedBatches,
    toggleShowBatchExclusiveConfessions,
    showBatchExclusiveConfessions,
  } = props;

  return (
    <Card
      marginTop="20px"
      marginLeft="20px"
      height="fit-content"
      variant="elevated"
      width="xs"
    >
      <CardBody>
        <FilterTags
          heading="categories"
          tags={confessCategories}
          selectedTags={selectedCategories}
          handleSelection={handleCategorySelection}
        />
        <FilterTags
          heading="batches"
          tags={availableBatches}
          selectedTags={selectedBatches}
          handleSelection={handleBatchSelection}
        />

        <Box marginTop="15px">
          <Heading as="h3" textTransform="capitalize" fontSize="md">
            sort by
          </Heading>
          <Select
            placeholder="Select Here"
            focusBorderColor={color.primary}
            variant="filled"
            textTransform="capitalize"
            marginTop="15px"
            size="md"
          >
            {confessionsSortingOptions.map((item) => (
              <option value={item.title} key={item.id}>
                {item.title}
              </option>
            ))}
          </Select>
        </Box>

        <Box marginTop="20px">
          <FormControl
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormLabel
              htmlFor="showBatchExclusiveConfessions"
              textTransform="capitalize"
              fontSize="sm"
            >
              Show batch exclusive confessions
            </FormLabel>
            <Switch
              id="showBatchExclusiveConfessions"
              colorScheme="purple"
              onChange={toggleShowBatchExclusiveConfessions}
              isChecked={showBatchExclusiveConfessions}
            />
          </FormControl>
        </Box>
      </CardBody>
    </Card>
  );
}
