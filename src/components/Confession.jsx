import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Tag,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  InputGroup,
  Input,
  InputRightAddon,
  useDisclosure,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChatIcon,
  DeleteIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import color from "../styles/colors";
import Comment from "./Comment";
import { useState } from "react";
import ReactionButton from "./ReactionButton";
import ConfessionModal from "./ConfessionModal";
import { reactions } from "../assets/data/data";
import moment from "moment";
import { doc, updateDoc, db, arrayUnion } from "../firebase/firebase";
import useToastMessage from "../hooks/useToastMessage";

const Confession = (props) => {
  const [userComment, setUserComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const { showToastMessage } = useToastMessage();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    id,
    confession,
    category,
    batchYear,
    isVisibleToBatchOnly,
    timeStamp,
    comments,
    onDeleteConfessOpen,
    setConfessionToBeDelete,
    onReportConfessOpen,
    setConfessionToBeReport,
  } = props;

  const visibleComments = comments?.slice(0, 3);
  const totalComments = comments?.length;

  const openDeleteConfessionDialog = () => {
    setConfessionToBeDelete(confession);
    onDeleteConfessOpen();
  };

  const openReportConfessionDialog = () => {
    setConfessionToBeReport(confession);
    onReportConfessOpen();
  };

  const resetComment = () => {
    setUserComment("");
  };

  const addCommentToConfession = async () => {
    setIsCommenting(true);
    const confessionRef = doc(db, "confessions", id);

    const userCommentObj = {
      batchYear: 2018,
      comment: userComment,
    };

    await updateDoc(confessionRef, {
      comments: arrayUnion(userCommentObj),
    });

    resetComment();
    setIsCommenting(false);
    showToastMessage(
      "Successful",
      "Comment added successfully!",
      "success",
      "purple"
    );
  };

  return (
    <>
      <Card
        width="400px"
        colorScheme="blackAlpha"
        variant="elevated"
        backgroundColor="#fff"
        height="fit-content"
      >
        {isVisibleToBatchOnly && (
          <Badge colorScheme="purple" variant="subtle" textAlign="center">
            only your batch can see this confession
          </Badge>
        )}

        <CardHeader>
          <Flex alignItems="center" justifyContent="space-between">
            <Tag size="lg" variant="solid" backgroundColor={color.primary}>
              {batchYear}
            </Tag>

            <Box flex="1" paddingLeft="20px">
              <Heading size="sm" as="h3" textTransform="capitalize">
                {category}
              </Heading>
              <Text fontSize="sm">{moment(timeStamp.toDate()).fromNow()}</Text>
            </Box>

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="See menu"
                icon={<HamburgerIcon />}
                variant="ghost"
                colorScheme="gray"
              />
              <MenuList>
                <MenuItem
                  icon={<DeleteIcon />}
                  onClick={openDeleteConfessionDialog}
                  textTransform="capitalize"
                  color="red"
                >
                  delete
                </MenuItem>
                <MenuItem
                  icon={<WarningTwoIcon />}
                  onClick={openReportConfessionDialog}
                  textTransform="capitalize"
                >
                  report
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </CardHeader>

        <CardBody>
          <Text fontSize="lg">{confession}</Text>
        </CardBody>

        <CardFooter flexDirection="column">
          <Flex alignItems="center" justifyContent="space-between">
            {reactions.map((item) => (
              <ReactionButton {...item} key={item.id} />
            ))}
          </Flex>

          <Box marginTop="10px">
            <InputGroup size="md">
              <Input
                placeholder="Add a comment..."
                variant="flushed"
                focusBorderColor={color.primary}
                onChange={(event) => setUserComment(event.target.value)}
                value={userComment}
              />

              <InputRightAddon backgroundColor="transparent" border="none">
                <IconButton
                  aria-label="Add Comment"
                  icon={<ChatIcon />}
                  colorScheme="purple"
                  variant="ghost"
                  isDisabled={!userComment}
                  isLoading={isCommenting}
                  onClick={addCommentToConfession}
                />
              </InputRightAddon>
            </InputGroup>
          </Box>

          {totalComments > 0 && (
            <Box marginTop="10px">
              {visibleComments.map((item) => (
                <Comment {...item} key={item.id} />
              ))}

              {totalComments > 3 && (
                <Button
                  colorScheme="purple"
                  variant="link"
                  textTransform="capitalize"
                  size="sm"
                  marginTop="15px"
                  onClick={onOpen}
                >
                  view all {totalComments} comments
                </Button>
              )}
            </Box>
          )}
        </CardFooter>
      </Card>
      <ConfessionModal isOpen={isOpen} onClose={onClose} {...props} />
    </>
  );
};

export default Confession;
