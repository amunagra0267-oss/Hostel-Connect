import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
} from "react";

const LeaveContext = createContext();

const initialState = [
  {
    id: 1,
    from: "10 July 2026",
    to: "12 July 2026",
    destination: "Delhi",
    reason: "Family Function",
    emergencyContact: "9876543210",
    transport: "Train",
    status: "Approved",
    appliedOn: "5 July 2026",
    remarks: "Approved by Warden",
  },
  {
    id: 2,
    from: "20 July 2026",
    to: "21 July 2026",
    destination: "Chandigarh",
    reason: "Medical Checkup",
    emergencyContact: "9876543210",
    transport: "Bus",
    status: "Pending",
    appliedOn: "15 July 2026",
    remarks: "",
  },
];

const leaveReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LEAVE":
      return [...state, action.payload];

    case "UPDATE_LEAVE":
      return state.map((leave) =>
        leave.id === action.payload.id
          ? action.payload
          : leave
      );

    case "DELETE_LEAVE":
      return state.filter(
        (leave) => leave.id !== action.payload
      );

    default:
      return state;
  }
};

export const LeaveProvider = ({ children }) => {
  const [leaves, dispatch] = useReducer(
    leaveReducer,
    initialState
  );

  const addLeave = (leave) => {
    dispatch({
      type: "ADD_LEAVE",
      payload: leave,
    });
  };

  const updateLeave = (leave) => {
    dispatch({
      type: "UPDATE_LEAVE",
      payload: leave,
    });
  };

  const deleteLeave = (id) => {
    dispatch({
      type: "DELETE_LEAVE",
      payload: id,
    });
  };

  const value = useMemo(() => {
    return {
      leaves,
      addLeave,
      updateLeave,
      deleteLeave,
    };
  }, [leaves]);

  return (
    <LeaveContext.Provider value={value}>
      {children}
    </LeaveContext.Provider>
  );
};

export const useLeave = () => {
  return useContext(LeaveContext);
};