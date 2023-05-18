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
} from "@chakra-ui/react";
import { HamburgerIcon, StarIcon, ChatIcon } from "@chakra-ui/icons";
import color from "../styles/colors";
import Comment from "./Comment";

const Confession = (props) => {
  const { confession, category, comments } = props;

  const visibleComments = comments?.slice(0, 3);
  const totalComments = comments?.length;

  return (
    <Card
      maxW="sm"
      colorScheme="blackAlpha"
      variant="elevated"
      backgroundColor="#fff"
      height="fit-content"
    >
      <CardHeader>
        <Flex alignItems="center" justifyContent="space-between">
          <Tag size="lg" variant="solid" backgroundColor={color.primary}>
            2018
          </Tag>

          <Box flex="1" paddingLeft="20px">
            <Heading size="sm" as="h3" textTransform="capitalize">
              {category}
            </Heading>
            <Text>10m ago</Text>
          </Box>

          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<HamburgerIcon />}
          />
        </Flex>
      </CardHeader>

      <CardBody>
        <Text>{confession}</Text>
      </CardBody>

      <CardFooter flexDirection="column">
        <Flex alignItems="center" justifyContent="space-between">
          <Button flex="1" variant="ghost" leftIcon={<StarIcon />}>
            10 Likes
          </Button>
        </Flex>

        <Box marginTop="10px">
          <InputGroup size="sm">
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
                marginTop="20px"
              >
                view all {totalComments} comments
              </Button>
            )}
          </Box>
        )}
      </CardFooter>
    </Card>
  );
};

export default Confession;
