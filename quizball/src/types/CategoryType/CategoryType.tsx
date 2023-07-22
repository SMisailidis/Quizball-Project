import { QuestionsType } from "../QuestionsType";

export type CategoryType = {
  type: string;
  id: string;
  questions: QuestionsType[];
  bgColor: string;
};
