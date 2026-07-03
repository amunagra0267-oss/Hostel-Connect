import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
} from "react";

const ComplaintContext = createContext();

const initialState = [
  {
    id: 1,
    category: "Water",
    title: "Water Leakage",
    description: "Water leakage near washroom.",
    status: "In Progress",
    priority: "Urgent",
    createdAt: "2 July 2026",
  },
  {
    id: 2,
    category: "Electrical",
    title: "Fan Not Working",
    description: "Ceiling fan is not working.",
    status: "Resolved",
    priority: "Normal",
    createdAt: "28 June 2026",
  },
];

const complaintReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMPLAINT":
      return [...state, action.payload];

    case "UPDATE_COMPLAINT":
      return state.map((complaint) =>
        complaint.id === action.payload.id
          ? action.payload
          : complaint
      );

    case "DELETE_COMPLAINT":
      return state.filter(
        (complaint) => complaint.id !== action.payload
      );

    default:
      return state;
  }
};

export const ComplaintProvider = ({ children }) => {
  const [complaints, dispatch] = useReducer(
    complaintReducer,
    initialState
  );

  const addComplaint = (complaint) => {
    dispatch({
      type: "ADD_COMPLAINT",
      payload: complaint,
    });
  };

  const updateComplaint = (complaint) => {
    dispatch({
      type: "UPDATE_COMPLAINT",
      payload: complaint,
    });
  };

  const deleteComplaint = (id) => {
    dispatch({
      type: "DELETE_COMPLAINT",
      payload: id,
    });
  };

  const value = useMemo(() => {
    return {
      complaints,
      addComplaint,
      updateComplaint,
      deleteComplaint,
    };
  }, [complaints]);

  return (
    <ComplaintContext.Provider value={value}>
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaint = () => {
  return useContext(ComplaintContext);
};