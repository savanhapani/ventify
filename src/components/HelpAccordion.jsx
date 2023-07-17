import {
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  List,
  ListIcon,
  Button,
  Text,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import color from "../styles/colors";

const HelpAccordion = (props) => {
  const { category, questions, setCurrentDocCategory, index } = props;
  return (
    <AccordionItem>
      <h3>
        <AccordionButton _expanded={{ bg: color.primary, color: "white" }}>
          <Box as="span" flex="1" textAlign="left" textTransform="capitalize">
            {category}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h3>
      <AccordionPanel pb={4}>
        <List
          spacing={4}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          {questions.map((question) => (
            <Button
              variant="link"
              key={question.id}
              onClick={() => setCurrentDocCategory(index)}
            >
              <ListIcon as={InfoOutlineIcon} color={color.primary} />
              <Text as="span" color="gray.600" fontWeight="normal">
                {question.title}
              </Text>
            </Button>
          ))}
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default HelpAccordion;
