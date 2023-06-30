import { Text, Box, Flex, Radio, Progress, Button } from "@chakra-ui/react";
import color from "../styles/colors";

const VoteBar = (props) => {
  const {
    title,
    votes,
    totalVotes,
    choiceWithMaxVotes,
    voteToPoll,
    setIsVoting,
    id,
  } = props;

  const percentage =
    totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
  const choiceWithHighestVotes = choiceWithMaxVotes === title;

  if (totalVotes === 0) {
    return (
      <Button
        colorScheme="purple"
        variant="outline"
        textTransform="capitalize"
        onClick={() => voteToPoll(id, title, setIsVoting)}
      >
        {title}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      textTransform="capitalize"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      paddingLeft={percentage > 0 && "0"}
      onClick={() => voteToPoll(id, title, setIsVoting)}
    >
      <Text
        fontSize="sm"
        position="absolute"
        zIndex="2"
        fontWeight={choiceWithHighestVotes ? "semibold" : "normal"}
        marginLeft={percentage > 0 && "15px"}
      >
        {title}
      </Text>

      <Progress
        value={percentage}
        colorScheme={choiceWithHighestVotes ? "purple" : "blackAlpha"}
        height="100%"
        width="70%"
        backgroundColor="transparent"
        opacity="0.8"
        borderTopLeftRadius="5px"
        borderBottomLeftRadius="5px"
      />

      <Text
        fontSize="sm"
        fontWeight={choiceWithHighestVotes ? "bold" : "normal"}
      >
        {percentage}%
      </Text>
    </Button>
  );
};

export default VoteBar;
