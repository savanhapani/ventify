import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  Input,
  IconButton,
  InputRightAddon,
  Box,
  Flex,
  Tag,
  Heading,
  Text,
} from "@chakra-ui/react";

import color from "../styles/colors";
import { ChatIcon } from "@chakra-ui/icons";
import Comment from "./Comment";
import { useRef } from "react";

function ConfessionModal(props) {
  const {
    isConfessionModalOpen,
    onConfessionModalClose,
    addCommentToConfession,
    confession,
    category,
    comments,
    userComment,
    setUserComment,
    isCommenting,
  } = props;

  const initialRef = useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
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

            <Box marginTop="10px">
              <InputGroup size="md">
                <Input
                  placeholder="Add a comment..."
                  variant="flushed"
                  focusBorderColor={color.primary}
                  onChange={(event) => setUserComment(event.target.value)}
                  value={userComment}
                  ref={initialRef}
                />

                <InputRightAddon backgroundColor="transparent" border="none">
                  <IconButton
                    aria-label="Add Comment"
                    icon={<ChatIcon />}
                    colorScheme="purple"
                    variant="ghost"
                    isDisabled={!userComment}
                    isLoading={isCommenting}
                    onClick={addCommentToConfession}
                  />
                </InputRightAddon>
              </InputGroup>
            </Box>

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
