import { pages } from '@/config/pages';
import { Img } from '@/components/ui/Img';

/** Static content pages (about, contact, policies). Later: pull from Shopify `page(handle:)` or a CMS. */
export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  return (
    <section className="section-padding">
      <div className="container" style={{ maxWidth: 'var(--page-width-narrow)' }}>
        <div className="section-header">
          <h1 className="section-header__heading">{page?.title ?? slug.replace(/-/g, ' ').toUpperCase()}</h1>
        </div>
        {page?.image && <Img src={page.image} alt={page.title} style={{ width: '100%', marginBottom: 'var(--space-2xl)' }} />}
        <div className="rte">
          {page ? (
            page.blocks.map((b, i) => (
              <div key={i}>
                {b.heading && <h2>{b.heading}</h2>}
                <p>{b.href ? <a href={b.href}>{b.text}</a> : b.text}</p>
              </div>
            ))
          ) : (
            <p>Content for this page is still to come.</p>
          )}
        </div>
      </div>
    </section>
  );
}
