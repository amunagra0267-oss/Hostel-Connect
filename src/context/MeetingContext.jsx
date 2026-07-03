import React, {
  createContext,
  useContext,
  useState,
} from "react";

const MeetingContext = createContext();

export const MeetingProvider = ({
  children,
}) => {
  const [meetings] = useState([
    {
      id: 1,
      title: "Monthly Hostel Meeting",
      date: "2026-07-05",
      time: "05:00 PM",
      venue: "Hostel Auditorium",
      conductedBy: "Hostel Warden",
      description:
        "Discussion regarding hostel rules, cleanliness and upcoming events.",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Emergency Safety Meeting",
      date: "2026-07-12",
      time: "06:00 PM",
      venue: "Common Hall",
      conductedBy: "Security Officer",
      description:
        "Fire safety awareness and emergency evacuation procedure.",
      status: "Upcoming",
    },
  ]);

  return (
    <MeetingContext.Provider
      value={{
        meetings,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = () =>
  useContext(MeetingContext);