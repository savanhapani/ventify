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
import ReactionButton from "./ReactionButton";
import ConfessionModal from "./ConfessionModal";
import { reactions } from "../assets/data/data";

const Confession = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    confession,
    category,
    batchYear,
    isVisibleToBatchOnly,
    comments,
    onDeleteConfessOpen,
    setConfessionToBeDelete,
  } = props;

  const visibleComments = comments?.slice(0, 3);
  const totalComments = comments?.length;

  const openDeleteConfessionDialog = () => {
    setConfessionToBeDelete(confession);
    onDeleteConfessOpen();
  };

  return (
    <>
      <Card
        maxW="400px"
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
              <Text fontSize="sm">10m ago</Text>
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
                >
                  delete
                </MenuItem>
                <MenuItem icon={<WarningTwoIcon />}>report</MenuItem>
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
              />

              <InputRightAddon backgroundColor="transparent" border="none">
                <IconButton
                  aria-label="Add Comment"
                  icon={<ChatIcon />}
                  colorScheme="purple"
                  variant="ghost"
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
