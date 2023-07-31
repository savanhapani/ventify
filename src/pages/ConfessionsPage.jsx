import {
  Flex,
  Box,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
} from "@chakra-ui/react";
import { availableTabs } from "../assets/data/data";
import Confession from "../components/Confession";

import { useState, useEffect, useContext } from "react";
import FilterBar from "../components/FilterBar";

import useToastMessage from "../hooks/useToastMessage";
import {
  db,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  sendPasswordResetEmail,
  signOut,
  auth,
  increment,
  getDoc,
  collection,
  query,
  or,
  where,
  getDocs,
} from "../firebase/firebase";

import { VentifyContext } from "../context/VentifyContextProvider";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import CreationModal from "../components/CreationModal";
import AccountDrawer from "../components/AccountDrawer";
import PasswordResetDialog from "../components/PasswordResetDialog";

import VoteStatsModal from "../components/VoteStatsModal";
import DeleteConfess from "../components/DeleteConfess";
import ReportConfess from "../components/ReportConfess";

import LoadindSpinner from "../components/LoadingSpinner";
import ProtectedHeader from "../components/ProtectedHeader";
import AppliedFiltersHeading from "../components/AppliedFiltersHeading";
import {
  COMMENT_ADD_ERROR,
  CONFESSIONS_FETCH_ERROR,
  INCORRECT_DELETION_CODE,
  REPORTING_ERROR,
} from "../errors/errors";

import ErrorPage from "./ErrorPage";

