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
import {
  confessCategories,
  availablePollDurations,
  NUMBER_OF_CHOICES_IN_POLL,
} from "../assets/data/data";
import color from "../styles/colors";
import { useRef, useContext, useState } from "react";
import { VentifyContext } from "../context/VentifyContextProvider";
import CreateConfession from "./CreateConfession";
import CreatePoll from "./CreatePoll";
import LoadindSpinner from "./LoadingSpinner";
import useToastMessage from "../hooks/useToastMessage";
import { db, addDoc, collection } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { CONFESSION_ADD_ERROR, MINIMUM_POLL_CHOICES } from "../errors/errors";

const CreationModal = (props) => {
  const [confession, setConfession] = useState("");
  const [confessionCategory, setConfessionCategory] = useState(
    confessCategories[0].title
  );
  const [isVisibleToBatchOnly, setIsVisibleToBatchOnly] = useState(false);
  const [commentIsDisabled, setCommentIsDisabled] = useState(false);

  const [isConfessing, setIsConfessing] = useState(false);

  const [pollQuestion, setPollQuestion] = useState("");
  const [pollChoices, setPollChoices] = useState(["", ""]);

  const [pollDuration, setPollDuration] = useState(
    availablePollDurations[0].value
  );

  const { loggedInBatchYear } = useContext(VentifyContext);

  const { showToastMessage } = useToastMessage();

  const {
    isCreateConfessOpen,
    creationModalType,
    onCreateConfessClose,
    getConfessions,
  } = props;

  const initialRef = useRef(null);

  const resetConfession = () => {
    setConfession("");
    setConfessionCategory(confessCategories[0].title);
    setIsVisibleToBatchOnly(false);
    setCommentIsDisabled(false);
    setIsConfessing(false);
    setPollQuestion("");
    setPollChoices(["", ""]);
    setPollDuration(availablePollDurations[0].value);
    onCreateConfessClose();
  };

  const addToFirestore = async (creationObj) => {
    setIsConfessing(true);

    try {
      const confessionRef = await addDoc(
        collection(db, "confessions"),
        creationObj
      );

      const deletionCode = confessionRef.id;
      navigator.clipboard.writeText(deletionCode);

      showToastMessage(
        "Congratulations",
        `You have confessed succesfully!! The deletion code for this confession is ${deletionCode} and copied to clipboard.`,
        "success"
      );

      getConfessions();
    } catch (e) {
      showToastMessage("Error", CONFESSION_ADD_ERROR, "error");
    } finally {
      resetConfession();
    }
  };

  const createConfession = () => {
    const confessionObj = {
      confession: confession,
      type: creationModalType,
      category: confessionCategory,
      batchYear: Number(loggedInBatchYear),
      isVisibleToBatchOnly: isVisibleToBatchOnly,
      commentIsDisabled: commentIsDisabled,
      timeStamp: new Date(),
      comments: [],
      reactions: {
        like: 0,
        funny: 0,
        shock: 0,
      },
      reports: [],
    };
    addToFirestore(confessionObj);
  };

  const handlePollChoices = (index, value) => {
    const newChoices = [...pollChoices];
    newChoices[index] = value;

    if (
      index === newChoices.length - 1 &&
      index < NUMBER_OF_CHOICES_IN_POLL - 1 &&
      value !== ""
    ) {
      newChoices.push("");
    }

    setPollChoices(newChoices);
  };

  const createPoll = () => {
    try {
      let nonEmptyChoices = 0;

      pollChoices.forEach((choice) => {
        if (choice.trim()) {
          nonEmptyChoices++;
        }

        if (nonEmptyChoices < 2) {
          throw new Error(MINIMUM_POLL_CHOICES);
        }

        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + pollDuration);

        const structuredPollChoices = [];
        pollChoices.forEach((item) => {
          if (item.trim()) {
            structuredPollChoices.push({
              id: uuidv4(),
              title: item.trim(),
              votes: 0,
              votesByBatches: {},
            });
          }
        });

        const pollObj = {
          question: pollQuestion,
          type: creationModalType,
          choices: structuredPollChoices,
          category: confessionCategory,
          batchYear: Number(loggedInBatchYear),
          isVisibleToBatchOnly: isVisibleToBatchOnly,
          commentIsDisabled: commentIsDisabled,
          timeStamp: new Date(),
          expiryDate: new Date(currentDate),
          totalVotes: 0,
          comments: [],
          reactions: {
            like: 0,
            funny: 0,
            shock: 0,
          },
          reports: [],
        };

        addToFirestore(pollObj);
      });
    } catch (error) {
      showToastMessage("Error", error.message, "warning");
    }
  };

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
                setPollDuration={setPollDuration}
                pollChoices={pollChoices}
                handlePollChoices={handlePollChoices}
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
              onChange={(event) => setConfessionCategory(event.target.value)}
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
                onChange={(event) =>
                  setIsVisibleToBatchOnly(event.target.checked)
                }
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
                onChange={() => setCommentIsDisabled(event.target.checked)}
                isChecked={commentIsDisabled}
              />
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter>
          {isConfessing ? (
            <LoadindSpinner
              text={creationBtnConfig[creationModalType].loadingText}
            />
          ) : (
            <Stack direction="row">
              <Button
                colorScheme="red"
                variant="outline"
                textTransform="capitalize"
                onClick={resetConfession}
                marginRight="10px"
              >
                Cancel
              </Button>

              <Button
                variant="solid"
                colorScheme="purple"
                textTransform="capitalize"
                onClick={creationBtnConfig[creationModalType].onClick}
                isDisabled={creationBtnConfig[creationModalType].isDisabled}
              >
                {creationBtnConfig[creationModalType].btnText}
              </Button>
            </Stack>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreationModal;
