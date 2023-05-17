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
import {
  HamburgerIcon,
  StarIcon,
  ChatIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";

const Confession = ({ confession }) => {
  return (
    <Card
      maxW="sm"
      colorScheme="blackAlpha"
      variant="elevated"
      backgroundColor="#fff"
    >
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Tag size="lg" variant="solid" backgroundColor="rgb(118,73,226)">
              2018
            </Tag>

            <Box>
              <Heading size="sm">Canteen</Heading>
              <Text>10m ago</Text>
            </Box>
          </Flex>
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

      <CardFooter justify="space-between" flexWrap="wrap">
        <Button flex="1" variant="ghost" leftIcon={<StarIcon />}>
          10 Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<ChatIcon />}>
          5 Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<ExternalLinkIcon />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Confession;
