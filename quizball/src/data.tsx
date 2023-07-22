import { CategoryType } from "./types/CategoryType";
import { QuestionsType } from "./types/QuestionsType";

export type dataType = {
  categories: CategoryType[];
};

const dummy: dataType = {
  categories: [
    {
      type: "HISTORY",
      id: "c1",
      questions: [
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q1",
          difficulty: 1,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q2",
          difficulty: 2,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q3",
          difficulty: 3,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
      ],
      bgColor: "#6d4523",
    },
    {
      type: "GEOGRAPHY",
      id: "c2",
      questions: [
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q4",
          difficulty: 1,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q5",
          difficulty: 2,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q6",
          difficulty: 3,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
      ],
      bgColor: "#355478",
    },
    {
      type: "HIDDEN QUESTION",
      id: "c3",
      questions: [
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q7",
          difficulty: 1,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q8",
          difficulty: 2,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q9",
          difficulty: 3,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
      ],
      bgColor: "#00553b",
    },
    {
      type: "ΠΟΙΟΣ ΛΕΙΠΕΙ;",
      id: "c4",
      questions: [
        {
          text: "Ποιος λείπει από την εντεκάδα;",
          id: "q10",
          difficulty: 1,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: "Real Madrid-Manchester City-2023.png",
        },
        {
          text: "Ποιος λείπει από την εντεκάδα;",
          id: "q11",
          difficulty: 2,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: "Real Madrid-Liverpool-2023.png",
        },
        {
          text: "Ποιος λείπει από την εντεκάδα;",
          id: "q12",
          difficulty: 3,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: "France-Greece-2023.png",
        },
      ],
      bgColor: "#1fca2c",
    },
    {
      type: "PLAYER ID",
      id: "c5",
      questions: [
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q13",
          difficulty: 1,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q14",
          difficulty: 2,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q15",
          difficulty: 3,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
      ],
      bgColor: "#6414a2",
    },
    {
      type: "FANS QUESTION",
      id: "c6",
      questions: [
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q16",
          difficulty: 1,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q17",
          difficulty: 2,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q18",
          difficulty: 3,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
      ],
      bgColor: "#eaa22c",
    },
    {
      type: "LOGO QUIZ",
      id: "c7",
      questions: [
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q19",
          difficulty: 1,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q20",
          difficulty: 2,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q21",
          difficulty: 3,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
      ],
      bgColor: "#912203",
    },
    {
      type: "GOSSIP",
      id: "c8",
      questions: [
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q22",
          difficulty: 1,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q23",
          difficulty: 2,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q24",
          difficulty: 3,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
      ],
      bgColor: "#cb4d13",
    },
    {
      type: "PHOTO QUIZ",
      id: "c9",
      questions: [
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q25",
          difficulty: 1,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q26",
          difficulty: 2,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
        {
          text: "Ποιος έβαλε το πρώτο γκολ στα προκριματικά του Euro 2004;",
          id: "q27",
          difficulty: 3,
          answer: "Εγω",

          fiftyFiftyBonus: ["Εγω", "Εσυ"],
          photoURL: undefined,
        },
      ],
      bgColor: "#2f2f2f",
    },
  ],
};

export default dummy;
