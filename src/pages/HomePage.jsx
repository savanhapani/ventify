import {
  Box,
  Center,
  Heading,
  Image,
  InputGroup,
  InputRightAddon,
  Input,
  Text,
  Button,
  Highlight,
  Card,
  CardBody,
  Stack,
  VStack,
  useToast,
} from "@chakra-ui/react";
import logo from "../assets/logo.png";
import hero from "../assets/hero.svg";
import { howItWorks } from "../assets/data/data";
import color from "../styles/colors";

const Header = () => {
  return (
    <Box>
      <Image
        objectFit="contain"
        src={logo}
        alt="Ventify"
        width="20vw"
        minWidth="200px"
        marginLeft="10px"
      />
    </Box>
  );
};

const HowItWork = (props) => {
  const { title, description, image } = props;
  return (
    <Center>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="filled"
        padding="30px 70px"
        marginTop="50px"
        width="60vw"
      >
        <Image
          objectFit="contain"
          src={image}
          alt="ventify"
          width="150px"
          aspectRatio="1"
        />

        <Stack marginLeft="25px">
          <CardBody>
            <Heading size="md" textTransform="capitalize">
              {title}
            </Heading>

            <Text py="2">{description}</Text>
          </CardBody>
        </Stack>
      </Card>
    </Center>
  );
};

const HowItWorks = () => {
  return (
    <VStack margin="200px 0">
      <Heading
        as="h2"
        size="2xl"
        textTransform="capitalize"
        textAlign="center"
        marginBottom="50px"
      >
        how it works
      </Heading>

      <VStack>
        {howItWorks.map((item) => (
          <HowItWork {...item} key={item.id} />
        ))}
      </VStack>
    </VStack>
  );
};

export default function HomePage() {
  const toast = useToast();

  const getLoginLink = () => {
    // login
    toast({
      title: "Link Sent",
      description: "We sent you the login link, check your inbox.",
      status: "success",
      duration: 5000,
      isClosable: true,
      variant: "solid",
      colorScheme: "purple",
      position: "bottom",
    });
  };
  return (
    <Box>
      <Header />

      <Center marginTop="50px">
        <Heading
          as="h1"
          textTransform="capitalize"
          size="2xl"
          lineHeight="50px"
        >
          <Highlight
            query={["fear", "judgment"]}
            styles={{
              px: "5",
              py: "1",
              rounded: "full",
              bg: color.primary,
              color: "#fff",
            }}
          >
            Confess without fear, connect without judgment
          </Highlight>
        </Heading>
      </Center>

      <Center marginTop="70px">
        <InputGroup size="md" width="fit-content">
          <Input
            placeholder="e.g. 201812010"
            focusBorderColor={color.primary}
            variant="outline"
            type="number"
            autoFocus
          />
          <InputRightAddon paddingRight="0">
            <Text>@daiict.ac.in</Text>
            <Button
              textTransform="capitalize"
              variant="solid"
              width="140px"
              backgroundColor={color.primary}
              color="#fff"
              marginLeft="15px"
              onClick={getLoginLink}
              borderTopLeftRadius="0"
              borderBottomLeftRadius="0"
              isLoading={false}
              loadingText="sending link"
              _hover={{
                bg: color.hover,
                color: "#fff",
              }}
            >
              get login link
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Center>

      <Center marginTop="50px">
        <Image objectFit="contain" src={hero} alt="ventify" width="500px" />
      </Center>

      <HowItWorks />
    </Box>
  );
}
