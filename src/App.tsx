import { useEffect, useReducer } from "react";
import Main from "./components/Main";
import Header from "./components/ui/Header";
import { fetchQuestions } from "./services/apiService";
import { State, Action } from "./ts/types";
import Loader from "./components/ui/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/ui/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/ui/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/ui/Footer";


const SECOND_PER_QUESTION = 30;

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemainig: null,
};

function reducer(state: State, action: Action): State {
  console.log(state, action);
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload || [],
        status: "ready",
      };
    case "dataError":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemainig: state.questions.length * SECOND_PER_QUESTION
      };

    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload !== undefined ? action.payload : null,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        secondsRemainig: (state.secondsRemainig ?? 0) - 1,
        status: state.secondsRemainig === 0 ? 'finished' : state.status
      }

    default:
      throw console.log("Action unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemainig}, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchQuestions();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: "dataError" });
      }
    };

    getData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}

        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={numQuestions}
              points={points}
              maxPossiblePoins={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemainig={secondsRemainig}/>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            maxPossiblePoints={maxPossiblePoints}
            points={points}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
