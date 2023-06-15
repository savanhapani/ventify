import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

const PasswordResetDialog = (props) => {
  const {
    isPasswordResetDialogOpen,
    onPasswordResetDialogClose,
    passwordIsResetting,
    resetPassword,
  } = props;
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isPasswordResetDialogOpen}
      leastDestructiveRef={cancelRef}
      onClose={onPasswordResetDialogClose}
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            textTransform="capitalize"
          >
            reset password
          </AlertDialogHeader>

          <AlertDialogBody>
            Password reset link will be sent to your registered email and you
            will be logged out.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onPasswordResetDialogClose}>
              Cancel
            </Button>
            <Button
              colorScheme="purple"
              ml={3}
              onClick={resetPassword}
              isLoading={passwordIsResetting}
              loadingText="Sending..."
            >
              Send
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default PasswordResetDialog;
