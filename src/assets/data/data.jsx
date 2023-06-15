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

const confessionsSortingOptions = [
  {
    id: "1",
    title: "most liked",
  },
  {
    id: "2",
    title: "most commented",
  },
  {
    id: "3",
    title: "recently added",
  },
];

const reactions = [
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

const howItWorks = [
  {
    id: "1",
    title: "Get Login Link",
    image: mail,
    description:
      "Gain access to an exclusive gateway by simply providing your DAIICT Roll number. Experience the convenience of receiving the login link directly in your email inbox, streamlining the process and ensuring seamless connectivity.",
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
  reactions,
  availableBatches,
  confessionsSortingOptions,
  communityGuidelines,
};
