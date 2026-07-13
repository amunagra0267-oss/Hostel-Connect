import React from "react";
import { useStudent } from "../../context/StudentContext";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";

const DigitalID = () => {
  const { student } = useStudent();

  const downloadID = () => {
    alert("Download PDF feature will be added later.");
  };

  return (
    <div>
      <PageHeader
        eyebrow="IDENTIFICATION"
        title="Digital Hostel ID Card"
        description="Your official hostel identification"
      />

      {/* ID Card */}
      <div className="bg-gradient-to-br from-primary/15 to-surface border border-primary/30 rounded-lg p-unit-lg mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-lg bg-surface-container-high flex items-center justify-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Student"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-on-surface mb-2">{student.name}</h2>
            <div className="space-y-2">
              <p className="text-on-surface-variant">
                <span className="font-semibold text-on-surface">Student ID:</span> {student.studentId}
              </p>
              <p className="text-on-surface-variant">
                <span className="font-semibold text-on-surface">Branch:</span> {student.branch}
              </p>
              <p className="text-on-surface-variant">
                <span className="font-semibold text-on-surface">Year:</span> {student.year}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Room Information Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-6">Room Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Hostel</p>
            <p className="text-lg font-semibold text-on-surface">{student.hostel}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Block</p>
            <p className="text-lg font-semibold text-on-surface">{student.block}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Room Number</p>
            <p className="text-lg font-semibold text-on-surface">{student.room}</p>
          </div>
        </div>
      </div>

      {/* QR Code Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8 flex flex-col items-center">
        <h3 className="text-xl font-bold text-on-surface mb-6">QR Code</h3>
        <div className="w-40 h-40 rounded-lg bg-surface-container-high flex items-center justify-center mb-6">
          <Icon name="qr_code_2" className="text-on-surface-variant" size={60} />
        </div>
        <p className="text-sm text-on-surface-variant text-center mb-4">Scan this QR code for quick entry verification</p>
      </div>

      {/* Download Button */}
      <Button
        icon={<Icon name="download" size={18} />}
        onClick={downloadID}
        className="w-full justify-center"
      >
        Download ID Card as PDF
      </Button>
    </div>
  );
};

export default DigitalID;