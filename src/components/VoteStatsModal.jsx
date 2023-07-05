import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Flex,
  Tag,
  Heading,
  Text,
  ModalCloseButton,
  Stack,
} from "@chakra-ui/react";
import { useContext } from "react";
import moment from "moment";
import { VentifyContext } from "../context/VentifyContextProvider";
import color from "../styles/colors";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";

import PollDoughnut from "./PollDoughnut";
import ConfessionText from "./ConfessionText";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const VoteStatsModal = (props) => {
  const { isVoteStatsModalOpen, onVoteStatsModalClose, selectedPoll } = props;
  const { question, choices, category, batchYear, timeStamp } = selectedPoll;
  const { loggedInBatchYear } = useContext(VentifyContext);

  return (
    <>
      <Modal
        isOpen={isVoteStatsModalOpen}
        onClose={onVoteStatsModalClose}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
        size={{ base: "full", sm: "3xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems="center" justifyContent="space-between">
              <Tag
                size="lg"
                variant="solid"
                backgroundColor={
                  loggedInBatchYear == batchYear
                    ? color.primary
                    : color.contrast
                }
              >
                {batchYear}
              </Tag>

              <Box flex="1" paddingLeft="20px">
                <Heading size="md" as="h3" textTransform="capitalize">
                  {category}
                </Heading>
                <Text fontSize="sm" fontWeight="400">
                  {moment(timeStamp?.toDate()).fromNow()}
                </Text>
              </Box>

              <ModalCloseButton size="lg" />
            </Flex>
          </ModalHeader>

          <ModalBody>
            <ConfessionText confession={question} />
            <Stack
              alignItems="center"
              justifyContent="space-evenly"
              marginTop="15px"
              paddingBottom="50px"
              flexWrap="wrap"
              flexDirection="row"
              spacing={3}
            >
              {choices?.map((choice) => (
                <PollDoughnut key={choice.id} {...choice} />
              ))}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VoteStatsModal;
