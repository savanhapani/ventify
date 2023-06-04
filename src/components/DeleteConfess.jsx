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
import { useRef } from "react";

const DeleteConfess = (props) => {
  const cancelRef = useRef();

  const { isDeleteConfessOpen, onDeleteConfessClose, confessionToBeDelete } =
    props;
  return (
    <AlertDialog
      isOpen={isDeleteConfessOpen}
      leastDestructiveRef={cancelRef}
      onClose={onDeleteConfessClose}
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
              {confessionToBeDelete}
            </Code>

            <Input
              placeholder="Enter deletion code here..."
              size="md"
              focusBorderColor={color.primary}
              marginTop="20px"
            />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onDeleteConfessClose}
              variant="outline"
              textTransform="capitalize"
              borderRadius="50px"
            >
              cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={onDeleteConfessClose}
              ml={3}
              textTransform="capitalize"
              borderRadius="50px"
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
