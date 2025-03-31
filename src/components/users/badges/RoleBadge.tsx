
import React from "react";
import { Badge } from "@/components/ui/badge";

interface RoleBadgeProps {
  role: string;
}

const RoleBadge = ({ role }: RoleBadgeProps) => {
  const variant = role === 'admin' 
    ? 'bg-blue-500 text-white' 
    : role === 'moderator' 
      ? 'bg-green-500 text-white' 
      : 'bg-gray-200 text-gray-700';
  
  return (
    <Badge className={`${variant} font-normal`}>
      {role}
    </Badge>
  );
};

export default RoleBadge;
