import iatFull01 from './iat_full_01.json';
import iatFull02 from './iat_full_02.json';
import iatFull03 from './iat_full_03.json';
import iatFull04 from './iat_full_04.json';
import iatFull05 from './iat_full_05.json';
import iatFull06 from './iat_full_06.json';
import iatFull07 from './iat_full_07.json';
import iatFull08 from './iat_full_08.json';
import iatFull09 from './iat_full_09.json';
import iatFull10 from './iat_full_10.json';
import iatFull11 from './iat_full_11.json';
import iatFull12 from './iat_full_12.json';
import iatFull13 from './iat_full_13.json';
import iatFull14 from './iat_full_14.json';
import iatFull15 from './iat_full_15.json';
import iatFull16 from './iat_full_16.json';
import iatFull17 from './iat_full_17.json';
import iatFull18 from './iat_full_18.json';
import iatFull19 from './iat_full_19.json';
import iatFull20 from './iat_full_20.json';
import iatFull21 from './iat_full_21.json';
import iatFull22 from './iat_full_22.json';
import iatFull23 from './iat_full_23.json';
import iatFull24 from './iat_full_24.json';
import iatFull25 from './iat_full_25.json';
import iatFull26 from './iat_full_26.json';
import iatFull27 from './iat_full_27.json';
import iatFull28 from './iat_full_28.json';
import iatFull29 from './iat_full_29.json';
import iatFull30 from './iat_full_30.json';
import iatFull31 from './iat_full_31.json';
import iatFull32 from './iat_full_32.json';
import iatFull33 from './iat_full_33.json';
import iatFull34 from './iat_full_34.json';
import iatFull35 from './iat_full_35.json';
import iatFull36 from './iat_full_36.json';
import iatFull37 from './iat_full_37.json';
import iatFull38 from './iat_full_38.json';
import iatFull39 from './iat_full_39.json';
import iatFull40 from './iat_full_40.json';
import iatFull41 from './iat_full_41.json';
import iatFull42 from './iat_full_42.json';
import iatFull43 from './iat_full_43.json';
import iatFull44 from './iat_full_44.json';
import iatFull45 from './iat_full_45.json';

export interface MockQuestion {
  id: number;
  subject: string;
  section: string;
  chapterId?: string;
  topicId?: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: string;
  image?: string;
  imagePrompt?: string | null;
}

export interface MockTestData {
  testId: string;
  duration: number; // in minutes
  totalMarks: number;
  questions: MockQuestion[];
}

export interface MockTestIndex {
  id: string;
  title: string;
  duration: number; // in minutes
  questions: number; // number of questions
  difficulty: 'Easy' | 'Medium' | 'Hard';
  data: MockTestData;
}

