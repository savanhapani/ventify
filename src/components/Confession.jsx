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
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  ScaleFade,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, DeleteIcon, WarningTwoIcon } from "@chakra-ui/icons";
import color from "../styles/colors";
import Comment from "./Comment";
import ReactionsToConfession from "./ReactionsToConfession";
import moment from "moment";
import ConfessionText from "./ConfessionText";
import Poll from "./Poll";
import AddComment from "./AddComment";
import ConfessionModal from "./ConfessionModal";
import { ALLOWED_VISIBLE_COMMENTS } from "../assets/data/data";

const Confession = (props) => {
  const {
    id,
    confession,
    question,
    type,
    choices,
    totalVotes,
    category,
    batchYear,
    isVisibleToBatchOnly,
    commentIsDisabled,
    timeStamp,
    expiryDate,
    comments,
    reactions,
    onDeleteConfessOpen,
    setConfessionToBeDelete,
    onReportConfessOpen,
    setConfessionToBeReport,
    loggedInBatchYear,
    addCommentToConfession,
    reactToConfession,
    voteToPoll,
    viewDetailedPollStats,
  } = props;

  const {
    isOpen: isConfessionModalOpen,
    onOpen: onConfessionModalOpen,
    onClose: onConfessionModalClose,
  } = useDisclosure();

  const visibleComments = comments?.slice(0, ALLOWED_VISIBLE_COMMENTS);
  const totalComments = comments?.length;

  const openDeleteConfessionDialog = () => {
    setConfessionToBeDelete({
      id: id,
      title: type === "confession" ? confession : question,
    });
    onDeleteConfessOpen();
  };

  const openReportConfessionDialog = () => {
    setConfessionToBeReport({
      id: id,
      title: type === "confession" ? confession : question,
    });
    onReportConfessOpen();
  };

  return (
    <>
      <ScaleFade initialScale={0.9} in={true}>
        <Card
          width="400px"
          colorScheme="blackAlpha"
          variant="elevated"
          backgroundColor="#fff"
          height="fit-content"
        >
          {isVisibleToBatchOnly && (
            <Badge colorScheme="purple" variant="subtle" textAlign="center">
              only your batch can see this {type}
            </Badge>
          )}

          <CardHeader>
            <Flex alignItems="center" justifyContent="space-between">
              <Tag
                size="lg"
                variant="solid"
                backgroundColor={
                  loggedInBatchYear == batchYear
                    ? color.primary
                    : color.contrast
                }
              >
                {batchYear}
              </Tag>

              <Box flex="1" paddingLeft="20px">
                <Heading size="sm" as="h3" textTransform="capitalize">
                  {category}
                </Heading>
                <Text fontSize="sm">
                  {moment(timeStamp.toDate()).fromNow()}
                </Text>
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
                    icon={<WarningTwoIcon />}
                    onClick={openReportConfessionDialog}
                    textTransform="capitalize"
                  >
                    report
                  </MenuItem>
                  <MenuItem
                    icon={<DeleteIcon />}
                    onClick={openDeleteConfessionDialog}
                    textTransform="capitalize"
                    color="red"
                  >
                    delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </CardHeader>

          <CardBody>
            {type === "confession" ? (
              <ConfessionText confession={confession} />
            ) : (
              <>
                <Poll
                  id={id}
                  question={question}
                  choices={choices}
                  totalVotes={totalVotes}
                  expiryDate={expiryDate}
                  category={category}
                  batchYear={batchYear}
                  timeStamp={timeStamp}
                  voteToPoll={voteToPoll}
                  viewDetailedPollStats={viewDetailedPollStats}
                />

                {totalVotes > 0 && !isVisibleToBatchOnly && (
                  <Button
                    colorScheme="purple"
                    variant="link"
                    textTransform="capitalize"
                    size="sm"
                    marginTop="15px"
                    justifyContent="flex-start"
                    onClick={() =>
                      viewDetailedPollStats(
                        id,
                        question,
                        choices,
                        totalVotes,
                        expiryDate,
                        category,
                        batchYear,
                        timeStamp
                      )
                    }
                  >
                    view detailed poll stats
                  </Button>
                )}
              </>
            )}
          </CardBody>

          <CardFooter flexDirection="column">
            <ReactionsToConfession
              id={id}
              reactToConfession={reactToConfession}
              reactions={reactions}
            />

            <AddComment
              addCommentToConfession={addCommentToConfession}
              commentIsDisabled={commentIsDisabled}
              loggedInBatchYear={loggedInBatchYear}
              id={id}
            />

            {totalComments > 0 && (
              <Stack spacing={2} marginTop="15px">
                {visibleComments.map((item) => (
                  <Comment
                    {...item}
                    key={item.id}
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
                    justifyContent="flex-start"
                    onClick={onConfessionModalOpen}
                  >
                    view all {totalComments} comments
                  </Button>
                )}
              </Stack>
            )}
          </CardFooter>
        </Card>
      </ScaleFade>
      <ConfessionModal
        isConfessionModalOpen={isConfessionModalOpen}
        onConfessionModalClose={onConfessionModalClose}
        addCommentToConfession={addCommentToConfession}
        reactToConfession={reactToConfession}
        voteToPoll={voteToPoll}
        batchYear={batchYear}
        category={category}
        timeStamp={timeStamp}
        type={type}
        confession={confession}
        question={question}
        choices={choices}
        totalVotes={totalVotes}
        expiryDate={expiryDate}
        id={id}
        comments={comments}
        reactions={reactions}
        commentIsDisabled={commentIsDisabled}
      />
    </>
  );
};

export default Confession;
