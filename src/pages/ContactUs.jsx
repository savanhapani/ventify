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
  //import emailjs from '@emailjs/browser'
  import useToastMessage from "../hooks/useToastMessage";
  const DESCRIPTION_CHAR_LIMIT = 700;
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
  
  const ContactUsPage = () => {
  
    const { showToastMessage } = useToastMessage();
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [reason, setReason] = useState("");  
  
    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }
    
    const submitFormData = (e) => {
      e.preventDefault();
       let formData = {
          email:email,
          description:description,
          reason:reason
        }
        console.log(formData)
      if(isValidEmail(email)){
      // ... submit to API or something
     }    
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
                      focusBorderColor={color.primary}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    {!isValidEmail(email) && <h2 style={{color: 'red'}}>Please Enter Valid Email</h2>}
  
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
                        onChange={(e) => setReason(e.target.value)}
                        value={reason}
                      >
                        {contactUsReason.map((item) => (
                          <option value={item.reason} key={item.id}>
                            {item.reason}
                          </option>
                        ))}
                      </Select>
                    </Box>
                  </FormControl>
                  <Box>
                  <FormControl isRequired mb="10px" mt="10px">
                    <FormLabel>Your Question :</FormLabel>
                    <Textarea
                      type="text"
                      name="description"
                      focusBorderColor={color.primary}
                      maxLength={700}
                      placeholder="Your question...."
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  <FormHelperText>
                  {description.length}/{DESCRIPTION_CHAR_LIMIT}
                </FormHelperText>
                  </FormControl>
                  </Box>
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
                      isDisabled={email === "" || description === ""}
                      onClick={submitFormData}
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
  