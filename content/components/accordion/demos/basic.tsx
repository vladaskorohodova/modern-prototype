export default function BasicAccordionDemo() {
  const itemStyle = {
    border: '1px solid var(--color-border)',
    borderRadius: 8,
    padding: '10px 12px',
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
  };

  const bodyStyle = {
    marginTop: 8,
    color: 'var(--color-text-muted)',
    lineHeight: 1.6,
  };

  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
      <details open style={itemStyle}>
        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
          What is this?
        </summary>
        <div style={bodyStyle}>
          An accordion groups related content into collapsible sections.
        </div>
      </details>

      <details style={itemStyle}>
        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
          Keyboard support
        </summary>
        <div style={bodyStyle}>
          Use Tab to focus the header and Enter/Space to toggle.
        </div>
      </details>

      <details style={itemStyle}>
        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
          When to use
        </summary>
        <div style={bodyStyle}>
          When you want to reduce scrolling and reveal details on demand.
        </div>
      </details>
    </div>
  );
}
