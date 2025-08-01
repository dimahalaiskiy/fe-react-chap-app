import { User } from "@/types";
import { generateAvatar } from "@/utils/generateGradient";
import { ImageAvatar } from "./avatar.styled";

type AvatarProps = {
  user: User;
  size?: number;
};

export const Avatar: React.FC<AvatarProps> = ({ user, size = 32 }) => {
  if (!user.avatar) {
    return (
      <span
        style={{ height: `${size}px`, width: `${size}px` }}
        dangerouslySetInnerHTML={{ __html: generateAvatar(user.id || "0", size) }}
      ></span>
    );
  }
  return <ImageAvatar src={user.avatar} alt="avatar" size={size} />;
};
