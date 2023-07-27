import { Text, Box, Progress, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const VoteBar = (props) => {
  const {
    title,
    votes,
    totalVotes,
    choiceWithMaxVotes,
    voteToPoll,
    expiryDate,
    setIsVoting,
    isVoting,
    id,
  } = props;

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    console.log("poll");
    setPercentage(totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0);
  }, [totalVotes, votes]);

  if (totalVotes === 0) {
    return (
      <Button
        colorScheme="purple"
        variant="outline"
        textTransform="capitalize"
        onClick={() => voteToPoll(id, title, setIsVoting, expiryDate)}
      >
        {title}
      </Button>
    );
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Button
        variant="outline"
        textTransform="capitalize"
        width="70%"
        position="relative"
        justifyContent="flex-start"
        padding="0"
        onClick={() => voteToPoll(id, title, setIsVoting, expiryDate)}
      >
        <Text
          fontSize="sm"
          position="absolute"
          zIndex="2"
          fontWeight={choiceWithMaxVotes === title ? "semibold" : "normal"}
          marginLeft="15px"
        >
          {title}
        </Text>

        <Progress
          value={percentage}
          colorScheme={choiceWithMaxVotes === title ? "purple" : "gray"}
          height="100%"
          width="100%"
          backgroundColor="transparent"
          opacity="0.8"
          borderTopLeftRadius="5px"
          borderBottomLeftRadius="5px"
          isIndeterminate={isVoting}
        />
      </Button>

      <Text
        fontSize="sm"
        fontWeight={choiceWithMaxVotes === title ? "bold" : "normal"}
      >
        {percentage}%
      </Text>
    </Box>
  );
};

export default VoteBar;
