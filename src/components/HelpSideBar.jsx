import {
  Card,
  CardBody,
  Accordion,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import docs from "../assets/data/docs";
import HelpAccordion from "./HelpAccordion";
import { DragControls } from "framer-motion";

const HelpSideBar = (props) => {
  const { setCurrentDocCategory } = props;

  return (
    <Card
      marginTop="5px"
      marginLeft="5px"
      height="fit-content"
      variant="elevated"
      minWidth="420px"
    >
      <CardHeader>
        <Heading as="h1" textTransform="capitalize" fontSize="18px">
          topics
        </Heading>
      </CardHeader>
      <CardBody>
        <Accordion defaultIndex={[0]}>
          {docs.map((doc, index) => (
            <HelpAccordion
              key={DragControls.id}
              {...doc}
              setCurrentDocCategory={setCurrentDocCategory}
              index={index}
            />
          ))}
        </Accordion>
      </CardBody>
    </Card>
  );
};

export default HelpSideBar;
