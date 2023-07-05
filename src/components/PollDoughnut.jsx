import { Box, Badge } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";

const PollDoughnut = (props) => {
  const { title, votes, votesByBatches } = props;

  if (votes === 0) return null;

  const convertToChartDataset = (originalObject) => {
    const labels = Object.keys(originalObject);
    const data = Object.values(originalObject);

    const convertedObject = {
      labels: labels,
      datasets: [
        {
          label: "Votes",
          data: data,
          hoverOffset: 4,
        },
      ],
    };

    return convertedObject;
  };

  const chartData = convertToChartDataset(votesByBatches);

  return (
    <Box boxSize={{ base: "100%", sm: "45%" }}>
      <Badge
        colorScheme="purple"
        variant="outline"
        fontSize="14px"
        marginBottom="10px"
      >
        {title}: {votes}
      </Badge>
      <Doughnut data={chartData} />
    </Box>
  );
};

export default PollDoughnut;
