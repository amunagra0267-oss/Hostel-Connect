import React, { useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Icon from "../../components/icons/Icon";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How can I apply for leave?",
      answer: "Go to Leave > Apply Leave and submit the form. You can apply for up to 30 days of leave per semester. Your warden will review and approve the request.",
    },
    {
      id: 2,
      question: "How do I raise a complaint?",
      answer: "Open Complaints and click Raise Complaint. Select the category, add details, and optionally upload a photo. The complaint will be assigned to our maintenance team.",
    },
    {
      id: 3,
      question: "How do I request a visitor pass?",
      answer: "Open Visitor Pass and fill in visitor details. Your request will be processed and a digital pass will be issued for your guest's entry.",
    },
    {
      id: 4,
      question: "What if I lose my hostel ID?",
      answer: "Contact the hostel office immediately. You can also request an emergency digital ID from the ID Card section in the app.",
    },
    {
      id: 5,
      question: "How do I check the mess menu?",
      answer: "Go to Mess Menu to view today's meals and the complete weekly menu. You can also provide feedback on meals.",
    },
    {
      id: 6,
      question: "Can I change my room?",
      answer: "Room changes are processed during the semester break or special cases. Submit a request through My Room and wait for warden approval.",
    },
  ];

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div>
      <PageHeader
        eyebrow="HELP"
        title="Frequently Asked Questions"
        description="Find answers to common questions"
      />

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-surface border border-outline-variant rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleQuestion(faq.id)}
              className="w-full px-unit-lg py-4 flex items-center justify-between hover:bg-surface-container-low transition-colors"
            >
              <p className="text-left font-label-md text-label-md text-on-surface">
                {faq.question}
              </p>
              <Icon
                name={openQuestion === faq.id ? "expand_less" : "expand_more"}
                className="text-on-surface-variant flex-shrink-0"
                size={24}
              />
            </button>

            {openQuestion === faq.id && (
              <div className="px-unit-lg pb-4 border-t border-outline-variant">
                <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed pt-4">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;