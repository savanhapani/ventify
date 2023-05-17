import { Flex, Container } from "@chakra-ui/react";
import { confessions } from "../assets/data/data";
import Confession from "../components/Confession";

function ConfessionsPage() {
  return (
    <Container maxW="70vw" centerContent>
      <Flex wrap="wrap" gap="5" justifyContent="center">
        {confessions.map((item) => (
          <Confession {...item} key={item.id} />
        ))}
      </Flex>
    </Container>
  );
}

export default ConfessionsPage;
