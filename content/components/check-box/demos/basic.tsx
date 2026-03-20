export default function BasicCheckBoxDemo() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <label style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input type="checkbox" defaultChecked />
        <span style={{ fontSize: 14 }}>Send me product updates</span>
      </label>

      <label style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input type="checkbox" />
        <span style={{ fontSize: 14 }}>I agree to the terms</span>
      </label>

      <label
        style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#6b7280' }}
      >
        <input type="checkbox" disabled defaultChecked />
        <span style={{ fontSize: 14 }}>Disabled option</span>
      </label>
    </div>
  );
}
