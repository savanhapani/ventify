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

function ConfessionModal(props) {
  const { isOpen, onClose, confession, category, comments } = props;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
        size="full"
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
                <Text fontSize="md">10m ago</Text>
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
                />

                <InputRightAddon backgroundColor="transparent" border="none">
                  <IconButton
                    aria-label="Add Comment"
                    icon={<ChatIcon />}
                    colorScheme="purple"
                    variant="ghost"
                  />
                </InputRightAddon>
              </InputGroup>
            </Box>

            <Box
              marginBottom="10px"
              width="100%"
              overflowY="auto"
              marginTop="20px"
            >
              {comments?.map((item) => (
                <Comment {...item} key={item.id} />
              ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfessionModal;
