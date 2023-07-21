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
  Flex,
  InputRightElement,
} from "@chakra-ui/react";

import hero from "../assets/hero.svg";
import color from "../styles/colors";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import useToastMessage from "../hooks/useToastMessage";
import { auth } from "../firebase/firebase";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { VentifyContext } from "../context/VentifyContextProvider";
import HowItWorks from "../components/HowItWorks";
import { login, registerUser } from "../helpers/login/loginHelpers";
import PublicHeader from "../components/PublicHeader";

const HomePage = () => {
  const [studentRollNo, setStudentRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);

  const [loginUiIsVisible, setLoginUiIsVisible] = useState(true);

  const [isRegisteringUser, setIsRegisteringUser] = useState(false);
  const [isLoginInUser, setIsLoginInUser] = useState(false);

  const { setLoggedInBatchYear } = useContext(VentifyContext);

  const { showToastMessage } = useToastMessage();
  const navigate = useNavigate();

  const userIsLoggedIn = auth.currentUser;

  return (
    <Box>
      <PublicHeader />

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
            {userIsLoggedIn ? (
              <Button
                colorScheme="purple"
                variant="solid"
                textTransform="capitalize"
                size="md"
                rightIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/confessions")}
              >
                already logged in
              </Button>
            ) : (
              <>
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
                    onClick={
                      loginUiIsVisible
                        ? () =>
                            login(
                              setIsLoginInUser,
                              password,
                              setLoggedInBatchYear,
                              showToastMessage,
                              navigate,
                              setStudentRollNo,
                              setPassword,
                              studentRollNo
                            )
                        : () =>
                            registerUser(
                              setIsRegisteringUser,
                              password,
                              setLoginUiIsVisible,
                              showToastMessage,
                              setStudentRollNo,
                              setPassword,
                              studentRollNo
                            )
                    }
                    isLoading={
                      loginUiIsVisible ? isLoginInUser : isRegisteringUser
                    }
                    loadingText={
                      loginUiIsVisible
                        ? "please wait"
                        : "sending verification link"
                    }
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
              </>
            )}
          </Box>
        </Center>
      </Flex>

      <HowItWorks />
    </Box>
  );
};

export default HomePage;
