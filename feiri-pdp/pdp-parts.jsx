/* global React */
// FEIRI PDP — shared helpers & micro-components.
const _F = window.FEIRIMilanoDesignSystem_bb8c6b || {};

// small-caps serif heading (the signature FEIRI display cue)
window.sc = (size, color = 'var(--ink)') => ({
  fontFamily: 'var(--font-serif)', fontVariant: 'small-caps', fontWeight: 600,
  letterSpacing: '0.02em', fontSize: size, color, lineHeight: 1.12, margin: 0,
});
window.sans = (size, color) => ({ fontFamily: 'var(--font-sans)', fontSize: size, color, margin: 0 });

// Inline SVG icon set (no external font dependency).
const ICONS = {
  check: '<polyline points="20 6 9 17 4 12"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  truck: '<path d="M1 3h13v13H1z"/><path d="M14 8h5l3 3v5h-8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>',
  'rotate-ccw': '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  'shopping-bag': '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  'message-circle': '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  // The real WhatsApp mark. A generic chat bubble does not read as the channel,
  // and in this market the channel is the reassurance.
  whatsapp: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>',
};

// Every icon above is a stroked outline. These are solid artwork instead, so they
// need fill and no stroke, or they render as an unrecognisable blob.
const FILLED = new Set(['whatsapp']);
window.Icon = function Icon({ name, size = 20, sw = 1.6, color = 'currentColor', style }) {
  const solid = FILLED.has(name);
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={solid ? color : 'none'} stroke={solid ? 'none' : color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-flex', flexShrink: 0, ...style }} dangerouslySetInnerHTML={{ __html: ICONS[name] || '' }} />;
};

window.Stars = function Stars({ value = 5, size = 15, color = 'var(--gold)' }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, color }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < value ? color : 'none'} stroke={color} strokeWidth="1.4">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
};

// Eyebrow: tracked uppercase micro-label with optional rule
window.Eyebrow = function Eyebrow({ children, color = 'var(--gold)', center }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, justifyContent: center ? 'center' : 'flex-start',
      fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color }}>
      <span style={{ width: 26, height: 1, background: 'currentColor', opacity: 0.55 }}></span>
      {children}
    </span>
  );
};

// FEIRI monogram mark (svg file)
window.Mono = function Mono({ size = 22, opacity = 1, style }) {
  return <img src="feiri-pdp/assets/monogram.svg" alt="" style={{ height: size, width: 'auto', opacity, display: 'block', ...style }} />;
};

// Section wrapper — controls ground colour + vertical rhythm
window.Section = function Section({ children, ground = 'transparent', pad = 'clamp(40px,5vw,72px)', id, label, style }) {
  return (
    <section id={id} data-screen-label={label} style={{ background: ground, padding: `${typeof pad === 'number' ? pad + 'px' : pad} var(--gutter)`, position: 'relative', ...style }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>{children}</div>
    </section>
  );
};

// Scrolling marquee of small-caps phrases with monogram separators
window.Marquee = function Marquee({ items, ground = 'var(--navy-deep)', color = 'var(--cream)' }) {
  const row = (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
      {items.map((t, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span style={{ ...window.sc('clamp(16px,1.6vw,20px)', color), padding: '0 26px', whiteSpace: 'nowrap', opacity: 0.92 }}>{t}</span>
          <img src="feiri-pdp/assets/monogram.svg" alt="" style={{ height: 16, opacity: 0.5, filter: 'brightness(0) invert(1)' }} />
        </span>
      ))}
    </div>
  );
  return (
    <div style={{ background: ground, borderTop: '1px solid var(--hair)', borderBottom: '1px solid var(--hair)', overflow: 'hidden', padding: '16px 0' }}>
      <div className="feiri-marquee" style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
        {row}{row}
      </div>
    </div>
  );
};

// en-US grouping on purpose: the store and every hardcoded line on the page write
// R1,899. en-ZA renders 'R 1 899', which disagreed with the rest of the page.
window.money = (n) => 'R' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 });

Object.assign(window, { _F });
