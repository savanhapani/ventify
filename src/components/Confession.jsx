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
  InputLeftElement,
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

const COMMENT_CHAR_LIMIT = 280;
const ALLOWED_VISIBLE_COMMENTS = 3;

export const AddComment = (props) => {
  const {
    addCommentToConfession,
    commentIsDisabled,
    setUserComment,
    userComment,
    isCommenting,
    loggedInBatchYear,
  } = props;

  return (
    <Box marginTop="10px">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCommentToConfession();
        }}
      >
        <InputGroup size="md" alignItems="center">
          {userComment && (
            <InputLeftElement pointerEvents="none" width="fit-content">
              <Tag size="md" variant="subtle">
                {loggedInBatchYear}
              </Tag>
            </InputLeftElement>
          )}

          <Input
            placeholder={
              commentIsDisabled
                ? "User has disabled the comments"
                : "Add a comment..."
            }
            variant="flushed"
            isDisabled={commentIsDisabled}
            focusBorderColor={color.primary}
            onChange={(event) => setUserComment(event.target.value)}
            value={userComment}
            maxLength={COMMENT_CHAR_LIMIT}
            flex="1"
            paddingLeft={userComment && "60px"}
          />

          <InputRightAddon backgroundColor="transparent" border="none">
            {userComment && (
              <Text fontSize="xs" as="span" color="blackAlpha.700">
                {userComment.length}/{COMMENT_CHAR_LIMIT}
              </Text>
            )}
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
      </form>
    </Box>
  );
};

const Confession = (props) => {
  const [userComment, setUserComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const {
    isOpen: isConfessionModalOpen,
    onOpen: onConfessionModalOpen,
    onClose: onConfessionModalClose,
  } = useDisclosure();

  const { showToastMessage } = useToastMessage();

  const {
    id,
    confession,
    category,
    batchYear,
    isVisibleToBatchOnly,
    commentIsDisabled,
    timeStamp,
    comments,
    onDeleteConfessOpen,
    setConfessionToBeDelete,
    onReportConfessOpen,
    setConfessionToBeReport,
    getConfessions,
    loggedInBatchYear,
  } = props;

  const visibleComments = comments?.slice(0, ALLOWED_VISIBLE_COMMENTS);
  const totalComments = comments?.length;

  const openDeleteConfessionDialog = () => {
    setConfessionToBeDelete({
      id: id,
      title: confession,
    });
    onDeleteConfessOpen();
  };

  const openReportConfessionDialog = () => {
    setConfessionToBeReport({ id: id, title: confession });
    onReportConfessOpen();
  };

  const resetComment = () => {
    setUserComment("");
  };

  const addCommentToConfession = async () => {
    setIsCommenting(true);
    const confessionRef = doc(db, "confessions", id);

    const userCommentObj = {
      batchYear: loggedInBatchYear,
      comment: userComment,
      timeStamp: new Date(),
    };

    await updateDoc(confessionRef, {
      comments: arrayUnion(userCommentObj),
    });

    resetComment();
    setIsCommenting(false);
    showToastMessage("Successful", "Comment added successfully!", "success");
    getConfessions();
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
            <Tag
              size="lg"
              variant="solid"
              backgroundColor={
                loggedInBatchYear == batchYear ? color.primary : color.contrast
              }
            >
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
          <Flex alignItems="center" justifyContent="space-around">
            {reactions.map((item) => (
              <ReactionButton {...item} key={item.id} />
            ))}
          </Flex>

          <AddComment
            addCommentToConfession={addCommentToConfession}
            commentIsDisabled={commentIsDisabled}
            setUserComment={setUserComment}
            userComment={userComment}
            isCommenting={isCommenting}
            loggedInBatchYear={loggedInBatchYear}
          />

          {totalComments > 0 && (
            <Box marginTop="10px">
              {visibleComments.map((item, index) => (
                <Comment
                  {...item}
                  key={index}
                  loggedInBatchYear={loggedInBatchYear}
                />
              ))}

              {totalComments > ALLOWED_VISIBLE_COMMENTS && (
                <Button
                  colorScheme="purple"
                  variant="link"
                  textTransform="capitalize"
                  size="sm"
                  marginTop="15px"
                  onClick={onConfessionModalOpen}
                >
                  view all {totalComments} comments
                </Button>
              )}
            </Box>
          )}
        </CardFooter>
      </Card>
      <ConfessionModal
        isConfessionModalOpen={isConfessionModalOpen}
        onConfessionModalClose={onConfessionModalClose}
        addCommentToConfession={addCommentToConfession}
        userComment={userComment}
        setUserComment={setUserComment}
        isCommenting={isCommenting}
        {...props}
      />
    </>
  );
};

export default Confession;
