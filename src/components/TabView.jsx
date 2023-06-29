import { TabPanel, Flex } from "@chakra-ui/react";

const TabView = ({ children }) => {
  return (
    <TabPanel>
      <Flex
        wrap="wrap"
        gap="5"
        justifyContent="center"
        overflow="auto"
        maxHeight="800px"
        paddingTop="30px"
        paddingBottom="300px"
      >
        {children}
      </Flex>
    </TabPanel>
  );
};

export default TabView;
