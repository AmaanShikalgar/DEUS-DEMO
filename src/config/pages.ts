import { site } from './site';

type Block = { heading?: string; text: string; href?: string };
export type PageContent = { title: string; image?: string; blocks: Block[] };

/** Copy for /pages/[slug]. Slugs not listed here show placeholder text. */
export const pages: Record<string, PageContent> = {
  'about-us': {
    title: 'MORE THAN ESSENTIALS.',
    image: '/images/About_Banner.png',
    blocks: [
      { text: "DEUS was started with one belief: a wardrobe doesn't need to be large to be complete." },
      { text: 'Most clothing today is designed to be replaced. We wanted to build the opposite: a small, considered catalogue of pieces made from better materials, cut with more precision, and priced to reflect what they actually cost to make well.' },
      { heading: 'Intention', text: 'Nothing is added for the sake of decoration. What stays on a DEUS garment has earned its place.' },
      { heading: 'Material', text: 'Every fabric is chosen for how it wears, not just how it photographs.' },
      { heading: 'Longevity', text: 'Seams are constructed to hold under repeated wear, and every silhouette is cut to move with the body.' },
      { text: 'This is the first look at DEUS.' },
    ],
  },
  contact: {
    title: "LET'S TALK.",
    blocks: [
      { text: 'For product questions, press, or partnership enquiries, reach us directly. We read every message.' },
      { text: site.email, href: `mailto:${site.email}` },
      { text: site.instagram.handle, href: site.instagram.url },
    ],
  },
};
