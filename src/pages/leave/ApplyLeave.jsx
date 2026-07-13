import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLeave } from "../../context/LeaveContext";

const ApplyLeave = () => {
  const navigate = useNavigate();

  const { addLeave } = useLeave();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    destination: "",
    reason: "",
    emergencyContact: "",
    transport: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.from ||
      !formData.to ||
      !formData.destination ||
      !formData.reason ||
      !formData.emergencyContact ||
      !formData.transport
    ) {
      alert("Please fill all fields");
      return;
    }

    addLeave({
      id: Date.now(),

      ...formData,

      status: "Pending",

      appliedOn: new Date().toLocaleDateString(),

      remarks: "",
    });

    alert("Leave Applied Successfully");

    navigate("/leave");
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="max-w-2xl mx-auto p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Apply Leave</h1>
          <p className="text-on-surface-variant">Fill in your leave details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-surface-container p-6 rounded-lg border border-outline-variant">
          {/* From Date */}
          <div>
            <label className="block text-on-surface text-sm font-medium mb-2">From Date</label>
            <input
              type="date"
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-on-surface text-sm font-medium mb-2">To Date</label>
            <input
              type="date"
              name="to"
              value={formData.to}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-on-surface text-sm font-medium mb-2">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Enter destination"
              required
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-on-surface text-sm font-medium mb-2">Reason</label>
            <textarea
              rows="4"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter your reason for leave"
              required
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
            />
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-on-surface text-sm font-medium mb-2">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="Enter emergency contact number"
              required
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          {/* Transport */}
          <div>
            <label className="block text-on-surface text-sm font-medium mb-2">Transport</label>
            <select
              name="transport"
              value={formData.transport}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            >
              <option value="">Select transport mode</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Cab">Cab</option>
              <option value="Flight">Flight</option>
              <option value="Own Vehicle">Own Vehicle</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-3 rounded-lg transition duration-200 mt-8"
          >
            Apply Leave
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;