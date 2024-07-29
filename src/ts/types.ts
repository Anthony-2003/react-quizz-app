export interface QuestionType {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

export interface State {
  questions: QuestionType[];
  status: "loading" | "ready" | "error" | "active" | "finished";
  index: number;
  answer: number | null; 
  points: number;
  highscore: number;
  secondsRemainig: number | null;
}

export type Action =
  | { type: "dataReceived"; payload: QuestionType[] }
  | { type: "dataError" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number | null }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "tick" };