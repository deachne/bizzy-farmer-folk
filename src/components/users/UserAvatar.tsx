
import React from "react";

interface UserAvatarProps {
  initial: string;
  role: string;
}

const UserAvatar = ({ initial, role }: UserAvatarProps) => {
  const bgColor = role === 'admin' 
    ? 'bg-blue-100' 
    : role === 'moderator' 
      ? 'bg-green-100' 
      : 'bg-gray-100';
  
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bgColor} text-sm font-medium`}>
      {initial}
    </div>
  );
};

export default UserAvatar;
