import { Box, Heading, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

export default function FilterTags(props) {
  const { tags, selectedTags, handleSelection } = props;

  return (
    <>
      {tags.map((item) => {
        const tagIsSelected = selectedTags?.includes(item.title);

        return (
          <Tag
            size="md"
            key={item.id}
            borderRadius="full"
            variant={tagIsSelected ? "solid" : "outline"}
            colorScheme="purple"
            marginRight="10px"
            marginTop="10px"
            textTransform="capitalize"
            onClick={() => handleSelection(item.title)}
            cursor="pointer"
          >
            <TagLabel>{item.title}</TagLabel>
            {tagIsSelected && <TagCloseButton />}
          </Tag>
        );
      })}
    </>
  );
}
