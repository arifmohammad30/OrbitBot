import React from 'react';

interface QuickActionsProps {
  onQuickAction: (action: string) => void;
  disabled?: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onQuickAction, disabled = false }) => {
  const quickActions = [
    "INSAT-3DR features",
    "Weather monitoring",
    "Spatial resolution",
    "Data download",
    "Real-time imagery",
    "Cyclone tracking"
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4 animate-fade-in-up">
      {quickActions.map((action, index) => (
        <button
          key={index}
          onClick={() => onQuickAction(action)}
          disabled={disabled}
          className="quick-action disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {action}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;