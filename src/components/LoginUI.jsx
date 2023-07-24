import {
  InputGroup,
  Input,
  InputRightAddon,
  Text,
  InputRightElement,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { VentifyContext } from "../context/VentifyContextProvider";
import color from "../styles/colors";
import { useNavigate } from "react-router-dom";
import {
  login,
  registerUser,
  resetPassword,
} from "../helpers/login/loginHelpers";
import useToastMessage from "../hooks/useToastMessage";

const LoginUI = (props) => {
  const { title, type } = props;

  const [studentRollNo, setStudentRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  const { setLoggedInBatchYear } = useContext(VentifyContext);

  const { showToastMessage } = useToastMessage();
  const navigate = useNavigate();

  const loginBtnConfig = {
    login: {
      isDisabled: !studentRollNo || !password,
      loadingText: "Please wait...",
      onClick: () =>
        login(
          setIsProcessing,
          password,
          setLoggedInBatchYear,
          showToastMessage,
          navigate,
          setStudentRollNo,
          setPassword,
          studentRollNo
        ),
    },
    register: {
      isDisabled: !studentRollNo || !password,
      loadingText: "Sending verification link",
      onClick: () =>
        registerUser(
          setIsProcessing,
          password,
          showToastMessage,
          setStudentRollNo,
          setPassword,
          studentRollNo
        ),
    },
    forgetPassword: {
      isDisabled: !studentRollNo,
      loadingText: "Sending password reset link",
      onClick: () =>
        resetPassword(setIsProcessing, showToastMessage, studentRollNo),
    },
  };

  return (
    <Box width="300px" padding="10px">
      <InputGroup size="md">
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

      {type !== "forgetPassword" && (
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
      )}

      <Button
        colorScheme="purple"
        width="100%"
        variant="solid"
        textTransform="capitalize"
        isDisabled={loginBtnConfig[type].isDisabled}
        size="md"
        marginTop="20px"
        onClick={loginBtnConfig[type].onClick}
        isLoading={isProcessing}
        loadingText={loginBtnConfig[type].loadingText}
      >
        {title}
      </Button>
    </Box>
  );
};

export default LoginUI;
