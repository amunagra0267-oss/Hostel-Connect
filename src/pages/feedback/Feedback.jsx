import React, { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    type: "Suggestion",
    rating: 5,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors";
  const labelClass =
    "block font-label-md text-label-md text-on-surface-variant mb-1.5";

  const handleChange = (event) => {
    setFeedback({
      ...feedback,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(feedback);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFeedback({
      type: "Suggestion",
      rating: 5,
      message: "",
    });
  };

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="HELP & SUPPORT"
        title="Send Feedback"
        description="Help us improve HostelConnect with your valuable feedback"
      />

      {submitted && (
        <div className="mb-6 p-4 bg-primary/10 border border-primary rounded-lg">
          <p className="text-primary font-medium">✅ Thank you for your feedback!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-surface border border-outline-variant rounded-lg p-unit-lg flex flex-col gap-4">
        <div>
          <label className={labelClass}>Feedback Type</label>
          <select
            name="type"
            value={feedback.type}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Suggestion</option>
            <option>Complaint</option>
            <option>Report Issue</option>
            <option>App Feedback</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Rating</label>
          <select
            name="rating"
            value={feedback.rating}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Poor</option>
            <option value="1">⭐ Very Poor</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Message</label>
          <textarea
            rows="5"
            name="message"
            value={feedback.message}
            onChange={handleChange}
            placeholder="Please share your thoughts..."
            className={inputClass}
            required
          />
        </div>

        <Button type="submit" className="w-full justify-center">
          Submit Feedback
        </Button>
      </form>
    </div>
  );
};

export default Feedback;