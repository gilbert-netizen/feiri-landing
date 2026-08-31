/* global React */
// FEIRI PDP — sections 1–7
const { sc, sans, Icon, Stars, Eyebrow, Mono, Section, Marquee, money } = window;

// Shared CTA button (token-styled to sit on dark grounds)
window.Btn = function Btn({ children, variant = 'accent', size = 'md', full, onClick, style, className }) {
  const sizes = { md: { padding: '14px 28px', fontSize: 14 }, lg: { padding: '18px 38px', fontSize: 15 } };
  const variants = {
    accent: { background: 'var(--cobalt)', color: '#fff', border: '1px solid var(--cobalt)' },
    cream:  { background: 'var(--cream)', color: 'var(--navy-deep)', border: '1px solid var(--cream)' },
    ghost:  { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--hair-strong)' },
  };
  return (
    <button className={`feiri-btn${className ? ' ' + className : ''}`} onClick={onClick} style={{
      ...sizes[size], ...variants[variant], width: full ? '100%' : 'auto',
      fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
      borderRadius: 5, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      transition: 'transform .15s ease, filter .2s ease', ...style }}>
      {children}
    </button>
  );
};
const Btn = window.Btn;

/* 1 — HERO
   The headline still qualifies: a man who wears 4XL reads it and knows instantly this is
   for him. The subhead now promises two outcomes instead of restating the mechanism
   (2026-08-27, Gilbert's call). The mechanism argument stays where it was, in
   StandardSection, so the page still does not make its central point twice; what changed
   is that the first screen now says what changes for the reader, not just who it is for.
   Both outcomes are evidenced elsewhere on this page: 93cm body length on a 4XL, and
   57cm across the shoulders with a 25cm armhole. Each has a feature block, a row in the
   measurement table and a row in the comparison table.

   🚩 Sizing guidance stays OUT of the hero. A draft read "you don't need a size up
   anymore". On 2026-08-19 this account traced real returns (3XL men buying 5XL) to one
   line of store copy that told buyers to take the larger size, and returns are paid both
   ways here. The page's sizing method is "measure your own polo against the table", which
   lives in the fit section where a tape measure is in his hand. The hero does not
   instruct on size. See the learning ledger in 04-tests/experiment-log.md.

   Wording notes. `polo` is named because the copy never said what the product was.
   `ride up` is used instead of `hem`: every one of the seven uses of `hem` on this page
   is taught by the sentence around it or by the measurement table, and the hero teaches
   nothing, so the plainer word goes here and `hem` stays where a tape measure makes it
   obvious.

   🚩 The product noun must stay OUT of the H1, and this was measured, not reasoned.
   At 390x844 the H1 box is 350px and fits ONE line at clamp(1.9rem,3vw,2.75rem). Any
   added noun ("This polo is made only in...") wraps it to two lines, costs 37px, and
   pushes the price and risk-removal line from 785-836 to 821-872, i.e. off the fold on
   an iPhone 12, where the control cleared it by 8px. The subhead has slack and the H1
   has none: the sub box holds ~104 characters in its two lines either way. So the noun
   lives in the sub. The four things here are not cuttable: who it is for, the
   differentiator, the price, and risk removal.
   Layout: image and copy are separated (stacked on mobile, two columns on desktop)
   because the old overlay hid the garment behind the headline, and the garment sitting
   properly on a bigger man IS the argument. */
