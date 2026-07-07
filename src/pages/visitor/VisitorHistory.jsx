import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useVisitor } from "../../context/VisitorContext";

const RequestVisitor = () => {
  const navigate = useNavigate();

  const { addVisitor, visitors } =
    useVisitor();

  const [form, setForm] = useState({
    name: "",
    relation: "",
    phone: "",
    date: "",
    time: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addVisitor({
      id: visitors.length + 1,
      ...form,
      status: "Pending",
    });

    navigate("/visitor");
  };

  return (
    <div>

      <h1>Request Visitor Pass</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Visitor Name"
          value={form.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="relation"
          placeholder="Relation"
          value={form.relation}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="purpose"
          placeholder="Purpose"
          value={form.purpose}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Submit Request
        </button>

      </form>

    </div>
  );
};

export default RequestVisitor;