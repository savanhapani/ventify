import {
  Flex,
  Box,
  Image,
  Button,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { confessions } from "../assets/data/data";
import Confession from "../components/Confession";
import logo from "../assets/logo.png";
import { AddIcon } from "@chakra-ui/icons";
import CreateConfess from "../components/CreateConfess";
import { useState } from "react";
import FilterBar from "../components/FilterBar";
import DeleteConfess from "../components/DeleteConfess";
import ReportConfess from "../components/ReportConfess";

const Header = (props) => {
  const { onOpen } = props;
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Image
          objectFit="contain"
          src={logo}
          alt="Ventify"
          width="18vw"
          minWidth="200px"
          maxWidth="300px"
          marginLeft="10px"
        />
        <Button
          textTransform="capitalize"
          variant="solid"
          size="md"
          colorScheme="purple"
          marginRight="20px"
          borderRadius="50px"
          rightIcon={<AddIcon boxSize="13px" />}
          onClick={onOpen}
        >
          confess
        </Button>
      </Flex>
      <Divider orientation="horizontal" />
    </>
  );
};

function ConfessionsPage() {
  const [confession, setConfession] = useState("");
  const [confessionToBeDelete, setConfessionToBeDelete] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isDeleteConfessOpen,
    onOpen: onDeleteConfessOpen,
    onClose: onDeleteConfessClose,
  } = useDisclosure();

  const {
    isOpen: isReportConfessOpen,
    onOpen: onReportConfessOpen,
    onClose: onReportConfessClose,
  } = useDisclosure();

  return (
    <Box overflow="hidden" height="100vh">
      <Header onOpen={onOpen} />
      <Flex>
        <FilterBar />
        <Flex
          wrap="wrap"
          gap="5"
          justifyContent="center"
          overflow="auto"
          maxHeight="800px"
          paddingTop="50px"
          paddingBottom="300px"
          paddingLeft="30px"
        >
          {confessions
            .filter(
              (item) => !item.isVisibleToBatchOnly || item.batchYear === 2018
            )
            .map((item) => (
              <Confession
                {...item}
                key={item.id}
                onDeleteConfessOpen={onDeleteConfessOpen}
                setConfessionToBeDelete={setConfessionToBeDelete}
                confessionToBeDelete={confessionToBeDelete}
                onReportConfessOpen={onReportConfessOpen}
              />
            ))}
        </Flex>
      </Flex>
      <CreateConfess
        isOpen={isOpen}
        onClose={onClose}
        confession={confession}
        setConfession={setConfession}
      />
      <DeleteConfess
        isDeleteConfessOpen={isDeleteConfessOpen}
        onDeleteConfessClose={onDeleteConfessClose}
        confessionToBeDelete={confessionToBeDelete}
      />

      <ReportConfess
        isReportConfessOpen={isReportConfessOpen}
        onReportConfessClose={onReportConfessClose}
      />
    </Box>
  );
}

export default ConfessionsPage;
