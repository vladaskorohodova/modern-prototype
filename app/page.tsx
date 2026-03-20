import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ margin: 0 }}>Modern React Library</h1>
      <p style={{ marginTop: 12, marginBottom: 0 }}>
        <Link href="/docs/get-started/installation/">Open the docs</Link>
      </p>
    </main>
  );
}
