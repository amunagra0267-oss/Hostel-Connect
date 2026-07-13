import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const NoticeContext = createContext();

export const NoticeProvider = ({ children }) => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Electricity Maintenance",
      description:
        "Electricity will be unavailable from 2 PM to 4 PM today.",
      date: "2026-07-02",
      important: true,
      read: false,
    },
    {
      id: 2,
      title: "Mess Timing Updated",
      description:
        "Dinner timing has been changed to 8:30 PM.",
      date: "2026-07-03",
      important: false,
      read: false,
    },
    {
      id: 3,
      title: "Hostel Gate Closing",
      description:
        "Hostel gate will close at 9 PM every day.",
      date: "2026-07-04",
      important: true,
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotices((previous) =>
      previous.map((notice) =>
        notice.id === id
          ? { ...notice, read: true }
          : notice
      )
    );
  };

  const value = useMemo(() => {
    return {
      notices,
      markAsRead,
    };
  }, [notices]);

  return (
    <NoticeContext.Provider value={value}>
      {children}
    </NoticeContext.Provider>
  );
};

export const useNotice = () => {
  return useContext(NoticeContext);
};