import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useVisitor } from "../../context/VisitorContext";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";

const inputClass =
  "w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors";
const labelClass =
  "block font-label-md text-label-md text-on-surface-variant mb-1.5";

const RequestVisitor = () => {
  const navigate = useNavigate();
  const { addVisitor } = useVisitor();

  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    phone: "",
    date: "",
    time: "",
    purpose: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.relation ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.purpose
    ) {
      alert("Please fill all fields");
      return;
    }

    addVisitor({
      id: Date.now(),
      ...formData,
      status: "Pending",
    });

    alert("Visitor Pass Requested Successfully");
    navigate("/visitor");
  };

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Access Management"
        title="Request Visitor Pass"
        description="Fill in your guest's details for hostel approval."
      />

      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-outline-variant rounded-lg p-unit-lg flex flex-col gap-4"
      >
        <div>
          <label className={labelClass}>Visitor Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Ramesh Sharma"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Relation</label>
          <input
            type="text"
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            placeholder="e.g. Father, Friend"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Visit Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Visit Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Purpose of Visit</label>
          <textarea
            rows="4"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Briefly describe the purpose"
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" icon={<Icon name="send" size={18} />}>
            Request Pass
          </Button>
          <Button variant="secondary" type="button" onClick={() => navigate("/visitor")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestVisitor;
