import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../apiClient";
import { useAuth } from "./AuthContext";

const NoticeContext = createContext();

export const NoticeProvider = ({ children }) => {
  const { token } = useAuth();
  const [notices, setNotices] = useState([]);

  const refresh = useCallback(() => {
    if (!token) return;
    api
      .getNotices(token)
      .then(setNotices)
      .catch((err) => console.warn("Could not load notices:", err.message));
  }, [token]);

  useEffect(() => { refresh(); }, [refresh]);

  const markAsRead = (id) => {
    setNotices((previous) =>
      previous.map((notice) =>
        notice.id === id
          ? { ...notice, read: true }
          : notice
      )
    );
    api.markNoticeRead(id, token).catch((err) => console.warn("Could not sync read receipt:", err.message));
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