import { Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <Image
      objectFit="contain"
      src={logo}
      alt="Ventify"
      width="14vw"
      minWidth="100px"
      maxWidth="220px"
    />
  );
};

export default Logo;
