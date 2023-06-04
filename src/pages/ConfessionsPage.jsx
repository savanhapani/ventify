import {
  Flex,
  Box,
  Image,
  Button,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { confessCategories, confessions } from "../assets/data/data";
import Confession from "../components/Confession";
import logo from "../assets/logo.png";
import { AddIcon } from "@chakra-ui/icons";
import CreateConfess from "../components/CreateConfess";
import { useState } from "react";
import FilterBar from "../components/FilterBar";
import DeleteConfess from "../components/DeleteConfess";
import ReportConfess from "../components/ReportConfess";
import useToastMessage from "../hooks/useToastMessage";
import { collection, addDoc, db } from "../firebase/firebase";

const Header = (props) => {
  const { onOpen } = props;
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" padding="0 20px">
        <Image
          objectFit="contain"
          src={logo}
          alt="Ventify"
          width="18vw"
          minWidth="200px"
          maxWidth="300px"
        />
        <Button
          textTransform="capitalize"
          variant="solid"
          size="md"
          colorScheme="purple"
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

const ConfessionsPage = () => {
  const batchYear = 2018;
  const [confession, setConfession] = useState("");
  const [confessionCategory, setConfessionCategory] = useState(
    confessCategories[0].title
  );
  const [isVisibleToBatchOnly, setIsVisibleToBatchOnly] = useState(false);
  const [isConfessing, setIsConfessing] = useState(false);
  const { showToastMessage } = useToastMessage();
  const [confessionToBeDelete, setConfessionToBeDelete] = useState("");
  const [confessionToBeReport, setConfessionToBeReport] = useState("");

  const {
    isOpen: isCreateConfessOpen,
    onOpen: onCreateConfessOpen,
    onClose: onCreateConfessClose,
  } = useDisclosure();

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

  const resetConfession = () => {
    setConfession("");
    setConfessionCategory("");
    setIsVisibleToBatchOnly(false);
    setIsConfessing(false);
    onCreateConfessClose();
  };

  const handleCategoryChange = (event) => {
    setConfessionCategory(event.target.value);
  };

  const handleIsVisibleToBatchOnlyChange = (event) => {
    setIsVisibleToBatchOnly(event.target.checked);
  };

  const createConfession = async () => {
    setIsConfessing(true);

    const confessionObj = {
      confession: confession,
      category: confessionCategory,
      batchYear: batchYear,
      isVisibleToBatchOnly: isVisibleToBatchOnly,
      comments: [],
      reports: [],
    };

    try {
      await addDoc(collection(db, "confessions"), confessionObj);

      showToastMessage(
        "Congratulations",
        "You have confessed succesfully!!",
        "success",
        "purple"
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    resetConfession();
  };

  return (
    <Box overflow="hidden" height="100vh">
      <Header onOpen={onCreateConfessOpen} />
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
                onReportConfessOpen={onReportConfessOpen}
                setConfessionToBeReport={setConfessionToBeReport}
              />
            ))}
        </Flex>
      </Flex>
      <CreateConfess
        isCreateConfessOpen={isCreateConfessOpen}
        createConfession={createConfession}
        handleCategoryChange={handleCategoryChange}
        handleIsVisibleToBatchOnlyChange={handleIsVisibleToBatchOnlyChange}
        confession={confession}
        setConfession={setConfession}
        confessionCategory={confessionCategory}
        isVisibleToBatchOnly={isVisibleToBatchOnly}
        isConfessing={isConfessing}
        resetConfession={resetConfession}
      />
      <DeleteConfess
        isDeleteConfessOpen={isDeleteConfessOpen}
        onDeleteConfessClose={onDeleteConfessClose}
        confessionToBeDelete={confessionToBeDelete}
      />

      <ReportConfess
        isReportConfessOpen={isReportConfessOpen}
        onReportConfessClose={onReportConfessClose}
        confessionToBeReport={confessionToBeReport}
      />
    </Box>
  );
};

export default ConfessionsPage;
