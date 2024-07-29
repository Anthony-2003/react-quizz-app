import { useState, ChangeEvent, useReducer } from "react";

// Define the type for the state
interface State {
  count: number;
}

// Define the types for the actions
type Action =
  | { type: 'increment'; payload: number }
  | { type: 'decrement'; payload: number }
  | { type: 'reset' }
  | { type: 'setCount'; payload: number };  

// Reducer function
function reducer(state: State, action: Action): State {
  console.log(state, action);
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload };
    case 'decrement':
      return { count: state.count - action.payload };
    case 'reset':
      return { count: 0 };
    case 'setCount':
      return { count: action.payload };
    default:
      throw new Error('Unknown action type');
  }
}

function DateCounter() {
  const initialState = {count: 0, step: 1}
  const [state, dispatch] = useReducer(reducer, initialState);
  const [step, setStep] = useState<number>(1);

  // This mutates the date object.
  const date = new Date("June 21, 2027");
  date.setDate(date.getDate() + state.count);

  const dec = () => {
    dispatch({ type: 'decrement', payload: step });
  };

  const inc = () => {
    dispatch({ type: 'increment', payload: step });
  };

  const defineCount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = (e: ChangeEvent<HTMLInputElement>) => {
    setStep(Number(e.target.value));
  };

  const reset = () => {
    dispatch({ type: 'reset' });
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input type="number" value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;
