import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";

const ReportConfess = (props) => {
  const cancelRef = useRef();

  const { isReportConfessOpen, onReportConfessClose } = props;
  return (
    <AlertDialog
      isOpen={isReportConfessOpen}
      leastDestructiveRef={cancelRef}
      onClose={onReportConfessClose}
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      autoFocus
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="md" fontWeight="bold">
            Reported
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text fontSize="md">
              We will look into this confession and take necessary actions.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onReportConfessClose}
              variant="solid"
              textTransform="capitalize"
              borderRadius="50px"
              colorScheme="purple"
            >
              okay
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ReportConfess;
