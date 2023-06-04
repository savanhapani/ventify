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

export default function FilterBar() {
  return (
    <Card
      marginTop="20px"
      marginLeft="20px"
      height="fit-content"
      variant="elevated"
      width="xs"
    >
      <CardBody>
        <FilterTags heading="categories" tags={confessCategories} />
        <FilterTags heading="batches" tags={availableBatches} />

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
              htmlFor="isChecked"
              textTransform="capitalize"
              fontSize="sm"
            >
              Show batch exclusive confessions
            </FormLabel>
            <Switch id="isChecked" colorScheme="purple" />
          </FormControl>
        </Box>
      </CardBody>
    </Card>
  );
}
