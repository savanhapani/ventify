import {
  Box,
  Center,
  Heading,
  Image,
  Highlight,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import hero from "../assets/hero.svg";
import color from "../styles/colors";

import HowItWorks from "../components/HowItWorks";

import PublicHeader from "../components/PublicHeader";
import LoginUI from "../components/LoginUI";
import { availableLoginTabs } from "../assets/data/data";

const HomePage = () => {
  return (
    <Box>
      <PublicHeader />

      <Center marginTop="40px">
        <Heading
          as="h1"
          textTransform="capitalize"
          size="2xl"
          lineHeight="50px"
        >
          <Highlight
            query={["fear", "judgment"]}
            styles={{
              px: "5",
              py: "1",
              rounded: "full",
              bg: color.primary,
              color: "#fff",
            }}
          >
            Confess without fear, connect without judgment
          </Highlight>
        </Heading>
      </Center>

      <Flex justifyContent="space-between" marginTop="60px" alignItems="center">
        <Center flex="1">
          <Image objectFit="contain" src={hero} alt="ventify" width="500px" />
        </Center>

        <Center flex="1">
          <Tabs variant="solid-rounded" colorScheme="purple" height="300px">
            <TabList justifyContent="center">
              {availableLoginTabs.map((tab) => (
                <Tab
                  _selected={{
                    fontSize: "17px",
                    bg: color.primary,
                    color: "#fff",
                  }}
                  fontSize="13px"
                  textTransform="capitalize"
                  key={tab.id}
                >
                  {tab.title}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {availableLoginTabs.map((tab) => (
                <TabPanel key={tab.id}>
                  <LoginUI type={tab.value} title={tab.title} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Center>
      </Flex>

      <HowItWorks />
    </Box>
  );
};

export default HomePage;
