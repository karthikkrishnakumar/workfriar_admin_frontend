import React from "react";
import { Avatar } from "antd";

interface TeamMember {
  name: string;
  avatar?: string | null;
}

interface TeamAvatarProps {
  team: TeamMember[];
}


const AvatarGroup: React.FC<TeamAvatarProps> = ({ team }) => {
  return (
    <Avatar.Group
          size="large"
          max={{
            count: 5,
            style: { color: "#000000", backgroundColor: "#E9D6B9", cursor: "pointer", fontSize: "14px", fontWeight: "400"
             },
            popover: { trigger: "click" },
          }}
        >
          {team.map((member, index) => (
             <Avatar
             key={index}
             src={member.avatar || undefined} 
             style={!member.avatar ? { color: "#000000",  backgroundColor: "#E9D6B9" } : undefined} 
           >
             {!member.avatar && member.name[0].toUpperCase()}
           </Avatar>
          ))}
        </Avatar.Group>
  );
};

export default AvatarGroup;
