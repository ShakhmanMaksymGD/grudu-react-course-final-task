import React from "react";
import "./Avatar.css";

type AvatarProps = {
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const getInitials = (): string => {
    const [firstName, lastName] = name.trim().split(' ');
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  return (
    <div className="grudu-avatar">
      {getInitials()}
    </div>
  );
};

export default Avatar;