import { Text, Stack, Flex, Skeleton } from "@chakra-ui/react";
import VoteBar from "./VoteBar";
import moment from "moment";
import { useState, useEffect } from "react";

const Poll = (props) => {
  const { id, question, choices, totalVotes, expiryDate, voteToPoll } = props;
  const [choiceWithMaxVotes, setChoiceWithMaxVotes] = useState("");
  const [isVoting, setIsVoting] = useState(false);

  const findChoiceWithMaxVotes = () => {
    const { title } = choices.reduce((prev, current) =>
      current.votes > prev.votes ? current : prev
    );
    setChoiceWithMaxVotes(title);
  };

  useEffect(() => {
    findChoiceWithMaxVotes();
  }, [totalVotes]);

  return (
    <>
      <Text fontSize="lg">{question}</Text>

      <Skeleton
        isLoaded={!isVoting}
        startColor="purple.100"
        endColor="purple.500"
      >
        <Stack spacing={3} marginTop="15px">
          {choices?.map((choice) => (
            <VoteBar
              key={choice.id}
              {...choice}
              totalVotes={totalVotes}
              choiceWithMaxVotes={choiceWithMaxVotes}
              isVoting={isVoting}
              voteToPoll={voteToPoll}
              setIsVoting={setIsVoting}
              id={id}
            />
          ))}
        </Stack>
      </Skeleton>

      <Flex marginTop="15px" alignItems="center" justifyContent="space-between">
        <Text fontSize="sm" color="blackAlpha.700">
          {totalVotes === 0 ? "no" : totalVotes}{" "}
          {totalVotes > 1 ? "votes" : "vote"}
        </Text>

        <Text fontSize="sm" color="blackAlpha.700">
          expires {moment(expiryDate.toDate()).fromNow()}
        </Text>
      </Flex>
    </>
  );
};

export default Poll;
