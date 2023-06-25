import {
  InputGroup,
  InputLeftAddon,
  Text,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { CHOICE_CHAR_LIMIT } from "../assets/data/data";
import color from "../styles/colors";

const Choice = (props) => {
  const { value, choiceNumber, handlePollChoices } = props;
  return (
    <InputGroup marginTop="10px">
      <InputLeftAddon>
        <Text as="span" textTransform="capitalize" fontSize="sm">
          choice {choiceNumber + 1}
        </Text>
      </InputLeftAddon>
      <Input
        variant="outline"
        placeholder="Add your choice"
        size="md"
        maxLength={CHOICE_CHAR_LIMIT}
        focusBorderColor={color.primary}
        value={value}
        onChange={(e) => handlePollChoices(choiceNumber, e.target.value)}
      />
      {value && (
        <InputRightElement>
          <Text fontSize="xs" as="span" color="blackAlpha.700">
            {value.length}/{CHOICE_CHAR_LIMIT}
          </Text>
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default Choice;
