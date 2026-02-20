export default function BasicButtonDemo() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <button
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          fontWeight: 500,
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Solid Button
      </button>
      <button
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          fontWeight: 500,
          backgroundColor: 'transparent',
          color: '#2563eb',
          border: '1px solid #2563eb',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Outline Button
      </button>
      <button
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          fontWeight: 500,
          backgroundColor: 'transparent',
          color: '#374151',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Ghost Button
      </button>
    </div>
  );
}
