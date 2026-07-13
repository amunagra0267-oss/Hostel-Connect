import React from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";

const EmergencyContacts = () => {
  const contacts = [
    {
      id: 1,
      name: "Hostel Warden",
      phone: "9876543210",
      icon: "admin_panel_settings",
      color: "primary",
    },
    {
      id: 2,
      name: "Security Office",
      phone: "9876543211",
      icon: "security",
      color: "blue",
    },
    {
      id: 3,
      name: "Reception",
      phone: "9876543212",
      icon: "call",
      color: "amber",
    },
    {
      id: 4,
      name: "Medical Emergency",
      phone: "108",
      icon: "emergency",
      color: "red",
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="SUPPORT"
        title="Emergency Contacts"
        description="Quick access to important hostel contacts"
      />

      <div className="space-y-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-surface border border-outline-variant rounded-lg p-unit-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                contact.color === 'primary' ? 'bg-primary/10' :
                contact.color === 'blue' ? 'bg-blue-500/10' :
                contact.color === 'amber' ? 'bg-amber-500/10' :
                'bg-red-500/10'
              }`}>
                <Icon
                  name={contact.icon}
                  className={
                    contact.color === 'primary' ? 'text-primary' :
                    contact.color === 'blue' ? 'text-blue-500' :
                    contact.color === 'amber' ? 'text-amber-500' :
                    'text-red-500'
                  }
                  size={24}
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-on-surface">{contact.name}</p>
                <p className="text-on-surface-variant font-mono text-sm">{contact.phone}</p>
              </div>
            </div>

            <Button
              variant="secondary"
              size="small"
              onClick={() => window.location.href = `tel:${contact.phone}`}
              icon={<Icon name="phone" size={18} />}
            >
              Call
            </Button>
          </div>
        ))}
      </div>

      {/* Emergency Info Card */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-unit-lg mt-8">
        <div className="flex items-start gap-4">
          <Icon name="warning" className="text-red-500 flex-shrink-0" size={24} />
          <div>
            <h3 className="text-lg font-bold text-red-500 mb-2">Emergency Situation?</h3>
            <p className="text-red-500/80 text-sm">
              In case of life-threatening emergency, immediately call 108 (National Emergency Number) or alert the nearest authority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;