import styles from './PropsTable.module.css';

interface PropRow {
  name: string;
  type: string;
  defaultValue?: string;
  description?: string;
}

interface PropsTableProps {
  props: PropRow[];
}

export default function PropsTable({ props }: PropsTableProps) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, idx) => (
            <tr key={idx}>
              <td data-label="Prop">
                <code className={styles.propName}>{prop.name}</code>
              </td>
              <td data-label="Type">
                <code className={styles.propType}>{prop.type}</code>
              </td>
              <td data-label="Default">
                {prop.defaultValue && (
                  <code className={styles.propDefault}>{prop.defaultValue}</code>
                )}
              </td>
              <td data-label="Description">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
