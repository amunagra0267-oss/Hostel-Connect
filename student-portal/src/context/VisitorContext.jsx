import React, {
  createContext,
  useContext,
  useReducer,
} from "react";

const VisitorContext = createContext();

const initialState = {
  visitors: [
    {
      id: 1,
      name: "Ramesh Sharma",
      relation: "Father",
      phone: "9876543210",
      date: "2026-07-10",
      time: "10:00",
      purpose: "Meeting",
      status: "Approved",
    },
    {
      id: 2,
      name: "Priya Sharma",
      relation: "Mother",
      phone: "9876543211",
      date: "2026-07-12",
      time: "02:00",
      purpose: "Lunch",
      status: "Pending",
    },
  ],
};

const visitorReducer = (state, action) => {
  switch (action.type) {
    case "ADD_VISITOR":
      return {
        ...state,
        visitors: [
          ...state.visitors,
          action.payload,
        ],
      };

    case "UPDATE_VISITOR":
      return {
        ...state,
        visitors: state.visitors.map((visitor) =>
          visitor.id === action.payload.id
            ? action.payload
            : visitor
        ),
      };

    case "DELETE_VISITOR":
      return {
        ...state,
        visitors: state.visitors.filter(
          (visitor) =>
            visitor.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const VisitorProvider = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    visitorReducer,
    initialState
  );

  const addVisitor = (visitor) => {
    dispatch({
      type: "ADD_VISITOR",
      payload: visitor,
    });
  };

  const updateVisitor = (visitor) => {
    dispatch({
      type: "UPDATE_VISITOR",
      payload: visitor,
    });
  };

  const deleteVisitor = (id) => {
    dispatch({
      type: "DELETE_VISITOR",
      payload: id,
    });
  };

  return (
    <VisitorContext.Provider
      value={{
        visitors: state.visitors,
        addVisitor,
        updateVisitor,
        deleteVisitor,
      }}
    >
      {children}
    </VisitorContext.Provider>
  );
};

export const useVisitor = () =>
  useContext(VisitorContext);