window.HeroSection = function HeroSection({ product, color, onBuy }) {
  const lines = [
    'Made only in 3XL to 6XL.',
    'A polo that does not ride up when you sit and a seam that sits on your shoulder, not down your arm.',
  ];
  return (
    <section data-screen-label="Hero" className="feiri-hero-section" style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: 'var(--ink-black)' }}>
      <div className="feiri-hero-media">
        {product.colors.map(c => (
          <img key={c.key} src={c.hero} alt="" className="feiri-hero-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', opacity: c.key === color.key ? 1 : 0, transition: 'opacity .7s ease' }} />
        ))}
        <div className="feiri-hero-scrim-bottom" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(6,18,26,0.5) 0%, rgba(6,18,26,0) 34%)' }} />
      </div>
      <div className="feiri-hero-copy" style={{ position: 'absolute', top: 'clamp(72px,13vw,132px)', right: 'var(--gutter)', maxWidth: 420, textAlign: 'right' }}>
        <h1 className="feiri-hero-heading" style={{ ...sc('clamp(1.9rem,3vw,2.75rem)', '#14181C'), marginBottom: 14 }}>{lines[0]}</h1>
        <p className="feiri-hero-sub" style={{ ...sans(16, 'rgba(20,24,28,0.75)'), lineHeight: 1.6 }}>{lines[1]}</p>
      </div>
      <div style={{ position: 'relative', maxWidth: 1240, width: '100%', margin: '0 auto', padding: 'clamp(48px,7vw,96px) var(--gutter)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="feiri-hero-actions">
            <div className="feiri-hero-cta-row" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              {/* Black on the cream panel. A cream button on a cream panel disappears.
                  Cobalt was tried and rejected as too loud. This CTA drops the gold
                  extruded edge for a soft shadow — a deliberate hero-only exception. */}
              <Btn variant="cream" size="lg" onClick={onBuy} className="feiri-cta-3d" style={{ background: 'var(--cream)', color: '#FAF0D6', border: '1px solid var(--cream)' }}>See how it fits</Btn>
            </div>
            <p style={{ ...sans(16, 'rgba(20,24,28,0.68)'), textAlign: 'center', lineHeight: 1.6, margin: '16px auto 0', maxWidth: 460 }}>
              R1,899 · Free delivery · Free returns if it does not fit
            </p>
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

// Sells the life rather than certifying the photographs. "The FEIRI man" is a label a
// cold reader has never met, so the headline defines him in the same breath by the
// thing he no longer does, and the body gives a stranger three concrete occasions.
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
        <h2 style={{ ...sc('clamp(1.9rem,3.2vw,3rem)', 'var(--cream)'), marginTop: 18, lineHeight: 1.12 }}>The FEIRI man does not dress down because of his size.</h2>
        <p style={{ ...sans(17, 'var(--cream-dim)'), lineHeight: 1.6, marginTop: 18, maxWidth: 540, marginInline: 'auto' }}>
          Golf on Saturday, dinner that night, and nothing that needs pulling straight all day.
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
              <span style={{ ...sans(12, '#FAF0D6'), letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, opacity: 0.92 }}>{o.tag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
};

/* 3 — TRUST MARQUEE. Product facts only. */
window.TrustSection = function TrustSection() {
  return <Marquee items={['Sizes 3XL to 6XL', '300 made, then never again', 'Pattern drawn at 3XL, not scaled up from a medium', 'Monogram knitted into the cloth, not printed on top', 'Free delivery and free returns anywhere in South Africa']} />;
};

/* 3 — EDITORIAL / "in motion" — replaced by LookbookSection (pdp-lookbook.jsx) */

/* 3.5 — VIDEO (full-bleed, plays while in view, pauses when scrolled away) */
window.VideoSection = function VideoSection() {
  const videoRef = React.useRef(null);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 720px)').matches;
  const src = isMobile ? 'feiri-pdp/assets/feiri-drinks-mobile.mp4' : 'feiri-pdp/assets/feiri-drinks.mp4';
  // Both widths use the mobile poster frame. The desktop poster is an empty studio
  // wall, and with preload="none" the poster is all a visitor sees until playback
  // starts. Replace with a proper 1920-wide still exported from the desktop cut.
  const poster = 'feiri-pdp/assets/feiri-drinks-mobile-poster.jpg';

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

/* 4 — FEATURES. Four failures he has lived through, each answered with a number he
   can check. Care instructions sit under the grid as a footnote to the fabric claim
   rather than as a fifth card. */
window.FeaturesSection = function FeaturesSection({ features }) {
  return (
    <Section ground="var(--ink-black)" label="Features" id="features">
      <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
        <Eyebrow center color="var(--gold)">The details</Eyebrow>
        <h2 style={{ ...sc('clamp(2rem,3.4vw,3rem)', 'var(--cream)'), marginTop: 18 }}>Four things that go wrong on a big-size shirt, and what we did about each one</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
        {features.map((f, i) => (
          <div key={i} style={{ background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#000' }}>
              <img src={f.img} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: f.pos || 'center' }} />
            </div>
            <div style={{ padding: '28px 26px 32px' }}>
              <span style={{ ...sans(13, 'var(--gold)'), fontWeight: 700, letterSpacing: '0.14em' }}>0{i + 1}</span>
              <h3 style={{ ...sc(24, 'var(--cream)'), margin: '12px 0 12px' }}>{f.title}</h3>
              <p style={{ ...sans(17, 'var(--cream-dim)'), lineHeight: 1.62 }}>{f.body}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Care footnote removed 2026-08-31 on Gilbert's call. It was washing instructions
          sitting under four blocks about fit, and the resequence made that misplacement
          obvious by putting the grid at position 3. Nothing was lost: FAQ answer 6 already
          carries the same instruction, in the place a buyer goes looking for it. The one
          clause unique to this paragraph, why hot washing does the damage, moved into that
          answer rather than being deleted with it. */}
    </Section>
  );
};

/* The three failures, anchored to the photograph. Coordinates are percentages of the
   square plate, so they hold at every rendered width without recalculation.
   The strings are the copy's own three failures, word for word, so the picture and the
   paragraph beside it argue one list rather than two.

   The labels are HTML, not burned into the JPEG. Baked-in type would render at roughly
   6px on a 390px phone, where the image slot is 350px wide, which is where most of this
   page's traffic reads it. */
const PROBLEM_POINTS = [
  { n: 1, label: 'Collar goes soft',                    ax: 51.0, ay: 22.0, lx: 25, ly: 13, side: 'left'  },
  { n: 2, label: 'Shoulder seam ends up down your arm', ax: 66.5, ay: 31.0, lx: 77, ly: 25, side: 'right' },
  { n: 3, label: 'Hem rides up when you sit',           ax: 45.0, ay: 47.0, lx: 77, ly: 47, side: 'right' },
];

window.ProblemFitFigure = function ProblemFitFigure() {
  return (
    <figure className="feiri-problem" style={{ margin: 0 }}>
      <div className="feiri-problem-frame">
        <img
          className="feiri-problem-img"
          src="feiri-pdp/assets/problem-fit-1206.jpg"
          srcSet="feiri-pdp/assets/problem-fit-640.jpg 640w, feiri-pdp/assets/problem-fit-768.jpg 768w, feiri-pdp/assets/problem-fit-1206.jpg 1206w"
          sizes="(min-width: 901px) 47vw, (min-width: 700px) 620px, calc(100vw - 40px)"
          alt="A man seated in a grey polo that has been sized up rather than cut for his frame. The collar has lost its shape, the shoulder seam sits partway down his arm, and the hem has ridden up over his waist."
        />
        {/* Leader lines. The frame is locked to 1:1, so a 0-100 viewBox maps
            straight onto the percentage anchors above with no distortion. */}
        <svg className="feiri-problem-lines" viewBox="0 0 100 100" aria-hidden="true">
          {PROBLEM_POINTS.map(p => (
            <g key={p.n}>
              <line x1={p.ax} y1={p.ay} x2={p.side === 'left' ? p.lx + 2.5 : p.lx - 2.5} y2={p.ly}
                stroke="#7C6128" strokeWidth="0.35" strokeLinecap="round" opacity="0.75" />
              <circle cx={p.ax} cy={p.ay} r="0.9" fill="#7C6128" />
            </g>
          ))}
        </svg>
        {PROBLEM_POINTS.map(p => (
          <span key={p.n} className={`feiri-problem-label is-${p.side}`}
            style={{ left: `${p.lx}%`, top: `${p.ly}%` }}>{p.label}</span>
        ))}
        {/* The numbers only appear below 760px, where there is no room to anchor a
            label beside the figure. Above it they would just repeat the label. */}
        {PROBLEM_POINTS.map(p => (
          <span key={p.n} className="feiri-problem-num" style={{ left: `${p.ax}%`, top: `${p.ay}%` }}
            aria-hidden="true">{p.n}</span>
        ))}
      </div>
      <ol className="feiri-problem-list">
        {PROBLEM_POINTS.map(p => (
          <li key={p.n}><span>{p.n}</span>{p.label}</li>
        ))}
      </ol>
    </figure>
  );
};

/* 5 — THE STANDARD. This is the page's problem section and the one place gate 6
   (problem then solution) lands at full strength, which is why the hero is free to
   qualify rather than argue. Densest copy on the page, deliberately. */
window.StandardSection = function StandardSection() {
  return (
    <Section ground="var(--ink-black)" label="The Standard">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.95fr) minmax(0,1.05fr)', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }} className="feiri-2col">
        <window.ProblemFitFigure />
        <div>
          <Eyebrow color="var(--gold)">The FEIRI standard</Eyebrow>
          <h2 style={{ ...sc('clamp(2rem,3.4vw,3rem)', 'var(--cream)'), margin: '18px 0 14px' }}>Most big-size shirts are small shirts stretched bigger.</h2>
          <p style={{ ...sans(17, 'var(--cream-dim)'), lineHeight: 1.65, marginBottom: 0, maxWidth: 520 }}>
            One pattern gets drawn for a medium, then every measurement grows by the same percentage to make the big sizes. Bodies do not change shape that way. That is why the hem rides up when you sit, why the shoulder seam ends up somewhere down your arm, and why the collar goes soft after a few washes.
            <br /><br />
            <strong style={{ color: 'var(--cream)' }}>We do not size up. We start the pattern at 3XL</strong> and work upward from there, so the shape is right at the size you actually wear.
          </p>
        </div>
      </div>
    </Section>
  );
};

/* 5.5 — HERITAGE. Inoculation: the title says FEIRI Milano, so a cold reader asks
   "is this actually Italian?" within two seconds. Answering it early turns a
   suspicion into a reason to trust, which is why this sits near the top. */
window.HeritageSection = function HeritageSection() {
  return (
    <Section ground="var(--ink-black)" label="Heritage" style={{ paddingTop: 'clamp(30px,3.6vw,52px)', paddingBottom: 'clamp(30px,3.6vw,52px)' }}>
      <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
        <Eyebrow center color="var(--gold)">Where FEIRI comes from</Eyebrow>
        <h2 style={{ ...sc('clamp(1.8rem,3vw,2.7rem)', 'var(--cream)'), marginTop: 18, lineHeight: 1.15 }}>The name is Italian. The brand is South African.</h2>
        <p style={{ ...sans(17, 'var(--cream-dim)'), lineHeight: 1.7, marginTop: 22 }}>
          FEIRI Milano is named after Milan because that is where the design references come from. The brand itself was started here, by people who could not find one good shirt in their own size. Everything we make starts at 3XL.
        </p>
      </div>
    </Section>
  );
};

/* 6 — US vs THEM. Every row is something a tick can honestly sit next to. */
window.CompareSection = function CompareSection({ compare }) {
  return (
    <Section ground="var(--navy-deep)" label="Us vs Them">
      <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 52px' }}>
        <Eyebrow center color="var(--gold)">Side by side</Eyebrow>
        <h2 style={{ ...sc('clamp(1.9rem,3.2vw,2.8rem)', 'var(--cream)'), marginTop: 18 }}>FEIRI compared to a polo that was just sized up</h2>
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
            <div style={{ padding: '18px 24px', ...sans(16, 'var(--cream)') }}>{row[0]}</div>
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

/* 7 — TESTIMONIALS. "7 reviews so far" is more believable than a 5/5 badge and is
   honest about a first run. */
window.TestimonialsSection = function TestimonialsSection({ testimonials, rating, reviews }) {
  return (
    <Section ground="var(--ink-black)" label="Testimonials">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, marginBottom: 48 }}>
        <div>
          <Eyebrow color="var(--gold)">Reviews</Eyebrow>
          <h2 style={{ ...sc('clamp(2rem,3.4vw,3rem)', 'var(--cream)'), marginTop: 16 }}>What buyers said</h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Stars value={5} size={18} />
          <p style={{ ...sans(16, 'var(--cream-dim)'), marginTop: 6 }}>{reviews} reviews so far. Average 5 out of 5.</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 22 }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{ background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 12, padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Stars value={5} size={14} />
            {t.title && <h3 style={{ ...sc(20, 'var(--cream)'), margin: 0 }}>{t.title}</h3>}
            <p style={{ ...sans(17, 'var(--cream)'), lineHeight: 1.6, flex: 1 }}>“{t.body}”</p>
            <div style={{ borderTop: '1px solid var(--hair)', paddingTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="check-circle" size={15} color="var(--gold)" />
              <span style={{ ...sans(15, 'var(--cream)'), fontWeight: 600 }}>{t.name}</span>
              <span style={{ ...sans(13, 'var(--cream-dim)') }}>· {t.size}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
