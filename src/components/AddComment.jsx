import {
  Box,
  InputGroup,
  InputLeftElement,
  Tag,
  Input,
  InputRightAddon,
  Text,
  IconButton,
} from "@chakra-ui/react";
import color from "../styles/colors";
import { COMMENT_CHAR_LIMIT } from "../assets/data/data";
import { ChatIcon } from "@chakra-ui/icons";

const AddComment = (props) => {
  const {
    addCommentToConfession,
    commentIsDisabled,
    setUserComment,
    userComment,
    isCommenting,
    loggedInBatchYear,
    setIsCommenting,
    id,
    resetComment,
  } = props;

  return (
    <Box marginTop="10px">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCommentToConfession(
            setIsCommenting,
            id,
            userComment,
            resetComment
          );
        }}
      >
        <InputGroup size="md" alignItems="center">
          {userComment && (
            <InputLeftElement pointerEvents="none" width="fit-content">
              <Tag size="md" variant="subtle" colorScheme="purple">
                {loggedInBatchYear}
              </Tag>
            </InputLeftElement>
          )}

          <Input
            placeholder={
              commentIsDisabled
                ? "User has disabled the comments"
                : `Add a comment as ${loggedInBatchYear}`
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
              onClick={() =>
                addCommentToConfession(
                  setIsCommenting,
                  id,
                  userComment,
                  resetComment
                )
              }
            />
          </InputRightAddon>
        </InputGroup>
      </form>
    </Box>
  );
};

export default AddComment;
