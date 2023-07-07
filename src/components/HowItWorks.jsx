import { VStack, Heading } from "@chakra-ui/react";
import { howItWorks } from "../assets/data/data";
import HowItWork from "./HowItWork";

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

export default HowItWorks;