export const MOCK_TESTS: MockTestIndex[] = [
  {
    id: "IAT_FULL_01",
    title: "IISER IAT Mock #1",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull01 as MockTestData
  },
  {
    id: "IAT_FULL_02",
    title: "IISER IAT Mock #2",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull02 as MockTestData
  },
  {
    id: "IAT_FULL_03",
    title: "IISER IAT Mock #3",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull03 as MockTestData
  },
  {
    id: "IAT_FULL_04",
    title: "IISER IAT Mock #4",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull04 as MockTestData
  },
  {
    id: "IAT_FULL_05",
    title: "IISER IAT Mock #5",
    duration: 180,
    questions: 60,
    difficulty: "Easy",
    data: iatFull05 as MockTestData
  },
  {
    id: "IAT_FULL_06",
    title: "IISER IAT Mock #6",
    duration: 180,
    questions: 60,
    difficulty: "Easy",
    data: iatFull06 as MockTestData
  },
  {
    id: "IAT_FULL_07",
    title: "IISER IAT Mock #7",
    duration: 180,
    questions: 60,
    difficulty: "Easy",
    data: iatFull07 as MockTestData
  },
  {
    id: "IAT_FULL_08",
    title: "IISER IAT Mock #8",
    duration: 180,
    questions: 60,
    difficulty: "Easy",
    data: iatFull08 as MockTestData
  },
  {
    id: "IAT_FULL_09",
    title: "IISER IAT Mock #9",
    duration: 180,
    questions: 60,
    difficulty: "Easy",
    data: iatFull09 as MockTestData
  },
  {
    id: "IAT_FULL_10",
    title: "IISER IAT Mock #10",
    duration: 180,
    questions: 60,
    difficulty: "Easy",
    data: iatFull10 as MockTestData
  },
  {
    id: "IAT_FULL_11",
    title: "IISER IAT Mock #11",
    duration: 180,
    questions: 60,
    difficulty: "Easy",
    data: iatFull11 as MockTestData
  },
  {
    id: "IAT_FULL_12",
    title: "IISER IAT Mock #12",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull12 as MockTestData
  },
  {
    id: "IAT_FULL_13",
    title: "IISER IAT Mock #13",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull13 as MockTestData
  },
  {
    id: "IAT_FULL_14",
    title: "IISER IAT Mock #14",
    duration: 180,
    questions: 60,
    difficulty: "Easy",
    data: iatFull14 as MockTestData
  },
  {
    id: "IAT_FULL_15",
    title: "IISER IAT Mock #15",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull15 as MockTestData
  },
  {
    id: "IAT_FULL_16",
    title: "IISER IAT Mock #16",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull16 as MockTestData
  },
  {
    id: "IAT_FULL_17",
    title: "IISER IAT Mock #17",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull17 as MockTestData
  },
  {
    id: "IAT_FULL_18",
    title: "IISER IAT Mock #18",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull18 as MockTestData
  },
  {
    id: "IAT_FULL_19",
    title: "IISER IAT Mock #19",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull19 as MockTestData
  },
  {
    id: "IAT_FULL_20",
    title: "IISER IAT Mock #20",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull20 as MockTestData
  },
  {
    id: "IAT_FULL_21",
    title: "IISER IAT Mock #21",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull21 as MockTestData
  },
  {
    id: "IAT_FULL_22",
    title: "IISER IAT Mock #22",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull22 as MockTestData
  },
  {
    id: "IAT_FULL_23",
    title: "IISER IAT Mock #23",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull23 as MockTestData
  },
  {
    id: "IAT_FULL_24",
    title: "IISER IAT Mock #24",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull24 as MockTestData
  },
  {
    id: "IAT_FULL_25",
    title: "IISER IAT Mock #25",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull25 as MockTestData
  },
  {
    id: "IAT_FULL_26",
    title: "IISER IAT Mock #26",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull26 as MockTestData
  },
  {
    id: "IAT_FULL_27",
    title: "IISER IAT Mock #27",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull27 as MockTestData
  },
  {
    id: "IAT_FULL_28",
    title: "IISER IAT Mock #28",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull28 as MockTestData
  },
  {
    id: "IAT_FULL_29",
    title: "IISER IAT Mock #29",
    duration: 180,
    questions: 60,
    difficulty: "Easy",
    data: iatFull29 as MockTestData
  },
  {
    id: "IAT_FULL_30",
    title: "IISER IAT Mock #30",
    duration: 180,
    questions: 60,
    difficulty: "Easy",
    data: iatFull30 as MockTestData
  },
  {
    id: "IAT_FULL_31",
    title: "IISER IAT Mock #31",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull31 as MockTestData
  },
  {
    id: "IAT_FULL_32",
    title: "IISER IAT Mock #32",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull32 as MockTestData
  },
  {
    id: "IAT_FULL_33",
    title: "IISER IAT Mock #33",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull33 as MockTestData
  },
  {
    id: "IAT_FULL_34",
    title: "IISER IAT Mock #34",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull34 as MockTestData
  },
  {
    id: "IAT_FULL_35",
    title: "IISER IAT Mock #35",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull35 as MockTestData
  },
  {
    id: "IAT_FULL_36",
    title: "IISER IAT Mock #36",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull36 as MockTestData
  },
  {
    id: "IAT_FULL_37",
    title: "IISER IAT Mock #37",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull37 as MockTestData
  },
  {
    id: "IAT_FULL_38",
    title: "IISER IAT Mock #38",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull38 as MockTestData
  },
  {
    id: "IAT_FULL_39",
    title: "IISER IAT Mock #39",
    duration: 180,
    questions: 60,
    difficulty: "Hard",
    data: iatFull39 as MockTestData
  },
  {
    id: "IAT_FULL_40",
    title: "IISER IAT Mock #40",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull40 as MockTestData
  },
  {
    id: "IAT_FULL_41",
    title: "IISER IAT Mock #41",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull41 as MockTestData
  },
  {
    id: "IAT_FULL_42",
    title: "IISER IAT Mock #42",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull42 as MockTestData
  },
  {
    id: "IAT_FULL_43",
    title: "IISER IAT Mock #43",
    duration: 180,
    questions: 60,
    difficulty: "Medium",
    data: iatFull43 as MockTestData
  },
  {
    id: "IAT_FULL_44",
    title: "IISER IAT Mock #44",
    duration: 180,
    questions: 60,
    difficulty: "Easy",
    data: iatFull44 as MockTestData
  },
  {
    id: "IAT_FULL_45",
    title: "IISER IAT Mock #45",
    duration: 180,
    questions: 60,
    difficulty: "Easy",
    data: iatFull45 as MockTestData
  }
];
