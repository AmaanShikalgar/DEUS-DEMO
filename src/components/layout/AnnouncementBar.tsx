import './AnnouncementBar.css';

/** How many times the message list is repeated inside one group, so a single group is always wider than the screen. */
const REPEAT = 4;
/** Seconds of scroll per character. Raise for slower, lower for faster. */
const SECONDS_PER_CHAR = 0.2;

/**
 * Continuously scrolling (right → left) marquee for offers / discounts.
 * Pure CSS animation: two identical groups side by side, the track slides
 * by exactly one group width (-50%) and loops seamlessly.
 */
export function AnnouncementBar({ messages }: { messages: readonly string[] }) {
  if (messages.length === 0) return null;

  const group = Array.from({ length: REPEAT }, () => messages).flat();
  const totalChars = messages.reduce((n, m) => n + m.length, 0);
  const duration = Math.max(20, Math.round(totalChars * REPEAT * SECONDS_PER_CHAR));

  return (
    <div className="announcement-bar" role="region" aria-label="Announcement">
      <div
        className="announcement-bar__track"
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="announcement-bar__group" aria-hidden={copy === 1 || undefined}>
            {group.map((m, i) => (
              <li key={i} className="announcement-bar__item">{m}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
