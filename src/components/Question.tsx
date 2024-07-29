import { Action, QuestionType } from "../ts/types";
import Options from "../components/Options";
import { Dispatch } from "react";

type QuestionProps = {
  question: QuestionType;
  dispatch: Dispatch<Action>;
  answer: number | null;
};

export default function Question({ question, dispatch, answer }: QuestionProps) {
  console.log(dispatch, answer);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question}  answer={answer} dispatch={dispatch}  />
    </div>
  );
}
