import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TableOfContents from '@/components/TableOfContents';
import styles from './layout.module.css';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
        <TableOfContents />
      </div>
    </div>
  );
}
