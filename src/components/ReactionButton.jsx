import { IconButton, Tooltip } from "@chakra-ui/react";
import color from "../styles/colors";

const ReactionButton = (props) => {
  const { title, icon } = props;
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
      <IconButton
        variant="ghost"
        aria-label={title}
        fontSize="21px"
        icon={icon}
        colorScheme="blackAlpha"
        _hover={{
          color: color.primary,
        }}
      />
    </Tooltip>
  );
};

export default ReactionButton;
