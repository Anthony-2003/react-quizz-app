import { Dispatch } from "react";
import { Action, QuestionType } from "../ts/types";

type QuestionProps = {
  question: QuestionType;
  dispatch: Dispatch<Action>;
  answer: number | null;
};

export default function Options({ question, dispatch, answer }: QuestionProps) {
  const hasAnswered = answer != null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={index}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
