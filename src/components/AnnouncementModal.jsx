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
  Stack,
  FormControl,
  Switch,
  FormLabel,
  Textarea,
  FormHelperText,
  Text,
  Input,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import color from "../styles/colors";
import {
  ANNOUNCEMENT_CHAR_LIMIT,
  announcementCategories,
} from "../assets/data/data";

import { auth } from "../firebase/firebase";
import LoadindSpinner from "./LoadingSpinner";

const ToggleOption = (props) => {
  const { children, title } = props;
  const [optionIsIncluded, setOptionIsIncluded] = useState(false);

  return (
    <>
      <FormControl
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <FormLabel htmlFor="includeDate" textTransform="capitalize">
          include {title}
        </FormLabel>
        <Switch
          id="includeDate"
          colorScheme="purple"
          onChange={(event) => setOptionIsIncluded(event.target.checked)}
          isChecked={optionIsIncluded}
        />
      </FormControl>
      {optionIsIncluded && children}
    </>
  );
};

const AnnouncementModal = (props) => {
  const initialRef = useRef(null);

  const { isCreateAnnouncementOpen, onCreateAnnouncementClose } = props;

  const [isProcessing, setIsProcessing] = useState(false);

  const [announcement, setAnnouncement] = useState("");
  const [announcementCategory, setAnnouncementCategory] = useState(
    announcementCategories[0].title
  );

  const [eventImage, setEventImage] = useState("");

  const [eventDate, setEventDate] = useState("");

  const [venue, setVenue] = useState("");

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isCreateAnnouncementOpen}
      onClose={onCreateAnnouncementClose}
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      size={{ base: "full", sm: "lg" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {auth.currentUser.email}
          <Text fontSize="13px" color={color.contrast} fontWeight="medium">
            Announcements are not anonymous!
          </Text>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Textarea
              placeholder="Create your announcement here..."
              focusBorderColor={color.primary}
              variant="outline"
              size="md"
              rows="5"
              maxLength={ANNOUNCEMENT_CHAR_LIMIT}
              resize="none"
              ref={initialRef}
              onChange={(e) => setAnnouncement(e.target.value)}
              value={announcement}
            />
            <FormHelperText>
              {announcement.length}/{ANNOUNCEMENT_CHAR_LIMIT}
            </FormHelperText>
          </FormControl>

          <FormControl marginTop="20px">
            <FormLabel
              textTransform="capitalize"
              htmlFor="announcementCategory"
            >
              category
            </FormLabel>
            <Select
              focusBorderColor={color.primary}
              variant="filled"
              id="announcementCategory"
              textTransform="capitalize"
              onChange={(event) => setAnnouncementCategory(event.target.value)}
              value={announcementCategory}
            >
              {announcementCategories.map((item) => (
                <option value={item.title} key={item.id}>
                  {item.title}
                </option>
              ))}
            </Select>
          </FormControl>

          <Stack spacing={3} marginTop="20px">
            <ToggleOption title="image">
              <Input
                type="file"
                marginTop="10px"
                accept="image/*"
                focusBorderColor={color.primary}
                border="none"
                placeholder="hh"
              />
            </ToggleOption>

            <ToggleOption title="date">
              <Input
                placeholder="Select Date"
                type="date"
                focusBorderColor={color.primary}
                marginTop="10px"
                onChange={(event) => setEventDate(event.target.value)}
                value={eventDate}
              />
            </ToggleOption>

            <ToggleOption title="venue">
              <Input
                placeholder="Enter venue here..."
                focusBorderColor={color.primary}
                type="text"
                marginTop="10px"
                onChange={(event) => setVenue(event.target.value)}
                value={venue}
                maxLength={100}
              />
            </ToggleOption>
          </Stack>
        </ModalBody>

        <ModalFooter>
          {isProcessing ? (
            <LoadindSpinner text="Announcing..." />
          ) : (
            <Stack direction="row">
              <Button
                colorScheme="red"
                variant="outline"
                textTransform="capitalize"
                onClick={onCreateAnnouncementClose}
                marginRight="10px"
              >
                Cancel
              </Button>

              <Button
                variant="solid"
                colorScheme="purple"
                textTransform="capitalize"
                isDisabled={!announcement}
              >
                announce
              </Button>
            </Stack>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AnnouncementModal;
