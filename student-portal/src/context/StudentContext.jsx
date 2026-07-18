import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const { user: authUser } = useAuth();

  const [student, setStudent] = useState({
    id: "ST101",
    name: "Kamakshi",
    email: "student@gmail.com",
    phone: "9876543210",

    branch: "Computer Science",
    year: "3rd Year",

    hostel: "Girls Hostel A",
    block: "A",
    room: "A-204",

    parentContact: "9876543200",
    emergencyContact: "9999999999",

    attendance: "In Hostel",

    roomDetails: {
      floor: 2,
      capacity: 3,
      occupied: 2,
      roomStatus: "Good",
      cleanlinessScore: 9,
      lastCleaning: "30 June 2026",
    },

    roommates: [
      {
        id: 1,
        name: "Riya Sharma",
        branch: "MBA",
      },
      {
        id: 2,
        name: "Anjali Gupta",
        branch: "Computer Science",
      },
    ],
  });

  // Keep identity fields in sync with whoever is actually logged in,
  // instead of always showing this hardcoded placeholder student.
  useEffect(() => {
    if (authUser) {
      setStudent((previous) => ({
        ...previous,
        id: authUser.id || previous.id,
        name: authUser.name || previous.name,
        email: authUser.email || previous.email,
        hostel: authUser.hostel || previous.hostel,
        block: authUser.block || previous.block,
        room: authUser.room || previous.room,
        phone: authUser.phone || previous.phone,
      }));
    }
  }, [authUser]);

  const updateStudent = useCallback((updatedData) => {
    setStudent((previous) => ({
      ...previous,
      ...updatedData,
    }));
  }, []);

  const value = useMemo(() => {
    return {
      student,
      updateStudent,
    };
  }, [student, updateStudent]);

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  return useContext(StudentContext);
};