import {
  auth,
  signOut,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase/firebase";
import { INVALID_ROLL_NUMBER, EMAIL_NOT_VERIFIED } from "../errors/errors";

const resetUserInputs = (setStudentRollNo, setPassword) => {
  setStudentRollNo("");
  setPassword("");
};

const logout = async () => {
  await signOut(auth);
};

const sendEmailVerificationLink = async (userEmail, showToastMessage) => {
  try {
    await sendEmailVerification(auth.currentUser);
    showToastMessage(
      "Link Sent",
      `We have sent you the email verification link at ${userEmail}. Please check your inbox.`,
      "success"
    );
  } catch (error) {
    showToastMessage("Error", error.message, "error");
  }
};

const constructEmail = (studentRollNo) => {
  const emailDomain = "@daiict.ac.in";

  return studentRollNo + emailDomain;
};

const getCurrentBatchYear = (studentRollNo) => {
  return Number(studentRollNo.toString().substring(0, 4));
};

const rollNumberIsValid = (studentRollNo) => {
  const currentYear = new Date().getFullYear();
  const currentbatchYear = getCurrentBatchYear(studentRollNo);

  return studentRollNo.length === 9 && currentbatchYear <= currentYear;
};

const registerUser = async (
  setIsRegisteringUser,
  password,
  setLoginUiIsVisible,
  showToastMessage,
  setStudentRollNo,
  setPassword,
  studentRollNo
) => {
  try {
    if (!rollNumberIsValid(studentRollNo)) {
      throw new Error(INVALID_ROLL_NUMBER);
    }

    setIsRegisteringUser(true);
    const userEmail = constructEmail(studentRollNo);

    await createUserWithEmailAndPassword(auth, userEmail, password);
    await sendEmailVerificationLink(userEmail, showToastMessage);
    logout();
    setLoginUiIsVisible(true);
  } catch (error) {
    showToastMessage("Error", error.message, "error");
  } finally {
    setIsRegisteringUser(false);
    resetUserInputs(setStudentRollNo, setPassword);
  }
};

const login = async (
  setIsLoginInUser,
  password,
  setLoggedInBatchYear,
  showToastMessage,
  navigate,
  setStudentRollNo,
  setPassword,
  studentRollNo
) => {
  try {
    if (!rollNumberIsValid(studentRollNo)) {
      throw new Error(INVALID_ROLL_NUMBER);
    }

    setIsLoginInUser(true);
    const userEmail = constructEmail(studentRollNo);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      userEmail,
      password
    );
    const user = userCredential.user;
    const emailIsVerified = user.emailVerified;

    if (
      !emailIsVerified &&
      import.meta.env.VITE_TESTING_ENVIRONMENT == "prod"
    ) {
      throw new Error(EMAIL_NOT_VERIFIED);
    }
    const currentbatchYear = getCurrentBatchYear(studentRollNo);
    setLoggedInBatchYear(currentbatchYear);
    localStorage.setItem("loggedInBatchYear", currentbatchYear);

    navigate("/confessions", { replace: true });
  } catch (error) {
    logout();
    showToastMessage("Error", error.message, "error");
  } finally {
    setIsLoginInUser(false);
    resetUserInputs(setStudentRollNo, setPassword);
  }
};

export { login, registerUser };
