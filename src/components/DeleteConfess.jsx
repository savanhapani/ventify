import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
  Input,
  Code,
  Text,
} from "@chakra-ui/react";
import color from "../styles/colors";
import { useRef, useState } from "react";

const DeleteConfess = (props) => {
  const [userEnteredDeletionCode, setUserEnteredDeletionCode] = useState("");
  const cancelRef = useRef();

  const {
    isDeleteConfessOpen,
    onDeleteConfessClose,
    confessionToBeDelete,
    deleteConfession,
  } = props;

  const resetDeleteConfession = () => {
    setUserEnteredDeletionCode("");
    onDeleteConfessClose();
  };

  const deleteAndResetConfession = () => {
    deleteConfession(userEnteredDeletionCode);
    setUserEnteredDeletionCode("");
  };
  return (
    <AlertDialog
      isOpen={isDeleteConfessOpen}
      leastDestructiveRef={cancelRef}
      onClose={resetDeleteConfession}
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      autoFocus
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="md" fontWeight="bold">
            Delete Confession
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text fontSize="md">
              Enter the deletion code for this confession to verify that it's
              confessed by you.
            </Text>

            <Code marginTop="10px" variant="subtle" padding="10px">
              {confessionToBeDelete.title}
            </Code>

            <Input
              placeholder="Enter deletion code here..."
              size="md"
              focusBorderColor={color.primary}
              marginTop="20px"
              onChange={(event) =>
                setUserEnteredDeletionCode(event.target.value)
              }
              value={userEnteredDeletionCode}
            />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={resetDeleteConfession}
              variant="outline"
              textTransform="capitalize"
            >
              cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={deleteAndResetConfession}
              ml={3}
              textTransform="capitalize"
              isDisabled={!userEnteredDeletionCode}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteConfess;
