import { Box, Heading, Tag, TagLabel } from "@chakra-ui/react";

export default function FilterTags(props) {
  const { heading, tags } = props;

  return (
    <Box marginBottom="15px">
      <Heading as="h3" textTransform="capitalize" fontSize="md" color="#000">
        {heading}
      </Heading>

      <Box marginTop="10px">
        {tags.map((item) => (
          <Tag
            size="md"
            key={item.id}
            borderRadius="full"
            variant="outline"
            colorScheme="purple"
            marginRight="10px"
            marginTop="10px"
            textTransform="capitalize"
          >
            <TagLabel>{item.title}</TagLabel>
            {/* <TagCloseButton /> */}
          </Tag>
        ))}
      </Box>
    </Box>
  );
}
