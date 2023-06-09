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
  Divider,
  Flex,
  Link,
  InputRightElement,
} from "@chakra-ui/react";
import logo from "../assets/logo.png";
import hero from "../assets/hero.svg";
import github from "../assets/github.png";
import { howItWorks } from "../assets/data/data";
import color from "../styles/colors";
import { useNavigate } from "react-router";
import { useState } from "react";
import useToastMessage from "../hooks/useToastMessage";
import {} from "../firebase/firebase";

const Header = () => {
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" padding="0 20px">
        <Image
          objectFit="contain"
          src={logo}
          alt="Ventify"
          width="18vw"
          minWidth="200px"
          maxWidth="300px"
        />

        <Link href="https://github.com/BrijenMakwana/ventify" isExternal>
          <Flex
            alignItems="center"
            backgroundColor="blackAlpha.100"
            padding="5px 10px"
            borderRadius="30px"
          >
            <Image
              objectFit="contain"
              src={github}
              alt="git"
              width="35px"
              aspectRatio="1"
            />
            <Text textTransform="capitalize" marginLeft="10px" fontSize="sm">
              view code
            </Text>
          </Flex>
        </Link>
      </Flex>
      <Divider orientation="horizontal" />
    </>
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
        width="70vw"
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

const HomePage = () => {
  const [studentRollNo, setStudentRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);

  const [loginUiIsVisible, setLoginUiIsVisible] = useState(true);

  const { showToastMessage } = useToastMessage();
  const navigate = useNavigate();

  const login = () => {
    const userEmail = `${studentRollNo}@daiict.ac.in`;

    showToastMessage(
      "Link Sent",
      `We have sent you the login link at ${userEmail}. Please check your inbox.`,
      "success",
      "purple"
    );
    navigate("/confessions");
  };
  return (
    <Box>
      <Header />

      <Center marginTop="40px">
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

      <Flex justifyContent="space-between" marginTop="60px" alignItems="center">
        <Center flex="1">
          <Image objectFit="contain" src={hero} alt="ventify" width="500px" />
        </Center>

        <Center flex="1">
          <Box width="300px" padding="10px">
            <Heading
              as="h2"
              textTransform="capitalize"
              fontSize="3xl"
              textAlign="center"
            >
              {loginUiIsVisible ? "login" : "register"}
            </Heading>

            <InputGroup size="md" marginTop="20px">
              <Input
                placeholder="e.g. 201812010"
                focusBorderColor={color.primary}
                variant="outline"
                type="number"
                autoFocus
                onChange={(e) => setStudentRollNo(e.target.value)}
                value={studentRollNo}
              />

              <InputRightAddon>
                <Text>@daiict.ac.in</Text>
              </InputRightAddon>
            </InputGroup>

            <InputGroup size="md" marginTop="20px">
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                focusBorderColor={color.primary}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowpassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Box marginTop="20px" display="flex" flexDirection="column">
              <Button
                colorScheme="purple"
                variant="solid"
                textTransform="capitalize"
                isDisabled={!studentRollNo || !password}
                size="md"
                onClick={login}
              >
                {loginUiIsVisible ? "login" : "register"}
              </Button>

              <Button
                colorScheme="purple"
                variant="link"
                size="sm"
                marginTop="10px"
                onClick={() => setLoginUiIsVisible((prev) => !prev)}
              >
                {loginUiIsVisible ? "new here?" : "go back to login"}
              </Button>
            </Box>
          </Box>
        </Center>
      </Flex>

      <HowItWorks />
    </Box>
  );
};

export default HomePage;
