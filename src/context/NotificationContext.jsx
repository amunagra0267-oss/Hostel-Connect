import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
} from "react";

const NotificationContext = createContext();

const initialState = [
  {
    id: 1,
    title: "Complaint Updated",
    message: "Your complaint has been marked as In Progress.",
    type: "Complaint",
    time: "10 mins ago",
    read: false,
  },
  {
    id: 2,
    title: "Leave Approved",
    message: "Your leave request has been approved.",
    type: "Leave",
    time: "30 mins ago",
    read: false,
  },
  {
    id: 3,
    title: "New Hostel Notice",
    message: "A new hostel notice has been published.",
    type: "Notice",
    time: "1 hour ago",
    read: true,
  },
];

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [action.payload, ...state];

    case "MARK_AS_READ":
      return state.map((notification) =>
        notification.id === action.payload
          ? { ...notification, read: true }
          : notification
      );

    case "MARK_ALL_AS_READ":
      return state.map((notification) => ({
        ...notification,
        read: true,
      }));

    case "DELETE_NOTIFICATION":
      return state.filter(
        (notification) =>
          notification.id !== action.payload
      );

    default:
      return state;
  }
};

export const NotificationProvider = ({
  children,
}) => {
  const [notifications, dispatch] =
    useReducer(
      notificationReducer,
      initialState
    );

  const addNotification = (notification) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: notification,
    });
  };

  const markAsRead = (id) => {
    dispatch({
      type: "MARK_AS_READ",
      payload: id,
    });
  };

  const markAllAsRead = () => {
    dispatch({
      type: "MARK_ALL_AS_READ",
    });
  };

  const deleteNotification = (id) => {
    dispatch({
      type: "DELETE_NOTIFICATION",
      payload: id,
    });
  };

  const value = useMemo(() => ({
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  }), [notifications]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () =>
  useContext(NotificationContext);