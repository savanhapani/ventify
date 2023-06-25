import { Flex } from "@chakra-ui/react";
import ReactionButton from "./ReactionButton";
import { availableReactions } from "../assets/data/data";

const ReactionsToConfession = (props) => {
  const { id, reactToConfession, reactions } = props;
  return (
    <Flex alignItems="center" justifyContent="space-around">
      {availableReactions.map((item) => (
        <ReactionButton
          {...item}
          key={item.id}
          id={id}
          reactToConfession={reactToConfession}
          reactionCount={reactions[item.title]}
        />
      ))}
    </Flex>
  );
};

export default ReactionsToConfession;
