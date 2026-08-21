import {
  AlertTriangle,
  ArrowUp,
  CircleAlert,
  CheckCircle,
  Minus,
} from "lucide-react";

function PriorityBadge({ priority }) {
  const normalized = priority?.toLowerCase();

  const config = {
    emergency: {
      className: "priority-emergency",
      icon: CircleAlert,
    },
    urgent: {
      className: "priority-urgent",
      icon: AlertTriangle,
    },
    high: {
      className: "priority-high",
      icon: ArrowUp,
    },
    medium: {
      className: "priority-medium",
      icon: Minus,
    },
    low: {
      className: "priority-low",
      icon: CheckCircle,
    },
  };

  const item = config[normalized] || config.medium;
  const Icon = item.icon;

  return (
    <span className={`priority-badge ${item.className}`}>
      <Icon size={12} />
      {priority}
    </span>
  );
}

export default PriorityBadge;