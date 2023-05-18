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
} from "@chakra-ui/react";
import { HamburgerIcon, StarIcon, ChatIcon } from "@chakra-ui/icons";
import color from "../styles/colors";
import Comment from "./Comment";

const Confession = (props) => {
  const { confession, category, comments } = props;

  const visibleComments = comments?.slice(0, 3);

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
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Button flex="1" variant="ghost" leftIcon={<StarIcon />}>
            10 Like
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<ChatIcon />}>
            5 Comment
          </Button>
        </Flex>

        {comments?.length > 0 && (
          <Box>
            {visibleComments.map((item) => (
              <Comment {...item} key={item.id} />
            ))}

            <Button
              colorScheme="purple"
              variant="link"
              textTransform="capitalize"
              size="sm"
              marginTop="20px"
            >
              view all comments
            </Button>
          </Box>
        )}
      </CardFooter>
    </Card>
  );
};

export default Confession;
