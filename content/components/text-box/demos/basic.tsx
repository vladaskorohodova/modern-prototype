export default function BasicTextBoxDemo() {
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
      <label style={{ display: 'grid', gap: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Email</span>
        <input
          type="email"
          placeholder="name@company.com"
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #d1d5db',
            outline: 'none',
            fontSize: 14,
          }}
        />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Disabled</span>
        <input
          disabled
          value="Read-only"
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            background: '#f9fafb',
            color: '#6b7280',
            fontSize: 14,
          }}
          readOnly
        />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Error</span>
        <input
          defaultValue="not-an-email"
          aria-invalid="true"
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #ef4444',
            outline: 'none',
            fontSize: 14,
          }}
        />
        <span style={{ fontSize: 12, color: '#b91c1c' }}>Enter a valid email.</span>
      </label>
    </div>
  );
}
