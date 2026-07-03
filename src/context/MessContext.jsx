import React, {
  createContext,
  useContext,
  useState,
} from "react";

const MessContext = createContext();

export const MessProvider = ({
  children,
}) => {
  const [weeklyMenu] = useState([
    {
      day: "Monday",
      breakfast: "Poha + Tea",
      lunch: "Dal Rice Roti",
      snacks: "Sandwich",
      dinner: "Paneer + Naan",
    },
    {
      day: "Tuesday",
      breakfast: "Aloo Paratha",
      lunch: "Rajma Rice",
      snacks: "Samosa",
      dinner: "Mix Veg + Roti",
    },
    {
      day: "Wednesday",
      breakfast: "Upma",
      lunch: "Chole Rice",
      snacks: "Bread Pakora",
      dinner: "Dal Fry + Rice",
    },
    {
      day: "Thursday",
      breakfast: "Idli",
      lunch: "Kadhi Chawal",
      snacks: "Biscuits + Tea",
      dinner: "Shahi Paneer",
    },
    {
      day: "Friday",
      breakfast: "Sandwich",
      lunch: "Veg Biryani",
      snacks: "Burger",
      dinner: "Dal Makhani",
    },
    {
      day: "Saturday",
      breakfast: "Poori Sabzi",
      lunch: "Rice + Dal",
      snacks: "Noodles",
      dinner: "Paneer Butter Masala",
    },
    {
      day: "Sunday",
      breakfast: "Chole Bhature",
      lunch: "Special Thali",
      snacks: "Cold Coffee",
      dinner: "Fried Rice",
    },
  ]);

  const [feedbacks, setFeedbacks] =
    useState([]);

  const addFeedback = (feedback) => {
    setFeedbacks((prev) => [
      ...prev,
      feedback,
    ]);
  };

  return (
    <MessContext.Provider
      value={{
        weeklyMenu,
        feedbacks,
        addFeedback,
      }}
    >
      {children}
    </MessContext.Provider>
  );
};

export const useMess = () =>
  useContext(MessContext);