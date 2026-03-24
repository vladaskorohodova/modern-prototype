export default function BasicTextBoxDemo() {
  const errorMessageId = 'text-box-error-message';
  const labelStyle = { display: 'grid', gap: 6 };
  const captionStyle = { fontSize: 14, fontWeight: 600 };
  const inputStyle = {
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid var(--color-border-strong)',
    outline: 'none',
    fontSize: 14,
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
  };

  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
      <label style={labelStyle}>
        <span style={captionStyle}>Email</span>
        <input
          type="email"
          placeholder="name@company.com"
          style={inputStyle}
        />
      </label>

      <label style={labelStyle}>
        <span style={captionStyle}>Disabled</span>
        <input
          disabled
          value="Read-only"
          style={{
            ...inputStyle,
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface-muted)',
            color: 'var(--color-text-muted)',
          }}
          readOnly
        />
      </label>

      <label style={labelStyle}>
        <span style={captionStyle}>Error</span>
        <input
          defaultValue="not-an-email"
          aria-invalid="true"
          aria-describedby={errorMessageId}
          style={{
            ...inputStyle,
            border: '1px solid var(--color-danger-strong)',
          }}
        />
        <span id={errorMessageId} style={{ fontSize: 12, color: 'var(--color-danger)' }}>
          Enter a valid email.
        </span>
      </label>
    </div>
  );
}