const ConfessionsPage = () => {
  const { showToastMessage } = useToastMessage();
  const [confessionToBeDelete, setConfessionToBeDelete] = useState({});
  const [confessionToBeReport, setConfessionToBeReport] = useState({});

  const [confessions, setConfessions] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [showBatchExclusiveConfessions, setShowBatchExclusiveConfessions] =
    useState(false);

  const [creationModalType, setCreationModalType] = useState("confession");

  const navigate = useNavigate();

  const { loggedInBatchYear } = useContext(VentifyContext);

  const [passwordIsResetting, setPasswordIsResetting] = useState(false);

  const [selectedPoll, setSelectedPoll] = useState({});

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

  const {
    isOpen: isAccountDrawerOpen,
    onOpen: onAccountDrawerOpen,
    onClose: onAccountDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isPasswordResetDialogOpen,
    onOpen: onPasswordResetDialogOpen,
    onClose: onPasswordResetDialogClose,
  } = useDisclosure();

  const {
    isOpen: isVoteStatsModalOpen,
    onOpen: onVoteStatsModalOpen,
    onClose: onVoteStatsModalClose,
  } = useDisclosure();

  const getConfessions = async () => {
    try {
      const confessionsRef = collection(db, "confessions");

      const confessionsQuery = query(
        confessionsRef,
        or(
          where("isVisibleToBatchOnly", "==", false),
          where("batchYear", "==", Number(loggedInBatchYear))
        )
      );

      const querySnapshot = await getDocs(confessionsQuery);
      const confessionsData = [];
      querySnapshot.forEach((doc) => {
        confessionsData.push({ id: doc.id, ...doc.data() });
      });
      setConfessions(confessionsData);
    } catch (error) {
      showToastMessage("Error", CONFESSIONS_FETCH_ERROR, "error");
    }
  };

  const openCreationModal = (type) => {
    setCreationModalType(type);
    onCreateConfessOpen();
  };

  const deleteConfession = async (confessionDeletionCode) => {
    try {
      if (confessionDeletionCode != confessionToBeDelete.id) {
        throw new Error(INCORRECT_DELETION_CODE);
      }

      await deleteDoc(doc(db, "confessions", confessionDeletionCode));

      showToastMessage(
        "Deleted",
        "Confession is successfully deleted.",
        "success"
      );
      getConfessions();
    } catch (error) {
      showToastMessage("Error", error.message, "error");
    } finally {
      onDeleteConfessClose();

      setConfessionToBeDelete({});
    }
  };

  const reportConfession = async (confessionId, reasonToReport) => {
    const confessionRef = doc(db, "confessions", confessionId);

    const reportObj = {
      batchYear: Number(loggedInBatchYear),
      reasonToReport: reasonToReport,
      timeStamp: new Date(),
    };

    try {
      await updateDoc(confessionRef, {
        reports: arrayUnion(reportObj),
      });

      showToastMessage("Reported", "We will look into it.", "success");
    } catch (error) {
      showToastMessage("Error", REPORTING_ERROR, "error");
    } finally {
      onReportConfessClose();
      setConfessionToBeReport({});
    }
  };

  const handleCategorySelection = (selectedCategory) => {
    if (selectedCategories.includes(selectedCategory)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== selectedCategory)
      );
    } else {
      setSelectedCategories([...selectedCategories, selectedCategory]);
    }
  };

  const handleBatchSelection = (selectedBatch) => {
    if (selectedBatches.includes(selectedBatch)) {
      setSelectedBatches(
        selectedBatches.filter((batch) => batch !== selectedBatch)
      );
    } else {
      setSelectedBatches([...selectedBatches, selectedBatch]);
    }
  };

  const toggleShowBatchExclusiveConfessions = (event) => {
    setShowBatchExclusiveConfessions(event.target.checked);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBatches([]);
    setShowBatchExclusiveConfessions(false);
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("loggedInBatchYear");
    navigate("/", { replace: true });

    showToastMessage("Logged out", "You have logged out.", "success");
  };

  const resetPassword = async () => {
    setPasswordIsResetting(true);

    try {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      logout();
      showToastMessage(
        "Successful",
        "Check your email to reset your password.",
        "success"
      );
      setPasswordIsResetting(false);
    } catch (error) {
      showToastMessage("Error", error.messages, "error");
    } finally {
      setPasswordIsResetting(false);
    }
  };

  const addCommentToConfession = async (
    setIsCommenting,
    id,
    userComment,
    resetComment
  ) => {
    setIsCommenting(true);
    try {
      const confessionRef = doc(db, "confessions", id);

      const userCommentObj = {
        id: uuidv4(),
        batchYear: Number(loggedInBatchYear),
        comment: userComment,
        timeStamp: new Date(),
      };

      await updateDoc(confessionRef, {
        comments: arrayUnion(userCommentObj),
      });

      showToastMessage("Commented", "Comment added successfully.", "success");
      getConfessions();
    } catch (error) {
      showToastMessage("Error", COMMENT_ADD_ERROR, "error");
    } finally {
      resetComment();
      setIsCommenting(false);
    }
  };

  const userAlreadyVoted = (id) => {
    let voteArray;
    voteArray = localStorage.getItem("voteList");
    voteArray = JSON.parse(voteArray);

    if (voteArray && voteArray.includes(id)) {
      return true;
    }

    if (voteArray) {
      voteArray.push(id);
    } else {
      voteArray = [];
      voteArray.push(id);
    }

    localStorage.setItem("voteList", JSON.stringify(voteArray));

    return false;
  };

  const pollIsExpired = (expiryDate) => {
    const currentDate = new Date();

    return expiryDate.toDate() < currentDate;
  };

  const voteToPoll = async (id, choice, setIsVoting, expiryDate) => {
    if (pollIsExpired(expiryDate)) {
      showToastMessage("Expired", "Poll is expired.", "warning");

      return;
    }

    if (userAlreadyVoted(id)) {
      showToastMessage(
        "Already Voted",
        "You have already voted to this poll.",
        "warning"
      );

      return;
    }

    setIsVoting(true);

    const confessionRef = doc(db, "confessions", id);

    const documentSnapshot = await getDoc(confessionRef);
    const choices = documentSnapshot.get("choices");
    let totalVotes = documentSnapshot.get("totalVotes");

    const choiceIndex = choices.findIndex((item) => item.title === choice);

    choices[choiceIndex].votes += 1;
    totalVotes += 1;

    if (choices[choiceIndex].votesByBatches.hasOwnProperty(loggedInBatchYear)) {
      choices[choiceIndex].votesByBatches = {
        ...choices[choiceIndex].votesByBatches,
        [loggedInBatchYear]:
          choices[choiceIndex].votesByBatches[loggedInBatchYear] + 1,
      };
    } else {
      choices[choiceIndex].votesByBatches = {
        ...choices[choiceIndex].votesByBatches,
        [loggedInBatchYear]: 1,
      };
    }

    await updateDoc(confessionRef, { choices, totalVotes });
    setIsVoting(false);

    getConfessions();
  };

  const userAlreadyReacted = (id) => {
    let reactionArray;
    reactionArray = localStorage.getItem("reactionList");
    reactionArray = JSON.parse(reactionArray);

    if (reactionArray && reactionArray.includes(id)) {
      return true;
    }

    if (reactionArray) {
      reactionArray.push(id);
    } else {
      reactionArray = [];
      reactionArray.push(id);
    }

    localStorage.setItem("reactionList", JSON.stringify(reactionArray));

    return false;
  };

  const reactToConfession = async (type, id) => {
    if (userAlreadyReacted(id)) {
      showToastMessage(
        "Already Reacted",
        "You have already reacted to this confession",
        "warning"
      );

      return;
    }

    const confessionRef = doc(db, "confessions", id);

    switch (type) {
      case "like":
        await updateDoc(confessionRef, {
          "reactions.like": increment(1),
        });

        break;
      case "funny":
        await updateDoc(confessionRef, {
          "reactions.funny": increment(1),
        });

        break;
      case "shock":
        await updateDoc(confessionRef, {
          "reactions.shock": increment(1),
        });

        break;
    }

    getConfessions();
  };

  const viewDetailedPollStats = (
    id,
    question,
    choices,
    totalVotes,
    expiryDate,
    category,
    batchYear,
    timeStamp
  ) => {
    setSelectedPoll({
      id: id,
      question: question,
      choices: choices,
      totalVotes: totalVotes,
      expiryDate: expiryDate,
      category: category,
      batchYear: batchYear,
      timeStamp: timeStamp,
    });
    onVoteStatsModalOpen();
  };

  const filteredConfessions = confessions.filter(
    (item) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(item.category)) &&
      (selectedBatches.length === 0 ||
        selectedBatches.includes(item.batchYear)) &&
      (!showBatchExclusiveConfessions || item.isVisibleToBatchOnly)
  );

  useEffect(() => {
    getConfessions();
  }, []);

  if (!auth.currentUser) return <ErrorPage />;

  return (
    <>
      <Box overflow="hidden" height="100vh">
        <ProtectedHeader
          onAccountDrawerOpen={onAccountDrawerOpen}
          onPasswordResetDialogOpen={onPasswordResetDialogOpen}
          logout={logout}
          openCreationModal={openCreationModal}
        />
        <Flex>
          <FilterBar
            handleCategorySelection={handleCategorySelection}
            selectedCategories={selectedCategories}
            handleBatchSelection={handleBatchSelection}
            selectedBatches={selectedBatches}
            toggleShowBatchExclusiveConfessions={
              toggleShowBatchExclusiveConfessions
            }
            showBatchExclusiveConfessions={showBatchExclusiveConfessions}
            clearAllFilters={clearAllFilters}
          />
          <Box flex="1" paddingLeft="30px">
            <AppliedFiltersHeading
              selectedCategories={selectedCategories}
              selectedBatches={selectedBatches}
            />

            {confessions.length > 0 ? (
              <Flex
                wrap="wrap"
                gap="5"
                justifyContent="center"
                overflow="auto"
                maxHeight="800px"
                paddingTop="30px"
                paddingBottom="300px"
              >
                {filteredConfessions.map((item) => (
                  <Confession
                    {...item}
                    key={item.id}
                    onDeleteConfessOpen={onDeleteConfessOpen}
                    setConfessionToBeDelete={setConfessionToBeDelete}
                    onReportConfessOpen={onReportConfessOpen}
                    setConfessionToBeReport={setConfessionToBeReport}
                    loggedInBatchYear={loggedInBatchYear}
                    addCommentToConfession={addCommentToConfession}
                    reactToConfession={reactToConfession}
                    voteToPoll={voteToPoll}
                    onVoteStatsModalOpen={onVoteStatsModalOpen}
                    viewDetailedPollStats={viewDetailedPollStats}
                  />
                ))}
              </Flex>
            ) : (
              <Flex height="100%" justifyContent="center">
                <LoadindSpinner text="Getting your confessions" />
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>

      <CreationModal
        isCreateConfessOpen={isCreateConfessOpen}
        creationModalType={creationModalType}
        onCreateConfessClose={onCreateConfessClose}
        getConfessions={getConfessions}
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
      <AccountDrawer
        isAccountDrawerOpen={isAccountDrawerOpen}
        onAccountDrawerClose={onAccountDrawerClose}
        logout={logout}
      />
      <PasswordResetDialog
        isPasswordResetDialogOpen={isPasswordResetDialogOpen}
        onPasswordResetDialogClose={onPasswordResetDialogClose}
        passwordIsResetting={passwordIsResetting}
        resetPassword={resetPassword}
      />
      <VoteStatsModal
        isVoteStatsModalOpen={isVoteStatsModalOpen}
        onVoteStatsModalClose={onVoteStatsModalClose}
        selectedPoll={selectedPoll}
      />
    </>
  );
};

export default ConfessionsPage;
