import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
  TagLabel,
  TagCloseButton,
  Tag,
  Box,
  Stack,
} from "@chakra-ui/react";
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import { confessCategories } from "../assets/data/data";

import { useRef } from "react";

function CreateConfess() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>2018</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Textarea
                placeholder="Here is a sample placeholder"
                colorScheme="teal"
                focusBorderColor="teal"
                variant="filled"
                size="md"
                ref={initialRef}
              />
            </Box>
            <Box marginTop="10px">
              {confessCategories.map((item) => (
                <Tag
                  size="lg"
                  key={item.id}
                  variant="solid"
                  backgroundColor="#7FFFD4"
                  color="#000"
                  marginRight="10px"
                  marginTop="10px"
                  textTransform="capitalize"
                >
                  <TagLabel>{item.title}</TagLabel>
                  <TagCloseButton />
                </Tag>
              ))}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Stack direction="row">
              <Button
                rightIcon={<CloseIcon />}
                variant="solid"
                backgroundColor="#F88379"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button
                rightIcon={<ArrowForwardIcon />}
                variant="solid"
                backgroundColor="#15F4EE"
                color="#000"
              >
                Confess
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateConfess;
