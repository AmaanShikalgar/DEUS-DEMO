'use client';
import { useState, type FormEvent } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowIcon } from '@/components/ui/Icons';
import './Newsletter.css';

type Status = 'idle' | 'success' | 'error';

export function Newsletter({ heading = 'STAY IN THE LOOP', subheading = 'New releases, straight to your inbox.' }) {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email');
    // TODO: connect to Shopify (customerCreate with acceptsMarketing) or an email provider like Klaviyo.
    console.info('newsletter signup (not yet connected):', email);
    setStatus('success');
    e.currentTarget.reset();
  }

  return (
    <section className="newsletter section-padding">
      <ScrollReveal className="container">
        <div className="newsletter__inner">
          <div className="newsletter__content" data-scroll-reveal-child>
            <h2 className="newsletter__heading">{heading}</h2>
            <p className="newsletter__subheading">{subheading}</p>
          </div>
          <div className="newsletter__form-wrapper" data-scroll-reveal-child>
            <form className="newsletter__form" onSubmit={onSubmit}>
              <div className="newsletter__input-group">
                <input type="email" name="email" className="newsletter__input" placeholder="Enter your email" required autoComplete="email" aria-label="Email address" />
                <button type="submit" className="newsletter__submit btn btn--primary">SUBSCRIBE<ArrowIcon /></button>
              </div>
              {status === 'success' && <p className="newsletter__message newsletter__message--success">Thanks for subscribing!</p>}
              {status === 'error' && <p className="newsletter__message newsletter__message--error">Something went wrong. Please try again.</p>}
              <p className="newsletter__disclaimer">By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
