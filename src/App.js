import { useReducer } from "react";
import "./App.css";

const Actions = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case Actions.ADD_DIGIT:
      return {
        ...state,
        current_no: `${state.current_no}${payload.digit}`,
      };
    case Actions.CHOOSE_OPERATION:
      return {
        ...state,
        previous_no: state.current_no,
        current_no: "",
        operation: payload.operation,
      };
    case Actions.CLEAR:
      return {
        previous_no: "",
        current_no: "",
        operation: "",
      };
    case Actions.DELETE_DIGIT:
      return {
        ...state,
        current_no: state.current_no.slice(0, -1),
      };
    case Actions.EVALUATE:
      try {
        const result = eval(
          `${state.previous_no}${state.operation}${state.current_no}`
        );
        return {
          previous_no: "",
          current_no: String(result),
          operation: "",
        };
      } catch (error) {
        return {
          previous_no: "",
          current_no: "Error",
          operation: "",
        };
      }
    default:
      return state;
  }
}

function App() {
  const initialState = {
    previous_no: "",
    current_no: "",
    operation: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleButtonClick = (type, payload) => {
    dispatch({ type, payload });
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous_no">
          {state.previous_no}
          {state.operation}
        </div>
        <div className="current_no">{state.current_no}</div>
      </div>

      <button
        onClick={() => handleButtonClick(Actions.CLEAR)}
        className="span-two"
      >
        AC
      </button>
      <button onClick={() => handleButtonClick(Actions.DELETE_DIGIT)}>
        DEL
      </button>
      <button
        onClick={() =>
          handleButtonClick(Actions.CHOOSE_OPERATION, { operation: "/" })
        }
      >
        /
      </button>
      <button
        onClick={() => handleButtonClick(Actions.ADD_DIGIT, { digit: "1" })}
      >
        1
      </button>
      <button
        onClick={() => handleButtonClick(Actions.ADD_DIGIT, { digit: "2" })}
      >
        2
      </button>
      <button
        onClick={() => handleButtonClick(Actions.ADD_DIGIT, { digit: "3" })}
      >
        3
      </button>
      <button
        onClick={() =>
          handleButtonClick(Actions.CHOOSE_OPERATION, { operation: "*" })
        }
      >
        *
      </button>
      <button
        onClick={() => handleButtonClick(Actions.ADD_DIGIT, { digit: "4" })}
      >
        4
      </button>
      <button
        onClick={() => handleButtonClick(Actions.ADD_DIGIT, { digit: "5" })}
      >
        5
      </button>
      <button
        onClick={() => handleButtonClick(Actions.ADD_DIGIT, { digit: "6" })}
      >
        6
      </button>
      <button
        onClick={() =>
          handleButtonClick(Actions.CHOOSE_OPERATION, { operation: "+" })
        }
      >
        +
      </button>
      <button
        onClick={() => handleButtonClick(Actions.ADD_DIGIT, { digit: "7" })}
      >
        7
      </button>
      <button
        onClick={() => handleButtonClick(Actions.ADD_DIGIT, { digit: "8" })}
      >
        8
      </button>
      <button
        onClick={() => handleButtonClick(Actions.ADD_DIGIT, { digit: "9" })}
      >
        9
      </button>
      <button
        onClick={() =>
          handleButtonClick(Actions.CHOOSE_OPERATION, { operation: "-" })
        }
      >
        -
      </button>
      <button
        onClick={() => handleButtonClick(Actions.ADD_DIGIT, { digit: "." })}
      >
        .
      </button>
      <button
        onClick={() => handleButtonClick(Actions.ADD_DIGIT, { digit: "0" })}
      >
        0
      </button>
      <button
        onClick={() => handleButtonClick(Actions.EVALUATE)}
        className="span-two"
      >
        =
      </button>
    </div>
  );
}

export default App;
