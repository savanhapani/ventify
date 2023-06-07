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
import { AddComment } from "./Confession";

function ConfessionModal(props) {
  const {
    isConfessionModalOpen,
    onConfessionModalClose,
    addCommentToConfession,
    confession,
    category,
    comments,
    commentIsDisabled,
    userComment,
    setUserComment,
    isCommenting,
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
              <Tag size="lg" variant="solid" backgroundColor={color.primary}>
                2018
              </Tag>

              <Box flex="1" paddingLeft="20px">
                <Heading size="md" as="h3" textTransform="capitalize">
                  {category}
                </Heading>
                <Text fontSize="sm" fontWeight="400">
                  10m ago
                </Text>
              </Box>

              <ModalCloseButton size="lg" />
            </Flex>
          </ModalHeader>

          <ModalBody>
            <Box>
              <Text fontSize="lg">{confession}</Text>
            </Box>

            <AddComment
              addCommentToConfession={addCommentToConfession}
              commentIsDisabled={commentIsDisabled}
              setUserComment={setUserComment}
              userComment={userComment}
              isCommenting={isCommenting}
            />

            <Box
              marginBottom="10px"
              width="100%"
              overflowY={{ base: "", sm: "auto" }}
              marginTop="20px"
              maxHeight={{ base: "", sm: "40vh" }}
            >
              {comments?.map((item, index) => (
                <Comment {...item} key={index} />
              ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfessionModal;
