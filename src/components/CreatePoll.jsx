import {
  FormControl,
  Input,
  FormHelperText,
  Box,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import {
  availablePollDurations,
  POLL_QUESTION_CHAR_LIMIT,
} from "../assets/data/data";
import Choice from "./Choice";
import color from "../styles/colors";

const CreatePoll = (props) => {
  const {
    initialRef,
    pollQuestion,
    setPollQuestion,
    pollDuration,
    setPollDuration,
    pollChoices,
    handlePollChoices,
  } = props;

  return (
    <>
      <FormControl>
        <Input
          variant="flushed"
          placeholder="Ask a question..."
          size="md"
          focusBorderColor={color.primary}
          maxLength={POLL_QUESTION_CHAR_LIMIT}
          ref={initialRef}
          onChange={(e) => setPollQuestion(e.target.value)}
          value={pollQuestion}
        />
        <FormHelperText>
          {pollQuestion.length}/{POLL_QUESTION_CHAR_LIMIT}
        </FormHelperText>
      </FormControl>

      <Box marginTop="20px">
        {pollChoices.map((item, index) => (
          <Choice
            key={index}
            choiceNumber={index}
            value={item}
            handlePollChoices={handlePollChoices}
          />
        ))}
      </Box>

      <FormControl marginTop="20px" width="50%">
        <FormLabel textTransform="capitalize" htmlFor="pollDuration">
          poll duration
        </FormLabel>
        <Select
          focusBorderColor={color.primary}
          variant="filled"
          textTransform="capitalize"
          id="pollDuration"
          onChange={(event) => setPollDuration(Number(event.target.value))}
          value={pollDuration}
        >
          {availablePollDurations.map((item) => (
            <option value={item.value} key={item.id}>
              {item.title}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CreatePoll;
