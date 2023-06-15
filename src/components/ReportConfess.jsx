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
import { useRef, useState } from "react";

const ReportConfess = (props) => {
  const [reasonToReport, setReasonToReport] = useState("");
  const cancelRef = useRef();

  const {
    isReportConfessOpen,
    onReportConfessClose,
    confessionToBeReport,
    reportConfession,
  } = props;

  const resetReportConfession = () => {
    setReasonToReport("");
    onReportConfessClose();
  };

  const reportAndResetConfession = () => {
    reportConfession(confessionToBeReport.id, reasonToReport);
    setReasonToReport("");
  };
  return (
    <AlertDialog
      isOpen={isReportConfessOpen}
      leastDestructiveRef={cancelRef}
      onClose={resetReportConfession}
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
              {confessionToBeReport.title}
            </Code>

            <Input
              placeholder="Your reason to report this confession..."
              size="md"
              focusBorderColor={color.primary}
              marginTop="20px"
              onChange={(event) => setReasonToReport(event.target.value)}
              value={reasonToReport}
            />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={resetReportConfession}
              variant="outline"
              textTransform="capitalize"
            >
              cancel
            </Button>
            <Button
              onClick={reportAndResetConfession}
              isDisabled={!reasonToReport}
              variant="solid"
              textTransform="capitalize"
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
