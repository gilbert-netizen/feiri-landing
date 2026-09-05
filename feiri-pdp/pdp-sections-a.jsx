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
// Every hero slide ships at 500, 800, 1100 and its full 1400. Without this a DPR2
// phone was pulling the 1400px file for a 390px slot, which is roughly three times
// the bytes it can use. `sizes` mirrors the layout: below 721px the media is the
// full viewport width, above it the media is its own grid column at about 51vw.
const HERO_WIDTHS = [500, 800, 1100];
const HERO_SIZES = '(min-width: 721px) 51vw, 100vw';
function heroSrcSet(src) {
  const stem = src.replace(/\.jpg$/, '');
  return HERO_WIDTHS.map(w => `${stem}-${w}.jpg ${w}w`).concat(`${src} 1400w`).join(', ');
}

window.HeroSection = function HeroSection({ product, color, onBuy, onOpenGallery, strip, measure }) {
  const lines = [
    'Made only in 3XL to 6XL.',
    'A polo that does not ride up when you sit and a seam that sits on your shoulder, not down your arm.',
  ];
  // The strip is now Gilbert's supplied set, not the colourway's gallery, so it does
  // NOT reset when the colourway changes. It is one story about the garment, and it
  // already carries both colourways on slide 5.
  const slides = strip || [];
  const stripRef = React.useRef(null);
  const [active, setActive] = React.useState(0);
  const activeSlide = slides[active];
  // 🚩 `loading="lazy"` does not hold inside a horizontal scroller. Chrome fetched three
  // slides on first paint and **WebKit fetched all seven, 2.27MB**, because every slide is
  // inside the viewport vertically. Measured 2026-09-05.
  //
  // So the images are windowed instead: a slide only carries an <img> when it is the
  // active one or its immediate neighbour. Everything else is an empty box of the same
  // size. The neighbour is always mounted, so a swipe never lands on a blank slide, and
  // first paint is two images on every engine rather than three or seven.
  const near = React.useCallback((i) => Math.abs(i - active) <= 1, [active]);
  const goTo = React.useCallback((i) => {
    const el = stripRef.current; if (!el) return;
    const k = Math.max(0, Math.min(i, slides.length - 1));
    el.scrollTo({ left: el.clientWidth * k, behavior: 'smooth' });
  }, [slides.length]);

  // Index from scroll offset rather than an IntersectionObserver: one read, no
  // callbacks queued behind the rendering steps, and it is exact at every snap point.
  const onStripScroll = React.useCallback((e) => {
    const el = e.currentTarget;
    const w = el.clientWidth || 1;
    const i = Math.round(el.scrollLeft / w);
    setActive(prev => (prev === i ? prev : Math.max(0, Math.min(i, slides.length - 1))));
  }, [slides.length]);

  return (
    <section data-screen-label="Hero" className="feiri-hero-section" style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: 'var(--ink-black)' }}>
      <div className="feiri-hero-media">
        {/* The hero photograph was the second most-tapped element on the page in the
            week to 2026-09-04 (18 taps, 4.63% of every tap) against a single <img> with
            no handler on it. Men were trying to look at the garment and nothing happened.

            So the hero image is a swipeable strip now, not one picture. This is safe in
            both layouts and neither one lets it near the CTA: above 721px the media is
            its own grid column (column 1, rows 1 to 2) beside the copy, and below 721px
            the section is display:block and the media is its own 58vh band above the
            copy. Its height is fixed at 92vh and 58vh respectively, so the hero fold
            arithmetic recorded in CLAUDE.md is untouched by this.

            Tapping any slide opens that same slide in the lightbox. */}
        <div
          className="feiri-hero-strip"
          ref={stripRef}
          onScroll={onStripScroll}
          role="group"
          aria-label="Photographs of the polo, swipe to see more"
        >
          {slides.map((s, i) => (
            s.type === 'size' ? (
              /* Slide 6 is rendered, not a picture of a table. Five columns of
                 measurements baked into a JPEG and scaled into a 390px slot is
                 unreadable, and this is the one thing the fit-anxious buyer needs
                 most. Same table as the buy block, from the same array. */
              <div key="size" className="feiri-hero-slide feiri-hero-sizecard" role="group" aria-label="Find your size">
                <div className="feiri-hero-sizecard-inner">
                  <p className="feiri-hero-sizecard-eyebrow">Find your Feiri fit</p>
                  <h3 className="feiri-hero-sizecard-head">Do not take one size up.</h3>
                  <p className="feiri-hero-sizecard-lede">
                    Measure a polo that already fits you well, lay it flat, and match it to the table.
                  </p>
                  <table className="feiri-hero-sizetable">
                    <thead>
                      <tr><th scope="col">Measured flat</th>{product.sizes.map(z => <th key={z} scope="col">{z}</th>)}</tr>
                    </thead>
                    <tbody>
                      {(measure || []).map(row => (
                        <tr key={row[0]}>
                          <th scope="row">{row[0]}</th>
                          {row.slice(1).map((v, k) => <td key={k}>{v}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="feiri-hero-sizecard-note">
                    Centimetres, measured flat, 1cm to 2cm tolerance. Whichever chest number is closest
                    to your own polo is your size.
                  </p>
                </div>
              </div>
            ) : (
              <button
                key={s.src}
                type="button"
                className="feiri-hero-slide"
                onClick={() => onOpenGallery(i)}
                aria-label={`Open photograph ${i + 1} of ${slides.length} larger`}
              >
                {/* alt was empty until 2026-09-04. This is the product, not decoration,
                    and on a metered connection in this market the alt text is what he
                    actually reads when the photograph does not arrive. */}
                {!s.points && (near(i)
                  ? <img src={s.src} srcSet={heroSrcSet(s.src)} sizes={HERO_SIZES} alt={s.alt}
                      className="feiri-hero-img" decoding="async"
                      loading={i === 0 ? 'eager' : 'lazy'} fetchpriority={i === 0 ? 'high' : undefined} />
                  : <span className="feiri-hero-img feiri-hero-hold" aria-hidden="true" />)}
                {s.points && (
                  /* The annotated slide gets its own frame, locked to the file's aspect
                     ratio and centred. Two reasons, both found by measurement:
                     the labels are absolutely positioned, and without a positioned
                     ancestor of their own they resolved against the SCROLL CONTAINER
                     and rendered off-screen on slide 1; and a cover-cropped image moves
                     the features out from under anchors expressed as percentages.
                     Inside this frame a percentage is a percentage of the photograph. */
                  <span className="feiri-hero-frame">
                    {near(i)
                      ? <img src={s.src} srcSet={heroSrcSet(s.src)} sizes={HERO_SIZES} alt={s.alt}
                          className="feiri-hero-img is-contain" decoding="async" loading="lazy" />
                      : <span className="feiri-hero-img is-contain feiri-hero-hold" aria-hidden="true" />}
                    {/* preserveAspectRatio="none" so a 0-100 viewBox maps onto the
                        percentage anchors on a frame that is not square. Straight lines
                        survive that stretch, stroke width would not. */}
                    <svg className="feiri-hero-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      {s.points.map(pt => (
                        <line key={pt.n} x1={pt.ax} y1={pt.ay}
                          x2={pt.side === 'left' ? pt.lx + 6 : pt.lx + 2} y2={pt.ly + 5}
                          stroke="#7C6128" strokeWidth="1" vectorEffect="non-scaling-stroke"
                          strokeLinecap="round" opacity="0.75" />
                      ))}
                    </svg>
                    {s.points.map(pt => (
                      <span key={pt.n} className="feiri-hero-point" style={{ left: `${pt.ax}%`, top: `${pt.ay}%` }} aria-hidden="true">{pt.n}</span>
                    ))}
                    {/* Two wordings, one position. Wide screens get the full sentence;
                        below 861px the margin beside a 350px frame is about 95px, which
                        no full sentence survives, so the short form shows there instead.
                        Both carry their number so the label and the dot stay tied. */}
                    {s.points.map(pt => (
                      <span key={'l' + pt.n} className={`feiri-hero-uspl is-${pt.side}`} style={{ left: `${pt.lx}%`, top: `${pt.ly}%` }}>
                        <b className="feiri-hero-uspl-n" aria-hidden="true">{pt.n}</b>
                        <span className="feiri-hero-uspl-long">{pt.label}</span>
                        <span className="feiri-hero-uspl-short">{pt.short || pt.label}</span>
                      </span>
                    ))}
                  </span>
                )}
              </button>
            )
          ))}
        </div>
        <div className="feiri-hero-scrim-bottom" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(6,18,26,0.5) 0%, rgba(6,18,26,0) 34%)' }} />
        {/* Added 2026-09-05. Without these the strip has no visible control on a
            desktop pointer: there is nothing to swipe with, and dots alone read as an
            indicator rather than an invitation. Gilbert could not reach slide 6 and he
            knew it was there. */}
        {slides.length > 1 && [-1, 1].map(dir => (
          <button key={dir} type="button"
            className={'feiri-hero-arrow is-' + (dir === 1 ? 'next' : 'prev')}
            onClick={() => goTo(active + dir)}
            disabled={dir === 1 ? active >= slides.length - 1 : active <= 0}
            aria-label={dir === 1 ? 'Next photograph' : 'Previous photograph'}>
            <Icon name={dir === 1 ? 'chevron-right' : 'chevron-left'} size={22} color="currentColor" />
          </button>
        ))}
        {/* Caption, dots and pill all sit in one bar so they cannot collide, and the
            whole bar is pointer-events:none so none of it swallows a swipe. The caption
            says what THIS photograph proves; it changes with the slide. */}
        {/* The bar's scrim exists to hold a caption off a photograph. On the size card
            there is no caption and the scrim was just fogging the last line of the
            footnote, so it only paints when there is something to hold. */}
        <div className={'feiri-hero-bar'
          + (activeSlide && (activeSlide.caption || activeSlide.points) ? '' : ' is-bare')
          + (activeSlide && activeSlide.points ? ' is-list' : '')}>
          {activeSlide && activeSlide.points ? (
            <ol className="feiri-hero-usplist">
              {activeSlide.points.map(pt => (
                <li key={pt.n}><span aria-hidden="true">{pt.n}</span><p>{pt.label}</p></li>
              ))}
            </ol>
          ) : (
            <p className="feiri-hero-caption">{activeSlide && activeSlide.caption ? activeSlide.caption : ''}</p>
          )}
          <div className="feiri-hero-dots" aria-hidden="true">
            {slides.map((_, i) => <span key={i} className={'feiri-hero-dot' + (i === active ? ' is-on' : '')} />)}
          </div>
        </div>
        {/* And the pill only offers a closer look at slides that HAVE one. On the size
            card it would be pointing at a table that is already full size, and the card
            is a div, so tapping it does nothing. */}
        {/* The pill stands down on the annotated slide. Its corner is the only clear
            ground label 1 has, and three numbered labels already say the picture is
            worth reading. The slide is still tappable. */}
        {activeSlide && activeSlide.type === 'image' && !activeSlide.points && (
          <span className="feiri-hero-tap-pill" aria-hidden="true">
            <Icon name="maximize" size={15} color="#FAF0D6" />
            <span>Look closer</span>
          </span>
        )}
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
window.OwnersSection = function OwnersSection({ review, onOpenPhoto }) {
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
        {/* The featured review, added 2026-09-04 on Gilbert's brief ("could we not make
            one of the cards a review card"). It leads the grid rather than closing it:
            Clarity's week to 2026-09-04 showed only 11 to 14% of visitors reach the
            bottom of this page, so proof that sits last is proof most of them never see.

            It spans the full grid width at every breakpoint. The grid is 6 / 3 / 2
            columns, so a single-column tile is roughly 180px wide on desktop and 175px
            on a 390px phone, and a review does not survive being set that narrow.

            This section already claims "worn by the FEIRI man". This is the one piece of
            evidence on the page where that man says it himself and shows his own
            photographs, so it belongs here rather than in the Testimonials grid, where
            it would be one more text card among seven. */}
        {review && (
          <figure className="feiri-owner-review feiri-reveal">
            <div className="feiri-owner-review-head">
              <Stars value={5} size={15} />
              {review.verified && (
                <span className="feiri-owner-review-verified">
                  <Icon name="check-circle" size={14} color="var(--gold)" />
                  <span>Verified buyer</span>
                </span>
              )}
            </div>
            <h3 style={{ ...sc(24, 'var(--cream)'), margin: '14px 0 0' }}>{review.title}</h3>
            <blockquote className="feiri-owner-review-body">
              {review.body.split('\n\n').map((para, i) => (
                <p key={i} style={{ ...sans(17, 'var(--cream)'), lineHeight: 1.62, margin: i === 0 ? 0 : '14px 0 0' }}>
                  {i === 0 ? '“' : ''}{para}{i === review.body.split('\n\n').length - 1 ? '”' : ''}
                </p>
              ))}
            </blockquote>
            {review.photos && review.photos.length > 0 && (
              <div className="feiri-owner-review-photos">
                {review.photos.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onOpenPhoto(review.photos.map(x => x.full), i)}
                    aria-label={`Open photograph ${i + 1} of ${review.photos.length} from this buyer`}
                  >
                    <img src={p.thumb} alt={`Photograph ${i + 1} of ${review.photos.length}, sent in by the buyer who left this review`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
            {/* The owner cards put a monogram in their caption. It was here too and came
                out: at the 14px that fits this row the lockup is unreadable, so it was
                noise standing where the attribution should be. */}
            <figcaption className="feiri-owner-review-foot">
              <span style={{ ...sans(15, 'var(--cream)'), fontWeight: 600 }}>{review.name}</span>
              <span style={{ ...sans(13, 'var(--cream-dim)') }}>· {review.location}</span>
            </figcaption>
          </figure>
        )}
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
  { n: 1, label: 'Collar goes soft',                    ax: 51.0, ay: 22.0, lx: 25, ly: 13, side: 'left',
    mx: 27, my: 7,  mside: 'left'  },
  { n: 2, label: 'Shoulder seam ends up down your arm', ax: 66.5, ay: 31.0, lx: 77, ly: 25, side: 'right',
    mx: 73, my: 11, mside: 'right' },
  { n: 3, label: 'Hem rides up when you sit',           ax: 45.0, ay: 47.0, lx: 77, ly: 47, side: 'right',
    mx: 28, my: 40, mside: 'left'  },
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
        {/* Two leader sets, one per breakpoint. The mobile anchors put the labels in the
            empty backdrop at top-left, top-right and mid-left, which is the only clear
            ground on a 350px frame. CSS shows one set and hides the other. */}
        <svg className="feiri-problem-lines is-wide" viewBox="0 0 100 100" aria-hidden="true">
          {PROBLEM_POINTS.map(p => (
            <g key={p.n}>
              <line x1={p.ax} y1={p.ay} x2={p.side === 'left' ? p.lx + 2.5 : p.lx - 2.5} y2={p.ly}
                stroke="#7C6128" strokeWidth="0.35" strokeLinecap="round" opacity="0.75" />
              <circle cx={p.ax} cy={p.ay} r="0.9" fill="#7C6128" />
            </g>
          ))}
        </svg>
        <svg className="feiri-problem-lines is-narrow" viewBox="0 0 100 100" aria-hidden="true">
          {PROBLEM_POINTS.map(p => (
            <g key={p.n}>
              <line x1={p.ax} y1={p.ay} x2={p.mside === 'left' ? p.mx + 2 : p.mx - 2} y2={p.my}
                stroke="#7C6128" strokeWidth="0.5" strokeLinecap="round" opacity="0.8" />
              <circle cx={p.ax} cy={p.ay} r="1.2" fill="#7C6128" />
            </g>
          ))}
        </svg>
        {PROBLEM_POINTS.map(p => (
          <span key={p.n} className={`feiri-problem-label is-wide is-${p.side}`}
            style={{ left: `${p.lx}%`, top: `${p.ly}%` }}>{p.label}</span>
        ))}
        {PROBLEM_POINTS.map(p => (
          <span key={p.n} className={`feiri-problem-label is-narrow is-${p.mside}`}
            style={{ left: `${p.mx}%`, top: `${p.my}%` }}>{p.label}</span>
        ))}
      </div>
    </figure>
  );
};

/* 5 — THE STANDARD. This is the page's problem section and the one place gate 6
   (problem then solution) lands at full strength, which is why the hero is free to
   qualify rather than argue. Densest copy on the page, deliberately. */
window.StandardSection = function StandardSection() {
  return (
    <Section ground="var(--ink-black)" label="The Standard">
      {/* Headline hoisted above the photograph and the eyebrow removed, 2026-08-31,
          Gilbert's call. The read is now claim, picture, explanation: the sentence says
          what is wrong, the labelled plate shows it on a man, then the paragraph gives
          the reason. Previously the picture arrived first and had to carry the argument
          on its own, and the eyebrow spent a line saying nothing the headline does not.
          It is hoisted OUT of the grid rather than moved within it, so the order holds
          at both breakpoints instead of only in the stacked one. */}
      <h2 style={{ ...sc('clamp(2rem,3.4vw,3rem)', 'var(--cream)'), margin: '0 auto clamp(26px,3.2vw,42px)', maxWidth: 720, textAlign: 'center' }}>Most big-size shirts are small shirts stretched bigger.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.95fr) minmax(0,1.05fr)', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }} className="feiri-2col">
        <window.ProblemFitFigure />
        {/* The body paragraph stays left-aligned: it is 70 words, and centred long-form
            copy gives both edges a ragged rag, which is harder to read than the
            consistency is worth. Same split Features already uses. */}
        <div className="feiri-standard-copy">
          <p style={{ ...sans(17, 'var(--cream-dim)'), lineHeight: 1.65, marginBottom: 0, maxWidth: 520, marginInline: 'auto' }}>
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
