import { Flex, Link, Image, Text, Divider } from "@chakra-ui/react";
import Logo from "./Logo";
import github from "../assets/github.png";

const PublicHeader = () => {
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" padding="0 20px">
        <Logo />

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

export default PublicHeader;
