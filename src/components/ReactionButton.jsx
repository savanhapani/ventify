import { Button, Image, Tooltip } from "@chakra-ui/react";
import color from "../styles/colors";

const ReactionButton = (props) => {
  const { title, image } = props;
  return (
    <Tooltip
      hasArrow
      label={title}
      colorScheme="purple"
      fontSize="sm"
      placement="top"
      textTransform="capitalize"
      bg={color.primary}
      color="#fff"
    >
      <Button variant="ghost" colorScheme="purple">
        <Image
          boxSize="30px"
          src={image}
          alt={title}
          objectFit="contain"
          aspectRatio="1"
        />
      </Button>
    </Tooltip>
  );
};

export default ReactionButton;
