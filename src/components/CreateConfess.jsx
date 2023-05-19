import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Select,
  Box,
  Stack,
} from "@chakra-ui/react";
import { confessCategories } from "../assets/data/data";
import color from "../styles/colors";

import { useRef } from "react";

function CreateConfess(props) {
  const { isOpen, onClose } = props;
  const initialRef = useRef(null);

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      size={{ base: "full", sm: "lg" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>2018</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Textarea
              placeholder="Write your confession here..."
              focusBorderColor={color.primary}
              variant="outline"
              size="md"
              rows="5"
              resize="none"
              ref={initialRef}
            />
          </Box>
          <Box marginTop="10px">
            <Select
              placeholder="Select Category"
              focusBorderColor={color.primary}
              variant="filled"
              textTransform="capitalize"
            >
              {confessCategories.map((item) => (
                <option value={item.title} key={item.id}>
                  {item.title}
                </option>
              ))}
            </Select>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Stack direction="row">
            <Button
              colorScheme="red"
              variant="outline"
              textTransform="capitalize"
              borderRadius="50px"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              variant="solid"
              colorScheme="purple"
              textTransform="capitalize"
              borderRadius="50px"
            >
              confess
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateConfess;
