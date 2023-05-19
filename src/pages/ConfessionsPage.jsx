import {
  Flex,
  Container,
  Box,
  Image,
  Button,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { confessions } from "../assets/data/data";
import Confession from "../components/Confession";
import logo from "../assets/logo.png";
import { AddIcon } from "@chakra-ui/icons";
import CreateConfess from "../components/CreateConfess";
import { useState } from "react";

const Header = (props) => {
  const { onOpen } = props;
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Image
          objectFit="contain"
          src={logo}
          alt="Ventify"
          width="18vw"
          minWidth="200px"
          maxWidth="300px"
          marginLeft="10px"
        />
        <Button
          textTransform="capitalize"
          variant="solid"
          size="md"
          colorScheme="purple"
          marginRight="20px"
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

function ConfessionsPage() {
  const [confession, setConfession] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Header onOpen={onOpen} />
      <Container
        maxW="90vw"
        centerContent
        marginTop="60px"
        marginBottom="100px"
      >
        <Flex wrap="wrap" gap="5" justifyContent="center">
          {confessions.map((item) => (
            <Confession {...item} key={item.id} />
          ))}
        </Flex>
      </Container>
      <CreateConfess
        isOpen={isOpen}
        onClose={onClose}
        confession={confession}
        setConfession={setConfession}
      />
    </Box>
  );
}

export default ConfessionsPage;
