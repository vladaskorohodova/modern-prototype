export default function BasicButtonDemo() {
  const sharedButtonStyles = {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    fontWeight: 500,
    borderRadius: '6px',
    cursor: 'pointer',
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <button
        style={{
          ...sharedButtonStyles,
          backgroundColor: 'var(--color-link)',
          color: 'white',
          border: 'none',
        }}
      >
        Solid Button
      </button>
      <button
        style={{
          ...sharedButtonStyles,
          backgroundColor: 'transparent',
          color: 'var(--color-link)',
          border: '1px solid var(--color-link)',
        }}
      >
        Outline Button
      </button>
      <button
        style={{
          ...sharedButtonStyles,
          backgroundColor: 'transparent',
          color: 'var(--color-text-muted)',
          border: 'none',
        }}
      >
        Ghost Button
      </button>
    </div>
  );
}
