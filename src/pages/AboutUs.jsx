import {
  Box,
  Flex,
  Text,
  CardBody,
  Image,
  Card,
  Stack,
  Button,
  Heading,
  Divider,
} from "@chakra-ui/react";
import logo from "../assets/logo.png";
import profile from "../assets/avtar.png";
import linkedin from "../assets/linkedInV.png";
import youtabe from "../assets/YouTube-logo.png";
import twitter from "../assets/twitterLogo.png";
import instagram from "../assets/instaLogo.png";
import facebook from "../assets/Facebook-logo.png";
import { AddIcon } from "@chakra-ui/icons";
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

const CardPage = ({ title, content, footer }) => {
  return (
    <Box>
      <Header />
      <Box>
        <Text
          fontSize="2.25rem"
          fontFamily="Rubik-400"
          fontWeight="600"
          color="#42526e"
          justifyContent="center"
          display="flex"
        >
          About Us
        </Text>
        <Box display="flex" justifyContent="center">
          <Flex justifyContent="center" spacing="5">
            <Card maxW="sm" m="20px 50px 20px 20px">
              <CardBody>
                <Image
                  src={profile}
                  alt="Green double couch with wooden legs"
                  borderRadius="50%"
                  margin="auto"
                  width="50%"
                />
                <Stack mt="6" spacing="2">
                  <Heading size="md">Savan Hapani</Heading>
                  <Text color="#6b778c">
                    Senior Software Developer At Rapidbox
                  </Text>
                  <Text color="#42526e">
                    I am an allround web developer. I am a senior programmer
                    with good knowledge of front-end techniques.
                  </Text>

                  <Flex
                    spacing="2"
                    justifyContent="space-between"
                    width="80%"
                    margin="20px 0px 0px 25px !important"
                  >
                    <Image
                      objectFit="contain"
                      src={linkedin}
                      alt="linkedin"
                      width="18vw"
                      minWidth="40px"
                      maxWidth="40px"
                    />
                    <Image
                      objectFit="contain"
                      src={youtabe}
                      alt="youtabe"
                      width="18vw"
                      minWidth="40px"
                      maxWidth="40px"
                    />
                    <Image
                      objectFit="contain"
                      src={twitter}
                      alt="twitter"
                      width="18vw"
                      minWidth="25px"
                      maxWidth="25px"
                    />
                    <Image
                      objectFit="contain"
                      src={instagram}
                      alt="instagram"
                      width="18vw"
                      minWidth="25px"
                      maxWidth="25px"
                    />
                    <Image
                      objectFit="contain"
                      src={facebook}
                      alt="facebook"
                      width="18vw"
                      minWidth="40px"
                      maxWidth="40px"
                    />
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
            <Card maxW="sm" m="20px">
              <CardBody>
                <Image
                  src={profile}
                  alt="Green double couch with wooden legs"
                  borderRadius="50%"
                  width="50%"
                  margin="auto"
                />
                <Stack mt="6" spacing="2">
                  <Heading size="md">Brijen Makwana</Heading>
                  <Text color="#6b778c">Marketing Manager At Uber</Text>
                  <Text color="#42526e">
                    I am an fullstack developer and by profession marketing
                    manger. I am programmer with passion good knowledge of
                    front-end.
                  </Text>

                  <Flex
                    spacing="2"
                    justifyContent="space-between"
                    width="80%"
                    margin="20px 0px 0px 25px !important"
                  >
                    <Image
                      objectFit="contain"
                      src={linkedin}
                      alt="linkedin"
                      width="18vw"
                      minWidth="40px"
                      maxWidth="40px"
                    />
                    <Image
                      objectFit="contain"
                      src={youtabe}
                      alt="youtabe"
                      width="18vw"
                      minWidth="40px"
                      maxWidth="40px"
                    />
                    <Image
                      objectFit="contain"
                      src={twitter}
                      alt="twitter"
                      width="18vw"
                      minWidth="25px"
                      maxWidth="25px"
                    />
                    <Image
                      objectFit="contain"
                      src={instagram}
                      alt="instagram"
                      width="18vw"
                      minWidth="25px"
                      maxWidth="25px"
                    />
                    <Image
                      objectFit="contain"
                      src={facebook}
                      alt="facebook"
                      width="18vw"
                      minWidth="40px"
                      maxWidth="40px"
                    />
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default CardPage;
