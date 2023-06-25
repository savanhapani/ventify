import { Text, Box, Flex, Radio, Progress } from "@chakra-ui/react";
import color from "../styles/colors";

const VoteBar = (props) => {
  const { title, votes, totalVotes, choiceWithMaxVotes } = props;

  const percentage =
    totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
  const choiceWithHighestVotes = choiceWithMaxVotes === title;

  if (totalVotes === 0) {
    return (
      <Box>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          marginTop="10px"
        >
          <Radio colorScheme="purple" value={title} />
          <Text fontSize="sm" flex="1" marginLeft="10px">
            {title}
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box>
      <Text fontSize="sm">{title}</Text>

      <Flex alignItems="center" justifyContent="space-between" marginTop="10px">
        <Radio colorScheme="purple" value={title} />
        <Progress
          value={percentage}
          colorScheme={choiceWithHighestVotes ? "purple" : "blackAlpha"}
          height="30px"
          width="70%"
          backgroundColor="transparent"
        />

        <Text
          fontSize="sm"
          color={choiceWithHighestVotes ? color.primary : "#000"}
          fontWeight={choiceWithHighestVotes ? "bold" : "500"}
        >
          {percentage}%
        </Text>
      </Flex>
    </Box>
  );
};

export default VoteBar;
