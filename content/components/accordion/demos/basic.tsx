export default function BasicAccordionDemo() {
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
      <details
        open
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: '10px 12px',
          background: '#fff',
        }}
      >
        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
          What is this?
        </summary>
        <div style={{ marginTop: 8, color: '#374151', lineHeight: 1.6 }}>
          An accordion groups related content into collapsible sections.
        </div>
      </details>

      <details
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: '10px 12px',
          background: '#fff',
        }}
      >
        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
          Keyboard support
        </summary>
        <div style={{ marginTop: 8, color: '#374151', lineHeight: 1.6 }}>
          Use Tab to focus the header and Enter/Space to toggle.
        </div>
      </details>

      <details
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: '10px 12px',
          background: '#fff',
        }}
      >
        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
          When to use
        </summary>
        <div style={{ marginTop: 8, color: '#374151', lineHeight: 1.6 }}>
          When you want to reduce scrolling and reveal details on demand.
        </div>
      </details>
    </div>
  );
}
