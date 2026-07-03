import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {

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