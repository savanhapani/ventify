import mail from "../../assets/mail.svg";
import display from "../../assets/display.svg";
import confess from "../../assets/confess.svg";
import cat from "../../assets/cat.svg";

import { AiOutlineLike } from "react-icons/ai";
import { BsEmojiLaughing } from "react-icons/bs";
import { ImShocked } from "react-icons/im";

const confessCategories = [
  {
    id: "1",
    title: "academics",
  },
  {
    id: "2",
    title: "canteen",
  },
  {
    id: "3",
    title: "friendship",
  },
  {
    id: "4",
    title: "relationship",
  },
  {
    id: "5",
    title: "roommates",
  },
  {
    id: "6",
    title: "career",
  },

  {
    id: "7",
    title: "faculty",
  },
  {
    id: "8",
    title: "events",
  },
  {
    id: "9",
    title: "suggestion",
  },
  {
    id: "10",
    title: "library",
  },
  {
    id: "11",
    title: "food",
  },
  {
    id: "12",
    title: "classroom",
  },
  {
    id: "13",
    title: "hostel",
  },
  {
    id: "14",
    title: "other",
  },
];

const communityGuidelines = [
  { id: 1, title: "Respect and kindness towards all users" },
  { id: 2, title: "No personal attacks or offensive behavior" },
  { id: 3, title: "Maintain confidentiality and respect privacy" },
  { id: 4, title: "Prohibit hate speech and discrimination" },
  { id: 5, title: "No bullying, harassment, or cyberbullying" },
  { id: 6, title: "Provide constructive criticism, avoid personal attacks" },
  { id: 7, title: "Report violations for prompt moderation" },
  { id: 8, title: "Embrace inclusivity and diversity" },
  { id: 9, title: "Focus on educational discussions and insights" },
  { id: 10, title: "Comply with laws and regulations" },
];

const availableBatches = [
  {
    id: "1",
    title: 2018,
  },
  {
    id: "2",

    title: 2019,
  },
  {
    id: "3",
    title: 2020,
  },
  {
    id: "4",

    title: 2021,
  },
  {
    id: "5",

    title: 2022,
  },
];

const availableReactions = [
  {
    id: "1",
    title: "like",
    icon: <AiOutlineLike />,
  },
  {
    id: "2",
    title: "funny",
    icon: <BsEmojiLaughing />,
  },
  {
    id: "3",
    title: "shock",
    icon: <ImShocked />,
  },
];

const availablePollDurations = [
  {
    id: "1",
    title: "24 hour",
    value: 1,
  },
  {
    id: "2",
    title: "3 days",
    value: 3,
  },
  {
    id: "3",
    title: "5 days",
    value: 5,
  },
  {
    id: "4",
    title: "1 week",
    value: 7,
  },
];

const CONFESSION_CHAR_LIMIT = 280;
const POLL_QUESTION_CHAR_LIMIT = CONFESSION_CHAR_LIMIT;
const COMMENT_CHAR_LIMIT = CONFESSION_CHAR_LIMIT;
const CHOICE_CHAR_LIMIT = 25;
const NUMBER_OF_CHOICES_IN_POLL = 5;

const ALLOWED_VISIBLE_COMMENTS = 3;

const ANNOUNCEMENT_CHAR_LIMIT = 350;

const EMAIL_DOMAIN = "@daiict.ac.in";

const availableTabs = [
  {
    id: "1",
    title: "All",
    value: "all",
  },
  {
    id: "2",
    title: "Confessions",
    value: "confession",
  },
  {
    id: "3",
    title: "Polls",
    value: "poll",
  },
];

const availableLoginTabs = [
  {
    id: "1",
    title: "login",
    value: "login",
  },
  {
    id: "2",
    title: "register",
    value: "register",
  },
  {
    id: "3",
    title: "forget password",
    value: "forgetPassword",
  },
];

const howItWorks = [
  {
    id: "1",
    title: "Create Account",
    image: mail,
    description:
      "Welcome to the exclusive gateway for our college confession app! To get started, simply enter your DAIICT Roll number and password. Once you provide your valid credentials, we'll fetch your registered email address associated with the Roll number.",
  },
  {
    id: "2",
    title: "Anonymity",
    image: cat,

    description:
      "Rest assured, your email serves solely as a verification mechanism for DAIICT students. We uphold a steadfast commitment to privacy, refraining from establishing any user databases. Your information remains confidential, reinforcing a culture of anonymity and fostering a trusted environment.",
  },
  {
    id: "3",
    title: "Confess",
    image: confess,

    description:
      "Upon logging in, indulge in a cathartic experience where you can freely express your emotions and share stories. Embrace the liberating power of anonymity as you unburden yourself, without the fear of judgment or disclosure. Here, within the confines of our platform, your confessions shall find solace and resonate with others.",
  },
  {
    id: "4",
    title: "How We Display It?",
    image: display,

    description:
      "Our platform ensures the complete anonymity of confessions, safeguarding individual identities throughout the process. Our commitment to privacy extends to our backend systems, as we refrain from storing or accessing any user-specific information. Confessions are attributed solely to the respective batch numbers, preserving anonymity while providing a sense of collective representation.",
  },
];

export {
  confessCategories,
  howItWorks,
  availableReactions,
  availableBatches,
  communityGuidelines,
  availablePollDurations,
  CONFESSION_CHAR_LIMIT,
  POLL_QUESTION_CHAR_LIMIT,
  CHOICE_CHAR_LIMIT,
  COMMENT_CHAR_LIMIT,
  ALLOWED_VISIBLE_COMMENTS,
  availableTabs,
  EMAIL_DOMAIN,
  NUMBER_OF_CHOICES_IN_POLL,
  availableLoginTabs,
  ANNOUNCEMENT_CHAR_LIMIT,
};
