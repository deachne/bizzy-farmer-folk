
import React from "react";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variant = status === 'active'
    ? 'bg-green-100 text-green-800 border-green-200'
    : 'bg-red-100 text-red-800 border-red-200';
    
  return (
    <Badge variant="outline" className={variant}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
