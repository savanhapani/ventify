import {
  auth,
  signOut,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../../firebase/firebase";
import {
  INVALID_ROLL_NUMBER,
  EMAIL_NOT_VERIFIED,
  INVALID_CREDENTIALS,
  EMAIL_ALREADY_IN_USE,
  WEAK_PASSWORD,
} from "../../errors/errors";

import { EMAIL_DOMAIN } from "../../assets/data/data";

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
  return studentRollNo + EMAIL_DOMAIN;
};

const getCurrentBatchYear = (studentRollNo) => {
  const firstFourDigit = Number(studentRollNo.toString().substring(0, 4));
  return firstFourDigit;
};

const rollNumberIsValid = (studentRollNo) => {
  const currentYear = new Date().getFullYear();
  const currentbatchYear = getCurrentBatchYear(studentRollNo);

  return studentRollNo.length === 9 && currentbatchYear <= currentYear;
};

const getErrorMessageFromCode = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return EMAIL_ALREADY_IN_USE;

    case "auth/weak-password":
      return WEAK_PASSWORD;

    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return INVALID_CREDENTIALS;

    default:
      return error.message;
  }
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
    const errorMessage = getErrorMessageFromCode(error);
    showToastMessage("Error", errorMessage, "error");
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

    const errorMessage = getErrorMessageFromCode(error);
    showToastMessage("Error", errorMessage, "error");
  } finally {
    setIsLoginInUser(false);
    resetUserInputs(setStudentRollNo, setPassword);
  }
};

export { login, registerUser };
