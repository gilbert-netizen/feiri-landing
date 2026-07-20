/* global React */
// FEIRI PDP — sections 1–7
const { sc, sans, Icon, Stars, Eyebrow, Mono, Section, Marquee, money } = window;

// Shared CTA button (token-styled to sit on dark grounds)
window.Btn = function Btn({ children, variant = 'accent', size = 'md', full, onClick, style }) {
  const sizes = { md: { padding: '14px 28px', fontSize: 14 }, lg: { padding: '18px 38px', fontSize: 15 } };
  const variants = {
    accent: { background: 'var(--cobalt)', color: '#fff', border: '1px solid var(--cobalt)' },
    cream:  { background: 'var(--cream)', color: 'var(--navy-deep)', border: '1px solid var(--cream)' },
    ghost:  { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--hair-strong)' },
  };
  return (
    <button className="feiri-btn" onClick={onClick} style={{
      ...sizes[size], ...variants[variant], width: full ? '100%' : 'auto',
      fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
      borderRadius: 5, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      transition: 'transform .15s ease, filter .2s ease', ...style }}>
      {children}
    </button>
  );
};
const Btn = window.Btn;

/* 1 — HERO */
window.HeroSection = function HeroSection({ product, color, onBuy, scarcity, heroLine }) {
  const lines = heroLine === 'Carry presence'
    ? [<React.Fragment key="a">Made for men<br />who carry presence.</React.Fragment>, 'A structured monogram knit, built from the ground up for bigger men. Worn, not styled, by the man who carries the room.']
    : [<React.Fragment key="b">No loud logos.<br />Just presence.</React.Fragment>, 'Premium fashion was never built for men like you. Walk in looking like the room is yours — because it is. Worn, not styled, by the man who walks in and never has to announce it.'];
  return (
    <section data-screen-label="Hero" className="feiri-hero-section" style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: 'var(--ink-black)' }}>
      {product.colors.map(c => (
        <img key={c.key} src={c.hero} alt="" className="feiri-hero-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', opacity: c.key === color.key ? 1 : 0, transition: 'opacity .7s ease' }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(6,18,26,0.82) 0%, rgba(6,18,26,0.58) 30%, rgba(6,18,26,0.18) 58%, rgba(6,18,26,0) 80%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(6,18,26,0.5) 0%, rgba(6,18,26,0) 34%)' }} />
      <div style={{ position: 'relative', maxWidth: 1240, width: '100%', margin: '0 auto', padding: 'clamp(48px,7vw,96px) var(--gutter)' }}>
        <div style={{ maxWidth: 600 }}>
          <div className="feiri-hero-actions">
            <div className="feiri-hero-cta-row" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
              <Btn variant="cream" size="lg" onClick={onBuy} style={{ background: '#FAF0D6', color: '#14181C', border: '1px solid #FAF0D6' }}>View 3XL–6XL Limited Pieces</Btn>
              <div className="feiri-hero-rating" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Stars value={5} size={16} color="#C9A24B" />
                <span style={{ ...sans(13, 'rgba(250,240,214,0.82)'), letterSpacing: '0.04em' }}>Rated 5/5 by Verified Owners</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 2 — OWNERS (real owners in place of logos) */

// Fades + rises each `.feiri-reveal` child into place once as it scrolls into view.
// One-shot (unobserves after reveal) so there's no ongoing scroll-linked cost.
function useRevealOnScroll() {
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const items = root.querySelectorAll('.feiri-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return containerRef;
}

window.OwnersSection = function OwnersSection() {
  const owners = [
    { src: 'feiri-pdp/assets/owners/o1.jpg', tag: 'The Ivy Luxe' },
    { src: 'feiri-pdp/assets/owners/o5.jpg', tag: 'Cape Winelands' },
    { src: 'feiri-pdp/assets/owners/o2.jpg', tag: 'Home turf' },
    { src: 'feiri-pdp/assets/owners/o3.jpg', tag: 'Golden hour, 18th' },
    { src: 'feiri-pdp/assets/owners/o4.jpg', tag: 'Sunday best' },
    { src: 'feiri-pdp/assets/owners/o6.jpg', tag: 'Date night' },
  ];
  const gridRef = useRevealOnScroll();
  return (
    <Section ground="var(--ink-black)" label="Owners" style={{ paddingTop: 'clamp(28px,3vw,48px)', paddingBottom: 'clamp(28px,3vw,48px)' }}>
      <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 32px' }}>
        <Eyebrow center color="var(--gold)">Worn by the FEIRI man</Eyebrow>
        <h2 style={{ ...sc('clamp(2rem,3.6vw,3.3rem)', 'var(--cream)'), marginTop: 18, lineHeight: 1.1 }}>Made for SA's Real Men</h2>
        <p style={{ ...sans(16, 'var(--cream-dim)'), lineHeight: 1.6, marginTop: 18, maxWidth: 520, marginInline: 'auto' }}>
          No paid models. No borrowed logos. Just the men who already own the room — and now own the knit.
        </p>
      </div>
      <div className="feiri-owners-grid" ref={gridRef}>
        {owners.map((o, i) => (
          <figure key={i} className="feiri-owner-card feiri-reveal" style={{ margin: 0, position: 'relative', borderRadius: 11, overflow: 'hidden', border: '1px solid var(--hair)', background: '#000', boxShadow: '0 18px 44px rgba(0,0,0,0.45)', transitionDelay: `${(i % 3) * 280}ms` }}>
            <div style={{ aspectRatio: '3 / 4', overflow: 'hidden' }}>
              <img src={o.src} alt="FEIRI owner" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', transition: 'transform .6s ease' }} />
            </div>
            <figcaption style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '34px 14px 12px', background: 'linear-gradient(to top, rgba(6,18,26,0.86), rgba(6,18,26,0))', display: 'flex', alignItems: 'center', gap: 7 }}>
              <img src="feiri-pdp/assets/monogram.svg" alt="" style={{ height: 13, opacity: 0.7, filter: 'brightness(0) invert(1)' }} />
              <span style={{ ...sans(11.5, '#FAF0D6'), letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, opacity: 0.92 }}>{o.tag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
};

/* 3 — TRUST MARQUEE */
window.TrustSection = function TrustSection() {
  return <Marquee items={['Proudly Local, Internationally Inspired.', 'Limited to 300 pieces', 'Built for 3XL–6XL', 'Monogram knitted, never printed', 'Designed for presence and confidence']} />;
};

/* 3 — EDITORIAL / "in motion" — replaced by LookbookSection (pdp-lookbook.jsx) */

/* 3.5 — VIDEO (full-bleed, plays while in view, pauses when scrolled away) */
window.VideoSection = function VideoSection() {
  const videoRef = React.useRef(null);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 720px)').matches;
  const src = isMobile ? 'feiri-pdp/assets/feiri-drinks-mobile.mp4' : 'feiri-pdp/assets/feiri-drinks.mp4';
  const poster = isMobile ? 'feiri-pdp/assets/feiri-drinks-mobile-poster.jpg' : 'feiri-pdp/assets/feiri-drinks-poster.jpg';

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      });
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section style={{ position: 'relative', width: '100%', height: 'clamp(360px, 62vw, 720px)', overflow: 'hidden', background: '#000' }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </section>
  );
};

/* 4 — FEATURES */
window.FeaturesSection = function FeaturesSection({ features }) {
  return (
    <Section ground="var(--navy-deep)" label="Features">
      <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
        <Eyebrow center color="var(--gold)">Why it carries</Eyebrow>
        <h2 style={{ ...sc('clamp(2rem,3.4vw,3rem)', 'var(--cream)'), marginTop: 18 }}>Built to be noticed without trying</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
        {features.map((f, i) => (
          <div key={i} style={{ background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#000' }}>
              <img src={f.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '28px 26px 32px' }}>
              <span style={{ ...sans(13, 'var(--gold)'), fontWeight: 700, letterSpacing: '0.14em' }}>0{i + 1}</span>
              <h3 style={{ ...sc(24, 'var(--cream)'), margin: '12px 0 12px' }}>{f.title}</h3>
              <p style={{ ...sans(15, 'var(--cream-dim)'), lineHeight: 1.62 }}>{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

/* 5 — THE STANDARD */
window.StandardSection = function StandardSection({ standard }) {
  return (
    <Section ground="var(--ink-black)" label="The Standard">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.95fr) minmax(0,1.05fr)', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }} className="feiri-2col">
        <div style={{ borderRadius: 14, overflow: 'hidden', background: '#000', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
          <img src="feiri-pdp/assets/front-blue.jpg" alt="The FEIRI fit" style={{ width: '100%', display: 'block' }} />
        </div>
        <div>
          <Eyebrow color="var(--gold)">The FEIRI standard</Eyebrow>
          <h2 style={{ ...sc('clamp(2rem,3.4vw,3rem)', 'var(--cream)'), margin: '18px 0 14px' }}>We don’t size up. We design from the ground up.</h2>
          <p style={{ ...sans(16, 'var(--cream-dim)'), lineHeight: 1.65, marginBottom: 34, maxWidth: 480 }}>
            Most labels cut for a smaller man and stretch the pattern to fit. The proportions go wrong, and you feel it all day. FEIRI is engineered for your frame from the first stitch.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {standard.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 22, padding: '22px 0', borderTop: '1px solid var(--hair)' }}>
                <span style={{ ...sc(30, 'var(--gold)'), opacity: 0.8, minWidth: 44 }}>{s.n}</span>
                <div>
                  <h3 style={{ ...sc(21, 'var(--cream)'), marginBottom: 7 }}>{s.title}</h3>
                  <p style={{ ...sans(14.5, 'var(--cream-dim)'), lineHeight: 1.58 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

/* 6 — US vs THEM */
window.CompareSection = function CompareSection({ compare }) {
  return (
    <Section ground="var(--navy-deep)" label="Us vs Them">
      <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 52px' }}>
        <Eyebrow center color="var(--gold)">The difference</Eyebrow>
        <h2 style={{ ...sc('clamp(2rem,3.4vw,3rem)', 'var(--cream)'), marginTop: 18 }}>FEIRI vs. “just size up”</h2>
      </div>
      <div style={{ maxWidth: 880, margin: '0 auto', border: '1px solid var(--hair)', borderRadius: 14, overflow: 'hidden', background: 'var(--panel)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 130px 130px' }} className="feiri-compare-head">
          <div style={{ padding: '20px 24px' }}></div>
          <div style={{ padding: '20px 12px', textAlign: 'center', background: 'var(--cobalt)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Mono size={20} style={{ filter: 'brightness(0) invert(1)' }} />
            <span style={{ ...sans(12, '#fff'), fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>FEIRI</span>
          </div>
          <div style={{ padding: '20px 12px', textAlign: 'center' }}>
            <span style={{ ...sans(12, 'var(--cream-dim)'), fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Others</span>
          </div>
        </div>
        {compare.map((row, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 130px 130px', borderTop: '1px solid var(--hair)', alignItems: 'center' }}>
            <div style={{ padding: '18px 24px', ...sans(15, 'var(--cream)') }}>{row[0]}</div>
            <div style={{ padding: '18px 12px', textAlign: 'center', background: 'rgba(44,83,201,0.1)' }}>
              <Icon name="check" size={22} color="var(--gold)" sw={2.2} />
            </div>
            <div style={{ padding: '18px 12px', textAlign: 'center' }}>
              <Icon name="x" size={20} color="rgba(20,24,28,0.4)" sw={2} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

/* 7 — TESTIMONIALS */
window.TestimonialsSection = function TestimonialsSection({ testimonials, rating, reviews }) {
  return (
    <Section ground="var(--ink-black)" label="Testimonials">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, marginBottom: 48 }}>
        <div>
          <Eyebrow color="var(--gold)">Voices</Eyebrow>
          <h2 style={{ ...sc('clamp(2rem,3.4vw,3rem)', 'var(--cream)'), marginTop: 16 }}>Men who carry the room</h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Stars value={5} size={18} />
          <p style={{ ...sans(14, 'var(--cream-dim)'), marginTop: 6 }}>Rated 5/5 by Verified Owners</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 22 }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{ background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 12, padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Stars value={5} size={14} />
            {t.title && <h3 style={{ ...sc(20, 'var(--cream)'), margin: 0 }}>{t.title}</h3>}
            <p style={{ ...sans(15.5, 'var(--cream)'), lineHeight: 1.6, flex: 1 }}>“{t.body}”</p>
            <div style={{ borderTop: '1px solid var(--hair)', paddingTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="check-circle" size={15} color="var(--gold)" />
              <span style={{ ...sans(14, 'var(--cream)'), fontWeight: 600 }}>{t.name}</span>
              <span style={{ ...sans(12.5, 'var(--cream-dim)') }}>· {t.size}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
