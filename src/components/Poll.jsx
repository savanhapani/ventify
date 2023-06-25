import { Text, Stack, Flex, RadioGroup } from "@chakra-ui/react";
import VoteBar from "./VoteBar";
import moment from "moment";
import { useState, useEffect } from "react";

const Poll = (props) => {
  const { question, choices, totalVotes, expiryDate } = props;
  const [choiceWithMaxVotes, setChoiceWithMaxVotes] = useState("");

  const findChoiceWithMaxVotes = () => {
    const { title } =
      choices?.reduce((prev, current) =>
        current.votes > prev.votes ? current : prev
      ) || "";
    setChoiceWithMaxVotes(title);
  };

  useEffect(() => {
    findChoiceWithMaxVotes();
  }, []);

  return (
    <>
      <Text fontSize="lg">{question}</Text>

      <RadioGroup>
        <Stack spacing={3} marginTop="15px">
          {choices?.map((choice, index) => (
            <VoteBar
              key={index}
              {...choice}
              totalVotes={totalVotes}
              choiceWithMaxVotes={choiceWithMaxVotes}
            />
          ))}
        </Stack>
      </RadioGroup>

      <Flex marginTop="15px" alignItems="center" justifyContent="space-between">
        <Text fontSize="sm" color="blackAlpha.700">
          {totalVotes === 0 ? "no" : totalVotes} votes
        </Text>

        <Text fontSize="sm" color="blackAlpha.700">
          expires {moment(expiryDate.toDate()).fromNow()}
        </Text>
      </Flex>
    </>
  );
};

export default Poll;
