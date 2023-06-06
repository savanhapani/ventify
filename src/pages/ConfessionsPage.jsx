import {
  Flex,
  Box,
  Image,
  Button,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { confessCategories } from "../assets/data/data";
import Confession from "../components/Confession";
import logo from "../assets/logo.png";
import { AddIcon } from "@chakra-ui/icons";
import CreateConfess from "../components/CreateConfess";
import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import DeleteConfess from "../components/DeleteConfess";
import ReportConfess from "../components/ReportConfess";
import useToastMessage from "../hooks/useToastMessage";
import {
  collection,
  addDoc,
  db,
  getDocs,
  query,
  where,
  or,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "../firebase/firebase";

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
  const [commentIsDisabled, setCommentIsDisabled] = useState(false);

  const [isConfessing, setIsConfessing] = useState(false);
  const { showToastMessage } = useToastMessage();
  const [confessionToBeDelete, setConfessionToBeDelete] = useState({});
  const [confessionToBeReport, setConfessionToBeReport] = useState({});

  const [confessions, setConfessions] = useState([]);

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
    setConfessionCategory(confessCategories[0].title);
    setIsVisibleToBatchOnly(false);
    setCommentIsDisabled(false);
    setIsConfessing(false);
    onCreateConfessClose();
  };

  const handleCategoryChange = (event) => {
    setConfessionCategory(event.target.value);
  };

  const handleIsVisibleToBatchOnlyChange = (event) => {
    setIsVisibleToBatchOnly(event.target.checked);
  };

  const handleCommentIsDisabledChange = (event) => {
    setCommentIsDisabled(event.target.checked);
  };

  const createConfession = async () => {
    setIsConfessing(true);

    const confessionObj = {
      confession: confession,
      category: confessionCategory,
      batchYear: batchYear,
      isVisibleToBatchOnly: isVisibleToBatchOnly,
      commentIsDisabled: commentIsDisabled,
      timeStamp: new Date(),
      comments: [],
      reports: [],
    };

    try {
      const confessionRef = await addDoc(
        collection(db, "confessions"),
        confessionObj
      );
      const deletionCode = confessionRef.id;
      navigator.clipboard.writeText(deletionCode);

      showToastMessage(
        "Congratulations",
        `You have confessed succesfully!! The deletion code for this confession is ${deletionCode} and copied to clipboard.`,
        "success",
        "purple"
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    resetConfession();

    getConfessions();
  };

  const deleteConfession = async (confessionDeletionCode) => {
    if (confessionDeletionCode != confessionToBeDelete.id) {
      onDeleteConfessClose();
      showToastMessage(
        "Error",
        "The deletion code you have entered is incorrect!!",
        "warning",
        "yellow"
      );
      setConfessionToBeDelete({});
      return;
    }
    onDeleteConfessClose();

    await deleteDoc(doc(db, "confessions", confessionDeletionCode));

    showToastMessage(
      "Deleted",
      "Confession is successfully deleted",
      "success",
      "purple"
    );
    setConfessionToBeDelete({});
    getConfessions();
  };

  const reportConfession = async (confessionId, reasonToReport) => {
    const confessionRef = doc(db, "confessions", confessionId);

    const reportObj = {
      batchYear: 2018,
      reasonToReport: reasonToReport,
    };
    try {
      await updateDoc(confessionRef, {
        reports: arrayUnion(reportObj),
      });
      onReportConfessClose();

      showToastMessage(
        "Reported",
        "We will look into it!",
        "success",
        "purple"
      );
    } catch {
      showToastMessage("Error", "Try again later!", "error", "red");
    }

    setConfessionToBeReport({});
  };

  const getConfessions = async () => {
    const confessionsRef = collection(db, "confessions");

    const confessionsQuery = query(
      confessionsRef,
      or(
        where("isVisibleToBatchOnly", "==", false),
        where("batchYear", "==", 2018)
      )
    );

    const querySnapshot = await getDocs(confessionsQuery);
    const confessionsData = [];
    querySnapshot.forEach((doc) => {
      confessionsData.push({ id: doc.id, ...doc.data() });
    });
    setConfessions(confessionsData);
  };

  useEffect(() => {
    getConfessions();
  }, []);

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
          flex="1"
        >
          {confessions.map((item) => (
            <Confession
              {...item}
              key={item.id}
              onDeleteConfessOpen={onDeleteConfessOpen}
              setConfessionToBeDelete={setConfessionToBeDelete}
              onReportConfessOpen={onReportConfessOpen}
              setConfessionToBeReport={setConfessionToBeReport}
              getConfessions={getConfessions}
            />
          ))}
        </Flex>
      </Flex>
      <CreateConfess
        isCreateConfessOpen={isCreateConfessOpen}
        createConfession={createConfession}
        handleCategoryChange={handleCategoryChange}
        handleIsVisibleToBatchOnlyChange={handleIsVisibleToBatchOnlyChange}
        handleCommentIsDisabledChange={handleCommentIsDisabledChange}
        confession={confession}
        setConfession={setConfession}
        confessionCategory={confessionCategory}
        isVisibleToBatchOnly={isVisibleToBatchOnly}
        commentIsDisabled={commentIsDisabled}
        isConfessing={isConfessing}
        resetConfession={resetConfession}
      />
      <DeleteConfess
        isDeleteConfessOpen={isDeleteConfessOpen}
        onDeleteConfessClose={onDeleteConfessClose}
        confessionToBeDelete={confessionToBeDelete}
        deleteConfession={deleteConfession}
      />

      <ReportConfess
        isReportConfessOpen={isReportConfessOpen}
        onReportConfessClose={onReportConfessClose}
        confessionToBeReport={confessionToBeReport}
        reportConfession={reportConfession}
      />
    </Box>
  );
};

export default ConfessionsPage;
