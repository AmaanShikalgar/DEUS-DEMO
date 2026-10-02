export function formatPrice(amount: string | number, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, minimumFractionDigits: Number(amount) % 1 === 0 ? 0 : 2 }).format(Number(amount));
}
export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');
