import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import { useStudent } from "../../context/StudentContext";

import EditableField from "../../components/common/EditableField";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";

const Profile = () => {
  const { student, updateStudent } = useStudent();

  const [formData, setFormData] = useState(student);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormData(student);
  }, [student]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }, []);


  const handleSave = useCallback(() => {
    updateStudent(formData);

    setIsEditing(false);

    alert("Profile Updated Successfully");
  }, [formData, updateStudent]);


  const handleCancel = () => {
    setFormData(student);

    setIsEditing(false);
  };


  const totalFields = useMemo(() => {
    return Object.keys(formData).length;
  }, [formData]);

  return (
    <div>
      <PageHeader
        eyebrow="ACCOUNT"
        title="My Profile"
        description="View and manage your profile information"
      />

      {/* Profile Picture and Basic Info */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Student"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-on-surface mb-2">{formData.name}</h2>
            <p className="text-on-surface-variant">Student ID: {formData.id}</p>
            <p className="text-on-surface-variant">{formData.email}</p>
          </div>
        </div>

        {/* Edit/Save Buttons */}
        <div className="flex gap-3">
          {!isEditing ? (
            <>
              <Button
                onClick={() => setIsEditing(true)}
                icon={<Icon name="edit" size={18} />}
              >
                Edit Profile
              </Button>
              <Button
                variant="secondary"
                icon={<Icon name="lock" size={18} />}
              >
                Change Password
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleSave}
                icon={<Icon name="check" size={18} />}
              >
                Save Changes
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                icon={<Icon name="close" size={18} />}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-6">Personal Information</h3>
        <div className="space-y-4">
          <EditableField
            label="Student ID"
            name="id"
            value={formData.id}
            disabled
          />

          <EditableField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <EditableField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <EditableField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Academic Information */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-6">Academic Information</h3>
        <div className="space-y-4">
          <EditableField
            label="Branch"
            name="branch"
            value={formData.branch}
            disabled
          />

          <EditableField
            label="Year"
            name="year"
            value={formData.year}
            disabled
          />

          <EditableField
            label="Attendance"
            name="attendance"
            value={formData.attendance}
            disabled
          />
        </div>
      </div>

      {/* Hostel Information */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-6">Hostel Information</h3>
        <div className="space-y-4">
          <EditableField
            label="Hostel Name"
            name="hostel"
            value={formData.hostel}
            disabled
          />

          <EditableField
            label="Block"
            name="block"
            value={formData.block}
            disabled
          />

          <EditableField
            label="Room Number"
            name="room"
            value={formData.room}
            disabled
          />
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg">
        <h3 className="text-xl font-bold text-on-surface mb-6">Emergency Contacts</h3>
        <div className="space-y-4">
          <EditableField
            label="Parent Contact"
            name="parentContact"
            value={formData.parentContact}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <EditableField
            label="Emergency Contact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;