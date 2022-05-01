interface AvatarPlaceholderProps {
  color?: string;
  name?: string;
}

export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({ color = 'var(--grey75)', name = 'R' }) => {
  return (
    <span className='ph_avatar' style={{ backgroundColor: color }}>
      <span className='ph_avatarLetter'>{name[0].toUpperCase()}</span>
    </span>
  );
};
