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
  FormControl,
  FormHelperText,
  Switch,
  FormLabel,
} from "@chakra-ui/react";
import { confessCategories } from "../assets/data/data";
import color from "../styles/colors";
import { useRef } from "react";

const CONFESSION_CHAR_LIMIT = 280;

function CreateConfess(props) {
  const { isOpen, onClose, confession, setConfession } = props;
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
            <FormControl>
              <Textarea
                placeholder="Write your confession here..."
                focusBorderColor={color.primary}
                variant="outline"
                size="md"
                rows="5"
                maxLength={280}
                resize="none"
                ref={initialRef}
                onChange={(e) => setConfession(e.target.value)}
                value={confession}
              />
              <FormHelperText>
                {confession.length}/{CONFESSION_CHAR_LIMIT}
              </FormHelperText>
            </FormControl>
          </Box>

          <Box marginTop="20px">
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

          <Box marginTop="20px">
            <FormControl>
              <FormLabel htmlFor="isChecked">
                Visible to your batch only
              </FormLabel>
              <Switch id="isChecked" colorScheme="purple" />
            </FormControl>
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
