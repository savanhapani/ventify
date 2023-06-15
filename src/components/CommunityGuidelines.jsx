import { List, ListItem, ListIcon, Heading, Box } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { communityGuidelines } from "../assets/data/data";
import color from "../styles/colors";

const CommunityGuidelines = () => {
  return (
    <Box margin="10px 0">
      <Heading as="h3" textTransform="capitalize" fontSize="16px">
        community guidelines
      </Heading>
      <List spacing={3} marginTop="10px">
        {communityGuidelines.map((item) => (
          <ListItem key={item.id}>
            <ListIcon as={CheckCircleIcon} color={color.primary} />
            {item.title}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommunityGuidelines;
