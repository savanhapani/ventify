import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Box,
  Stack,
  FormControl,
  Switch,
  FormLabel,
} from "@chakra-ui/react";
import { confessCategories } from "../assets/data/data";
import color from "../styles/colors";
import { useRef, useContext } from "react";
import { VentifyContext } from "../context/VentifyContextProvider";
import CreateConfession from "./CreateConfession";
import CreatePoll from "./CreatePoll";

const CreationModal = (props) => {
  const { loggedInBatchYear } = useContext(VentifyContext);
  const {
    isCreateConfessOpen,
    createConfession,
    createPoll,
    creationModalType,
    handleCategoryChange,
    handlePollDurationChange,
    handleIsVisibleToBatchOnlyChange,
    handleCommentIsDisabledChange,
    confession,
    setConfession,
    confessionCategory,
    isVisibleToBatchOnly,
    commentIsDisabled,
    isConfessing,
    resetConfession,
    pollQuestion,
    pollDuration,
    setPollQuestion,
    pollChoices,
    handlePollChoices,
  } = props;
  const initialRef = useRef(null);

  const creationBtnConfig = {
    confession: {
      isDisabled: !confession,
      loadingText: "Confessing",
      btnText: "confess",
      onClick: createConfession,
    },
    poll: {
      isDisabled: !pollQuestion,
      loadingText: "Creating poll",
      btnText: "create poll",
      onClick: createPoll,
    },
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isCreateConfessOpen}
      onClose={resetConfession}
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      size={{ base: "full", sm: "lg" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{loggedInBatchYear}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            {creationModalType === "confession" ? (
              <CreateConfession
                initialRef={initialRef}
                setConfession={setConfession}
                confession={confession}
              />
            ) : (
              <CreatePoll
                initialRef={initialRef}
                pollQuestion={pollQuestion}
                setPollQuestion={setPollQuestion}
                pollDuration={pollDuration}
                pollChoices={pollChoices}
                handlePollChoices={handlePollChoices}
                handlePollDurationChange={handlePollDurationChange}
              />
            )}
          </Box>

          <FormControl marginTop="20px">
            <FormLabel textTransform="capitalize" htmlFor="confessCategory">
              category
            </FormLabel>
            <Select
              focusBorderColor={color.primary}
              variant="filled"
              id="confessCategory"
              textTransform="capitalize"
              onChange={handleCategoryChange}
              value={confessionCategory}
            >
              {confessCategories.map((item) => (
                <option value={item.title} key={item.id}>
                  {item.title}
                </option>
              ))}
            </Select>
          </FormControl>

          <Box marginTop="20px">
            <FormControl>
              <FormLabel htmlFor="isVisibleToBatchOnly" width="fit-content">
                Visible to your batch only
              </FormLabel>
              <Switch
                id="isVisibleToBatchOnly"
                colorScheme="purple"
                onChange={handleIsVisibleToBatchOnlyChange}
                isChecked={isVisibleToBatchOnly}
              />

              <FormLabel
                htmlFor="commentIsDisabled"
                marginTop="10px"
                width="fit-content"
              >
                Disable comments
              </FormLabel>
              <Switch
                id="commentIsDisabled"
                colorScheme="purple"
                onChange={handleCommentIsDisabledChange}
                isChecked={commentIsDisabled}
              />
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Stack direction="row">
            <Button
              colorScheme="red"
              variant="outline"
              textTransform="capitalize"
              onClick={resetConfession}
              mr={3}
            >
              Cancel
            </Button>

            <Button
              variant="solid"
              colorScheme="purple"
              textTransform="capitalize"
              onClick={creationBtnConfig[creationModalType].onClick}
              isDisabled={creationBtnConfig[creationModalType].isDisabled}
              isLoading={isConfessing}
              loadingText={creationBtnConfig[creationModalType].loadingText}
            >
              {creationBtnConfig[creationModalType].btnText}
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreationModal;
