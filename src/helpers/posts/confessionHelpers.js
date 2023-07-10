import { CONFESSIONS_FETCH_ERROR } from "../../errors/errors";
import {
  db,
  query,
  collection,
  or,
  where,
  getDocs,
} from "../../firebase/firebase";

const getConfessions = async (
  loggedInBatchYear,
  setConfessions,
  showToastMessage
) => {
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

export { getConfessions };
