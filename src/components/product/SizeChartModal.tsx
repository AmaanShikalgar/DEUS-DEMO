'use client';
import { useEffect, useState } from 'react';
import { CloseIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/format';

/** Placeholder measurements: replace rows with the client's real size guide. */
const rows = [['S', '00', '00', '00'], ['M', '00', '00', '00'], ['L', '00', '00', '00'], ['XL', '00', '00', '00']];

export function SizeChartModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('modal-open', open);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('modal-open'); };
  }, [open]);

  return (
    <>
      <button type="button" className="product-page__size-chart-btn" onClick={() => setOpen(true)}>Size chart</button>
      <div className={cn('product-page__size-chart-modal', open && 'is-open')} aria-hidden={!open} role="dialog" aria-label="Size chart">
        <div className="product-page__size-chart-overlay" onClick={() => setOpen(false)} />
        <div className="product-page__size-chart-panel">
          <div className="product-page__size-chart-header">
            <h3 className="product-page__size-chart-title">SIZE CHART</h3>
            <button className="product-page__size-chart-close" onClick={() => setOpen(false)} aria-label="Close size chart"><CloseIcon /></button>
          </div>
          <div className="product-page__size-chart-body">
            <table className="product-page__size-chart-table">
              <thead><tr><th>Size</th><th>Waist (in)</th><th>Hip (in)</th><th>Length (in)</th></tr></thead>
              <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
            </table>
            <p className="product-page__size-chart-note">Placeholder measurements. Update with the real size guide.</p>
          </div>
        </div>
      </div>
    </>
  );
}
