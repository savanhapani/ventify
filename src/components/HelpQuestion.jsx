import { Box, Heading, List, ListItem, ListIcon } from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";
import color from "../styles/colors";

const HelpQuestion = (props) => {
  const { title, description } = props;
  return (
    <Box>
      <Heading as="h2" color={color.primary} fontSize="xl">
        {title}
      </Heading>

      <List spacing={3} marginTop="10px" marginLeft="15px">
        {description?.map((description) => (
          <ListItem key={description}>
            <ListIcon as={MinusIcon} color={color.primary} />

            {description}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default HelpQuestion;
