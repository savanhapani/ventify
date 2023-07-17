import { Box, Flex, List } from "@chakra-ui/react";
import PublicHeader from "../components/PublicHeader";
import HelpSideBar from "../components/HelpSideBar";
import { useState } from "react";
import docs from "../assets/data/docs";
import HelpQuestion from "../components/HelpQuestion";

const HelpPage = () => {
  const [currentDocCategory, setCurrentDocCategory] = useState(0);
  return (
    <Box overflow="hidden" height="100vh">
      <PublicHeader />
      <Flex>
        <HelpSideBar setCurrentDocCategory={setCurrentDocCategory} />

        <List
          spacing={5}
          marginTop="20px"
          padding="0 100px"
          overflowY="auto"
          height="800px"
          paddingBottom="200px"
        >
          {docs[currentDocCategory].questions.map((question) => (
            <HelpQuestion key={question.id} {...question} />
          ))}
        </List>
      </Flex>
    </Box>
  );
};

export default HelpPage;
