import { Text, Stack, Flex} from "@chakra-ui/react";
import VoteBar from "./VoteBar";
import moment from "moment";
import { useState, useEffect } from "react";
import ConfessionText from "./ConfessionText";

const Poll = (props) => {
  const { id, question, hashtags, choices, totalVotes, expiryDate, voteToPoll } = props;
  const [choiceWithMaxVotes, setChoiceWithMaxVotes] = useState("");
  const [isVoting, setIsVoting] = useState(false);

  const findChoiceWithMaxVotes = () => {
    const { title } = choices.reduce((prev, current) =>
      current.votes > prev.votes ? current : prev
    );
    setChoiceWithMaxVotes(title);
  };

  const currentDate = new Date();
  const pollIsExpired = expiryDate?.toDate() < currentDate;

  useEffect(() => {
    findChoiceWithMaxVotes();
  }, [totalVotes]);

  return (
    <>
   <ConfessionText confession={question} hashtags={hashtags}/> 

      <Stack spacing={3} marginTop="15px">
        {choices?.map((choice) => (
          <VoteBar
            key={choice.id}
            {...choice}
            totalVotes={totalVotes}
            choiceWithMaxVotes={choiceWithMaxVotes}
            isVoting={isVoting}
            voteToPoll={voteToPoll}
            expiryDate={expiryDate}
            setIsVoting={setIsVoting}
            id={id}
          />
        ))}
      </Stack>

      <Flex marginTop="15px" alignItems="center" justifyContent="space-between">
        <Text fontSize="sm" color="blackAlpha.700">
          {totalVotes === 0 ? "no" : totalVotes}{" "}
          {totalVotes > 1 ? "votes" : "vote"}
        </Text>

        <Text fontSize="sm" color="blackAlpha.700">
          {pollIsExpired
            ? "expired"
            : `expires ${moment(expiryDate?.toDate()).fromNow()}`}
        </Text>
      </Flex>
    </>
  );
};

export default Poll;