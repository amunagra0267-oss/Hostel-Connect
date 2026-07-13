import React, { useMemo, useState } from "react";

import { useMess } from "../../context/MessContext";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";

const MEALS = [
  { key: "breakfast", label: "Breakfast", icon: "free_breakfast", time: "8:00 – 9:30 AM" },
  { key: "lunch", label: "Lunch", icon: "lunch_dining", time: "12:30 – 2:00 PM" },
  { key: "snacks", label: "Snacks", icon: "cookie", time: "5:00 PM" },
  { key: "dinner", label: "Dinner", icon: "dinner_dining", time: "8:00 – 9:30 PM" },
];

const inputClass =
  "w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors";

const MessMenu = () => {
  const { weeklyMenu, feedbacks, addFeedback } = useMess();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const today = useMemo(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = days[new Date().getDay()];
    return weeklyMenu.find((meal) => meal.day === currentDay) || weeklyMenu[0];
  }, [weeklyMenu]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      alert("Please select a rating");
      return;
    }
    addFeedback({ id: feedbacks.length + 1, rating, comment });
    setRating("");
    setComment("");
    alert("Feedback Submitted");
  };

  return (
    <div>
      <PageHeader eyebrow="Dining" title="Mess Menu" description="Today's meals, weekly schedule, and feedback." />

      {/* Today's meals */}
      <div className="mb-unit-lg">
        <h2 className="font-headline-sm text-headline-sm text-on-surface mb-3">
          Today's Meal — {today.day}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MEALS.map((meal) => (
            <div
              key={meal.key}
              className="bg-surface border border-outline-variant rounded-lg p-unit-md"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Icon name={meal.icon} className="text-primary" size={20} />
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">
                {meal.label}
              </p>
              <p className="font-label-md text-label-md text-on-surface mb-1">
                {today[meal.key]}
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {meal.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly menu */}
      <div className="mb-unit-lg">
        <h2 className="font-headline-sm text-headline-sm text-on-surface mb-3">
          Weekly Menu
        </h2>
        <div className="bg-surface border border-outline-variant rounded-lg overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-outline-variant">
                {["Day", "Breakfast", "Lunch", "Snacks", "Dinner"].map((h) => (
                  <th
                    key={h}
                    className="font-eyebrow text-eyebrow text-on-surface-variant uppercase px-unit-md py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklyMenu.map((meal) => (
                <tr
                  key={meal.day}
                  className={`border-b border-outline-variant last:border-0 ${
                    meal.day === today.day ? "bg-primary/5" : ""
                  }`}
                >
                  <td className="px-unit-md py-3 font-label-md text-label-md text-on-surface">
                    {meal.day}
                  </td>
                  <td className="px-unit-md py-3 font-body-md text-body-md text-on-surface-variant">
                    {meal.breakfast}
                  </td>
                  <td className="px-unit-md py-3 font-body-md text-body-md text-on-surface-variant">
                    {meal.lunch}
                  </td>
                  <td className="px-unit-md py-3 font-body-md text-body-md text-on-surface-variant">
                    {meal.snacks}
                  </td>
                  <td className="px-unit-md py-3 font-body-md text-body-md text-on-surface-variant">
                    {meal.dinner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback */}
      <div className="grid md:grid-cols-2 gap-unit-lg">
        <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">
            Meal Feedback
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className={inputClass}
            >
              <option value="">Select Rating</option>
              <option>⭐</option>
              <option>⭐⭐</option>
              <option>⭐⭐⭐</option>
              <option>⭐⭐⭐⭐</option>
              <option>⭐⭐⭐⭐⭐</option>
            </select>

            <textarea
              rows="3"
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={inputClass}
            />

            <Button type="submit" icon={<Icon name="send" size={18} />} className="self-start">
              Submit Feedback
            </Button>
          </form>
        </div>

        <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">
            Previous Feedback
          </h2>
          {feedbacks.length === 0 ? (
            <p className="font-body-md text-body-md text-on-surface-variant">
              No feedback submitted yet.
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-outline-variant">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="py-3">
                  <p className="font-label-md text-label-md text-on-surface">
                    {feedback.rating}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {feedback.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessMenu;
