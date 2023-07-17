import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Tag,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/react";

import color from "../styles/colors";
import Comment from "./Comment";
import AddComment from "./AddComment";
import ReactionsToConfession from "./ReactionsToConfession";
import moment from "moment";
import ConfessionText from "./ConfessionText";
import Poll from "./Poll";
import { useContext } from "react";
import { VentifyContext } from "../context/VentifyContextProvider";

const ConfessionModal = (props) => {
  const {
    id,
    isConfessionModalOpen,
    onConfessionModalClose,
    addCommentToConfession,
    voteToPoll,
    reactToConfession,
    batchYear,
    category,
    timeStamp,
    type,
    confession,
    question,
    choices,
    totalVotes,
    expiryDate,
    comments,
    reactions,
    commentIsDisabled,
  } = props;

  const { loggedInBatchYear } = useContext(VentifyContext);

  return (
    <Modal
      isOpen={isConfessionModalOpen}
      onClose={onConfessionModalClose}
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
                loggedInBatchYear == batchYear ? color.primary : color.contrast
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
          <Box marginBottom="15px">
            {type === "confession" ? (
              <ConfessionText confession={confession} />
            ) : (
              <Poll
                id={id}
                question={question}
                choices={choices}
                totalVotes={totalVotes}
                expiryDate={expiryDate}
                voteToPoll={voteToPoll}
              />
            )}
          </Box>

          <ReactionsToConfession
            id={id}
            reactToConfession={reactToConfession}
            reactions={reactions}
          />

          <AddComment
            addCommentToConfession={addCommentToConfession}
            commentIsDisabled={commentIsDisabled}
            loggedInBatchYear={loggedInBatchYear}
            id={id}
          />

          <Stack
            spacing={2}
            marginTop="20px"
            paddingBottom="10px"
            width="100%"
            paddingRight="15px"
            overflowY={{ base: "", sm: "auto" }}
            maxHeight={{ base: "", sm: "30vh" }}
          >
            {comments?.map((item) => (
              <Comment
                {...item}
                key={item.id}
                loggedInBatchYear={loggedInBatchYear}
              />
            ))}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfessionModal;
