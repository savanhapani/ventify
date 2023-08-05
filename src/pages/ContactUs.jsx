import {
  Box,
  Flex,
  Image,
  Button,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";
import logo from "../assets/logo.png";
import color from "../styles/colors";
import emailImageventify from "../assets/undraw_messenger_re_8bky.svg";
import { contactUsReason } from "../assets/data/data";
import { AddIcon } from "@chakra-ui/icons";
import { Form } from "react-router-dom";
import React, { useState } from "react";
import emailjs from '@emailjs/browser'
import useToastMessage from "../hooks/useToastMessage";

const Header = (props) => {
  const { onOpen } = props;
  
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
        <Button
          textTransform="capitalize"
          variant="solid"
          size="md"
          colorScheme="purple"
          borderRadius="50px"
          rightIcon={<AddIcon boxSize="13px" />}
          onClick={onOpen}
        >
          confess
        </Button>
      </Flex>
      <Divider orientation="horizontal" />
    </>
  );
};

const ContactUsPage = ({ title, content, footer }) => {
  const initialFormData = Object.freeze({
    email: "",
    reason: "",
    description: "",
  });
  const [formData, updateFormData] = React.useState(initialFormData);
  const { showToastMessage } = useToastMessage();
  const [emailError, setEmailError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const handleChange = (e) => {
    console.log(e.target.name);
 
  if(e.target.name === "email"){
    if (!isValidEmail(e.target.value)) {
      setEmailError('Please Enter Valid Email');
      return;
    }
    else
    {
      setEmailError(null)
    }
  }
  else if(e.target.name === "description")
  {
    if (e.target.value.length > 700) {
      setDescriptionError('Description Should Be Less Than 700 Character');
      return;
    }
    else
    {
      setDescriptionError(null)
    }
  
  }
 updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  
  };
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if(emailError === null && descriptionError === null){
    emailjs.send('service_rwrefbp','template_nizf058',formData,'tm8pUKYzm93m_Ymgu').then((result) => {
      console.log(result.text);
      showToastMessage(
        "success",
        "Your request has been sent successfully!!",
        "success",
        "purple"
      );
  }, (error) => {
      console.log(error.text);
  });
  }
    // ... submit to API or something
  };
  return (
    <Box>
      <Header />
      <Box padding="15px">
        <Text
          fontSize="2.25rem"
          fontFamily="unset"
          fontWeight="600"
          justifyContent="center"
          display="flex"
        >
          HAVE SOME QUESTIONS?
        </Text>
        <Box
          maxW="85%"
          background="white"
          padding="20px 15px 15px 15px"
          margin="auto"
          borderRadius="20px 20px 0px 0px"
          mt="10px"
          boxShadow="0 0 20px #ccc"
        >
          <Flex flexWrap="wrap" justifyContent="center">
            <Image w="70vh" src={emailImageventify} />
            <Box w="70vh" mt="3%" ml="5%">
              <Form method="post">
                <FormControl isRequired mb="10px">
                  <FormLabel>Email :</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Email Address"
                    name="email"
                    onChange={handleChange}
                    focusBorderColor={color.primary}
                  />
                  {emailError && <h2 style={{color: 'red'}}>{emailError}</h2>}

                  {/*  <FormHelperText>Enter Email Address</FormHelperText> */}
                </FormControl>
                <FormControl mb="15px">
                  <Box marginTop="15px">
                    <FormLabel>Select Reason :</FormLabel>
                    <Select
                      placeholder="Select Here"
                      focusBorderColor={color.primary}
                      variant="filled"
                      name="reason"
                      textTransform="capitalize"
                      marginTop="15px"
                      size="md"
                      onChange={handleChange}
                    >
                      {contactUsReason.map((item) => (
                        <option value={item.reason} key={item.id}>
                          {item.reason}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </FormControl>
                <FormControl isRequired mb="10px" mt="10px">
                  <FormLabel>Your Question :</FormLabel>
                  <Textarea
                    type="text"
                    name="description"
                    focusBorderColor={color.primary}
                    placeholder="Your question...."
                    onChange={handleChange}
                  />
                {descriptionError && <h2 style={{color: 'red'}}>{descriptionError}</h2>}    
                  {/*  <FormHelperText>Enter Email Address</FormHelperText> */}
                </FormControl>
                <Flex justifyContent="center">
                  <Button
                    type="submit"
                    textTransform="capitalize"
                    variant="solid"
                    colorScheme="purple"
                    background={color.primary}
                    color="white"
                    width="80%"
                    mt="20px"
                    mb="20px"
                    isDisabled={formData.email === "" || formData.description === ""}
                    onClick={handleSubmit}
                  >
                    Send Message
                  </Button>
                </Flex>
              </Form>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUsPage;
