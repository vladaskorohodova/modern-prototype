import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.copy}>
            <div className={styles.eyebrow}>Modern React Library</div>
            <h1>Ship polished React interfaces without fighting the basics.</h1>
            <p>
              A clean component library for product teams that want fast assembly,
              consistent states, and interfaces that feel intentional from day one.
            </p>

            <div className={styles.ctas}>
              <Link className={`${styles.ctaButton} ${styles.primaryButton}`} href="/docs">
                Explore components
              </Link>
              <Link
                className={`${styles.ctaButton} ${styles.secondaryButton}`}
                href="/docs/get-started/installation"
              >
                Get started
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.showcaseSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Core building blocks</p>
            <h2>Everything you need to assemble a calm, usable interface.</h2>
          </div>

          <div className={styles.grid}>
            <article className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardLabel}>Button</span>
                <Link href="/docs/components/button">View Button</Link>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardText}>Action styles for decisive primary flows and quieter secondary moments.</p>
                <div className={styles.buttonStack}>
                  <button className={styles.buttonSolid} type="button">
                    Save changes
                  </button>
                  <button className={styles.buttonOutline} type="button">
                    Cancel
                  </button>
                </div>
              </div>
            </article>

            <article className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardLabel}>Accordion</span>
                <Link href="/docs/components/accordion">View Accordion</Link>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardText}>Progressive disclosure for settings, FAQs, and long-form product content.</p>
                <details open className={styles.cardAccordion}>
                  <summary>Keyboard support</summary>
                  <p>Tab into the header, then use Enter or Space to toggle.</p>
                </details>
              </div>
            </article>

            <article className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardLabel}>TextBox</span>
                <Link href="/docs/components/text-box">View TextBox</Link>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardText}>Single-line input that keeps labels, values, and validation easy to read.</p>
                <label className={styles.field}>
                  <span>Workspace name</span>
                  <input type="text" defaultValue="Modern Prototype" />
                </label>
              </div>
            </article>

            <article className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardLabel}>CheckBox</span>
                <Link href="/docs/components/check-box">View CheckBox</Link>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardText}>Straightforward toggles for preferences, consent, and lightweight settings.</p>
                <label className={styles.checkRow}>
                  <input type="checkbox" defaultChecked />
                  <span>Enable weekly digest</span>
                </label>
                <label className={styles.checkRow}>
                  <input type="checkbox" />
                  <span>Archive notifications</span>
                </label>
              </div>
            </article>

            <article className={`${styles.card} ${styles.cardWide}`}>
              <div className={styles.cardTop}>
                <span className={styles.cardLabel}>Avatar</span>
                <Link href="/docs/components/avatar">View Avatar</Link>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardText}>Identity markers that stay readable with images, initials, and mixed team lists.</p>
                <div className={styles.teamRow}>
                  <div className={styles.teamMember}>
                    <span className={styles.avatarMedium}>NS</span>
                    <div>
                      <strong>Natasha</strong>
                      <p>Lead</p>
                    </div>
                  </div>
                  <div className={styles.teamMember}>
                    <span className={styles.avatarMedium}>WA</span>
                    <div>
                      <strong>Wanda</strong>
                      <p>Frontend</p>
                    </div>
                  </div>
                  <div className={styles.teamMember}>
                    <span className={styles.avatarMedium}>OK</span>
                    <div>
                      <strong>Okoye</strong>
                      <p>QA</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
