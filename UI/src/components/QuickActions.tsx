import React from 'react';

interface QuickActionsProps {
  onQuickAction: (faqQuestion: string) => void;
  disabled?: boolean;
}

const importantFAQs = [
  "How to register on MOSDAC?",
  "Can anonymous users (without username/password) download data?",
  "How to download data?"
];

const QuickActions: React.FC<QuickActionsProps> = ({ onQuickAction, disabled = false }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 animate-fade-in-up">
      {importantFAQs.map((question, index) => (
        <button
          key={index}
          onClick={() => onQuickAction(question)}
          disabled={disabled}
          className="quick-action disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;