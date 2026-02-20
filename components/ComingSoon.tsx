import Link from 'next/link';
import styles from './ComingSoon.module.css';

interface ComingSoonProps {
  title: string;
  description: string;
  plannedSections: string[];
  overviewLink?: string;
}

export default function ComingSoon({
  title,
  description,
  plannedSections,
  overviewLink,
}: ComingSoonProps) {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.planned}>
        <h2>Planned sections</h2>
        <ul>
          {plannedSections.map((section, idx) => (
            <li key={idx}>{section}</li>
          ))}
        </ul>
      </div>
      {overviewLink && (
        <div className={styles.linkBack}>
          <Link href={overviewLink}>← Back to overview</Link>
        </div>
      )}
    </div>
  );
}
