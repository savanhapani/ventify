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
} from "@chakra-ui/react";

import color from "../styles/colors";
import Comment from "./Comment";
import AddComment from "./AddComment";
import ReactionsToConfession from "./ReactionsToConfession";
import moment from "moment";
import ConfessionText from "./ConfessionText";
import Poll from "./Poll";

function ConfessionModal(props) {
  const {
    isConfessionModalOpen,
    onConfessionModalClose,
    addCommentToConfession,
    confession,
    type,
    id,
    question,
    choices,
    totalVotes,
    expiryDate,
    voteToPoll,
    batchYear,
    category,
    timeStamp,
    comments,
    reactions,
    commentIsDisabled,
    userComment,
    setUserComment,
    isCommenting,
    loggedInBatchYear,
    reactToConfession,
    setIsCommenting,
    resetComment,
  } = props;

  return (
    <>
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
                  {moment(timeStamp.toDate()).fromNow()}
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
              setUserComment={setUserComment}
              userComment={userComment}
              isCommenting={isCommenting}
              loggedInBatchYear={loggedInBatchYear}
              setIsCommenting={setIsCommenting}
              id={id}
              resetComment={resetComment}
            />

            <Box
              paddingBottom="10px"
              width="100%"
              paddingRight="15px"
              overflowY={{ base: "", sm: "auto" }}
              marginTop="20px"
              maxHeight={{ base: "", sm: "40vh" }}
            >
              {comments?.map((item, index) => (
                <Comment
                  {...item}
                  key={index}
                  loggedInBatchYear={loggedInBatchYear}
                />
              ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfessionModal;
