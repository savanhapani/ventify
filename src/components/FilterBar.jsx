import {
  Card,
  CardBody,
  Button,
  Box,
  Select,
  Heading,
  FormControl,
  FormLabel,
  Switch,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tooltip,
} from "@chakra-ui/react";
import {
  confessCategories,
  availableBatches,
  confessionsSortingOptions,
} from "../assets/data/data";
import FilterTags from "./FilterTags";
import color from "../styles/colors";
import { CloseIcon } from "@chakra-ui/icons";

export default function FilterBar(props) {
  const {
    handleCategorySelection,
    selectedCategories,
    handleBatchSelection,
    selectedBatches,
    toggleShowBatchExclusiveConfessions,
    showBatchExclusiveConfessions,
    clearAllFilters,
  } = props;

  return (
    <Card
      marginTop="5px"
      marginLeft="5px"
      height="fit-content"
      variant="elevated"
      width="xs"
    >
      <CardBody>
        {(selectedCategories.length > 0 || selectedBatches.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            colorScheme="red"
            onClick={clearAllFilters}
            leftIcon={<CloseIcon boxSize="10px" />}
            marginBottom="20px"
          >
            Clear all filters
          </Button>
        )}
        <Accordion defaultIndex={[0]}>
          <AccordionItem>
            <h3>
              <Tooltip
                label={selectedCategories.join(", ")}
                fontSize="sm"
                placement="top"
                textTransform="capitalize"
                backgroundColor="gray.700"
                isDisabled={selectedCategories.length === 0}
              >
                <AccordionButton
                  _expanded={{ bg: color.primary, color: "white" }}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    textTransform="capitalize"
                  >
                    categories
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Tooltip>
            </h3>
            <AccordionPanel pb={4}>
              <FilterTags
                tags={confessCategories}
                selectedTags={selectedCategories}
                handleSelection={handleCategorySelection}
              />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h3>
              <Tooltip
                label={selectedBatches.join(", ")}
                fontSize="sm"
                placement="top"
                textTransform="capitalize"
                backgroundColor="gray.700"
                isDisabled={selectedBatches.length === 0}
              >
                <AccordionButton
                  _expanded={{ bg: color.primary, color: "white" }}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    textTransform="capitalize"
                  >
                    batches
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Tooltip>
            </h3>
            <AccordionPanel pb={4}>
              <FilterTags
                tags={availableBatches}
                selectedTags={selectedBatches}
                handleSelection={handleBatchSelection}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

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
