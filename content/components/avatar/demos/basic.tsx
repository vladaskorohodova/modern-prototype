function Avatar({ size, label }: { size: number; label: string }) {
  return (
    <div
      aria-label={label}
      role="img"
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: '#111827',
        color: 'white',
        display: 'grid',
        placeItems: 'center',
        fontWeight: 700,
        letterSpacing: 0.5,
        userSelect: 'none',
      }}
    >
      {label}
    </div>
  );
}

export default function BasicAvatarDemo() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar size={32} label="VS" />
      <Avatar size={40} label="VS" />
      <Avatar size={56} label="VS" />
      <span style={{ color: '#6b7280', fontSize: 14 }}>
        Fallback initials when no image is available
      </span>
    </div>
  );
}
