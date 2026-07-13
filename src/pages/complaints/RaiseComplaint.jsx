import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useComplaint } from "../../context/ComplaintContext";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";

const RaiseComplaint = () => {
  const navigate = useNavigate();

  const { addComplaint } = useComplaint();

  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    category: "Electrical",
    title: "",
    description: "",
    priority: "Normal",
    photo: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((previous) => ({
      ...previous,
      photo: file.name,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.title.trim() === "" ||
      formData.description.trim() === ""
    ) {
      alert("Please fill all required fields");

      return;
    }

    const complaint = {
      id: Date.now(),

      ...formData,

      status: "Pending",

      createdAt: new Date().toLocaleDateString(),
    };

    addComplaint(complaint);

    alert("Complaint Submitted Successfully");

    navigate("/complaints");
  };


  const inputClass =
    "w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors";
  const labelClass =
    "block font-label-md text-label-md text-on-surface-variant mb-1.5";

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="MAINTENANCE"
        title="Raise Complaint"
        description="Report an issue in your room or hostel area"
      />

      <form onSubmit={handleSubmit} className="bg-surface border border-outline-variant rounded-lg p-unit-lg flex flex-col gap-4">
        <div>
          <label className={labelClass}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Electrical</option>
            <option>Water</option>
            <option>Furniture</option>
            <option>Internet</option>
            <option>Cleaning</option>
            <option>Bathroom</option>
            <option>Others</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Complaint Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Brief title of the issue"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the issue in detail"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Normal</option>
            <option>Urgent</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Upload Photo (Optional)</label>
          <input
            ref={fileRef}
            type="file"
            onChange={handlePhoto}
            className="w-full text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-surface-container-low file:text-on-surface hover:file:bg-surface-container-high transition-colors"
          />
          {formData.photo && (
            <p className="text-on-surface-variant text-sm mt-2">
              Selected File: {formData.photo}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" icon={<Icon name="send" size={18} />}>
            Submit Complaint
          </Button>
          <Button variant="secondary" type="button" onClick={() => navigate("/complaints")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RaiseComplaint;