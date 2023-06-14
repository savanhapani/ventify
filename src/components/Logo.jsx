import { Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <Image
      objectFit="contain"
      src={logo}
      alt="Ventify"
      width="13vw"
      minWidth="100px"
      maxWidth="200px"
    />
  );
};

export default Logo;
