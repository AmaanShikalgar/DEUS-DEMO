import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="section-padding"><div className="container" style={{ textAlign: 'center' }}>
      <h1 className="section-header__heading">PAGE NOT FOUND</h1>
      <p style={{ margin: '1rem 0 2rem', color: 'var(--color-text-secondary)' }}>That page doesn&apos;t exist.</p>
      <Link href="/" className="btn btn--primary">BACK HOME</Link>
    </div></section>
  );
}
