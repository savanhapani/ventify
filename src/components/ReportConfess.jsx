import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
  Text,
  Code,
  Input,
} from "@chakra-ui/react";
import color from "../styles/colors";
import { useRef } from "react";

const ReportConfess = (props) => {
  const cancelRef = useRef();

  const { isReportConfessOpen, onReportConfessClose, confessionToBeReport } =
    props;
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
            Report
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text fontSize="md">
              We will look into this confession and take necessary actions.
            </Text>

            <Code marginTop="10px" variant="subtle" padding="10px">
              {confessionToBeReport}
            </Code>

            <Input
              placeholder="Your reason to report this confession..."
              size="md"
              focusBorderColor={color.primary}
              marginTop="20px"
            />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onReportConfessClose}
              variant="outline"
              textTransform="capitalize"
              borderRadius="50px"
            >
              cancel
            </Button>
            <Button
              onClick={onReportConfessClose}
              variant="solid"
              textTransform="capitalize"
              borderRadius="50px"
              colorScheme="yellow"
              ml={3}
            >
              report
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ReportConfess;
