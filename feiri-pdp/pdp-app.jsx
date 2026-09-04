/* global React, ReactDOM */
// FEIRI PDP — app shell, chrome, state, tweaks, assembly.
const { sc, sans, Icon, Mono, money } = window;
const { useTweaks } = window;
// pdp-sections-a registers Btn on window and runs before this file, per the load
// order in build/build.mjs. Same pattern as pdp-sections-b's `Btn2`.
const Btn = window.Btn;
const D = window.PDP_DATA;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mood": "midnight",
  "accent": "#2C53C9"
}/*EDITMODE-END*/;

const MOODS = {
  midnight: { '--ink-black': '#FFFFFF', '--navy-deep': '#F4EFE6', '--panel': '#F7F3EA99', '--panel-2': '#F1ECE1' },
  marine:   { '--ink-black': '#FBFAF7', '--navy-deep': '#EFF3F5', '--panel': '#EAF1F480', '--panel-2': '#E6EEF2' },
};

function Footer() {
  return (
    <footer id="site-footer" style={{ background: 'var(--panel-2)', borderTop: '1px solid var(--hair)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(56px,7vw,88px) var(--gutter) 40px' }}>
        <div>
          <img src="feiri-pdp/assets/lockup-navy.svg" alt="FEIRI Milano" style={{ height: 48, marginBottom: 18 }} />
          <p style={{ ...sans(16, 'var(--cream-dim)'), lineHeight: 1.6, maxWidth: 300 }}>A South African label. We make cotton monogram polos only in sizes 3XL to 6XL.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <a href="https://www.instagram.com/feiri_sa" target="_blank" rel="noopener" aria-label="FEIRI Milano on Instagram" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--cream)', textDecoration: 'none' }}>
              <Icon name="instagram" size={20} color="currentColor" />
              <span style={{ ...sans(14, 'currentColor') }}>@feiri_sa</span>
            </a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--hair)', marginTop: 48, paddingTop: 26, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ ...sans(13, 'var(--muted)') }}>© {new Date().getFullYear()} FEIRI Milano · feiri.co.za · Built &amp; powered by V8 Media</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {['VISA', 'MC', 'AMEX', 'A Pay', 'G Pay'].map(p => (
              <span key={p} style={{ ...sans(12, 'var(--cream-dim)'), fontWeight: 600, padding: '5px 10px', border: '1px solid var(--hair)', borderRadius: 5 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Was a text announcement bar. Everything it said is carried by the hero headline
// immediately below it or repeated in the marquee, compare table, §9 and the FAQ,
// and the page had no brand mark above the fold at all. Deliberately not a link:
// on a single-page LP a clickable logo just leaks paid traffic to the store.
function AnnouncementBar() {
  return (
    <header style={{ background: '#FDFBF6', borderBottom: '1px solid rgba(20,24,28,0.1)', padding: 'clamp(14px,2vw,20px) var(--gutter)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src="feiri-pdp/assets/lockup-navy.svg" alt="FEIRI Milano" width={59} height={44} style={{ height: 'clamp(44px,5.4vw,62px)', width: 'auto', display: 'block' }} />
    </header>
  );
}

// Floating WhatsApp. The one recorded returns problem on this brand is men who
// wear 3XL buying 5XL, so a human one tap away at any scroll position is a
// size-doubt fix, not a support widget. Icon only and no label: the page already
// carries the words in the buy block and in FAQ 2, and a green pill reading
// "Contact us" would compete with the primary CTA it sits next to.
// Sits under the toast (z 70) and over everything else.
// It hides while the hero or the buy block is on screen, and that is the whole
// point rather than a nicety. QC 2026-08-24 measured it covering 10.2% of the
// 390px buy button, with elementFromPoint returning this anchor instead of the
// button: a thumb on the right of "Add to bag" opened WhatsApp. It is also
// redundant in both places — the hero states the offer and the buy block already
// carries a WhatsApp link directly under the button. So it earns its place in the
// middle of the page, where a man is deciding, and gets out of the way at the two
// points where he is acting.
// Was two identical IntersectionObservers once the sticky bar arrived, both watching
// the same elements for the same answer. One observer, one answer, both consumers.
// The footer joined the list on 2026-09-04: without it the sticky bar sits over the
// footer for the whole of the last screen, covering the payment row and the company line.
function useChromeHidden() {
  // Starts hidden: the hero is on screen at load, so anything else is a flash.
  const [hidden, setHidden] = React.useState(true);
  React.useEffect(() => {
    const targets = [
      document.getElementById('buy'),
      document.querySelector('.feiri-hero-section'),
      document.getElementById('site-footer'),
    ].filter(Boolean);
    if (!targets.length || typeof IntersectionObserver === 'undefined') { setHidden(false); return; }
    const onScreen = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => onScreen.set(e.target, e.isIntersecting));
      setHidden([...onScreen.values()].some(Boolean));
    }, { threshold: 0 });
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, []);
  return hidden;
}

function WhatsAppFab({ hidden, raised }) {
  return (
    <a className={'feiri-wa-fab' + (hidden ? ' is-hidden' : '') + (raised ? ' is-raised' : '')} href="https://wa.me/message/RBOA6UZAMVSWC1" target="_blank" rel="noopener" aria-label="Message FEIRI Milano on WhatsApp" aria-hidden={hidden} tabIndex={hidden ? -1 : 0}>
      <Icon name="whatsapp" size={27} color="#FFFFFF" />
    </a>
  );
}

// The persistent way to buy. See the CSS note for the measurement that produced it:
// the buy block starts at 70.6% of a 21,414px page on a phone, and most visitors
// never got that far.
//
// It says exactly what the buy button says, because a second CTA with its own wording
// is a second offer. Size chosen: "Buy your 5XL. R1,899", and it goes straight to the
// store with the variant. No size chosen: "Select your size", and it scrolls to the
// block where he picks one. Same handler, same words, one page.
function StickyBuyBar({ product, color, size, onAdd, hidden }) {
  return (
    <div className={'feiri-sticky' + (hidden ? ' is-hidden' : '')} aria-hidden={hidden}>
      <div className="feiri-sticky-meta">
        <p className="feiri-sticky-price">{money(product.price)}</p>
        <p className="feiri-sticky-sub">{color.name}{size ? ` · ${size}` : ''}</p>
      </div>
      {/* `visibility: hidden` on the wrapper takes this out of the tab order and out of
          hit-testing on its own, which is how the WhatsApp FAB already does it. */}
      <Btn variant="accent" size="md" onClick={onAdd} className="feiri-sticky-cta">
        {size ? `Buy your ${size}` : 'Select your size'}
      </Btn>
    </div>
  );
}

function Toast({ show, label }) {
  return (
    <div style={{ position: 'fixed', left: '50%', bottom: 30, transform: `translateX(-50%) translateY(${show ? '0' : '24px'})`, opacity: show ? 1 : 0, transition: 'all .35s ease', zIndex: 70, pointerEvents: 'none', background: 'var(--cream)', color: 'var(--navy-deep)', padding: '14px 22px', borderRadius: 8, boxShadow: '0 16px 40px rgba(0,0,0,0.4)', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
      <Icon name="check-circle" size={18} color="#1F8A5B" /> {label}
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [color, setColor] = React.useState(D.product.colors[0]);
  const [size, setSize] = React.useState(null);
  const [bag, setBag] = React.useState(0);
  const [toast, setToast] = React.useState(false);
  const buyRef = React.useRef(null);
  const chromeHidden = useChromeHidden();

  // One lightbox for the whole page: the hero photograph and the featured review's
  // photographs both open it. `images` is a plain array of srcs, `index` is null when
  // it is closed.
  const [lb, setLb] = React.useState({ images: [], index: null });
  const closeLb = React.useCallback(() => setLb(s => ({ ...s, index: null })), []);
  const setLbIndex = React.useCallback((i) => setLb(s => ({ ...s, index: i })), []);
  // The hero photograph leads, then the rest of that colourway. Black & Sand lists its
  // hero inside `gallery` and Cream & Blue does not, so filter rather than assume.
  const openHeroGallery = React.useCallback((c) => {
    setLb({ images: [c.hero, ...(c.gallery || []).filter(g => g !== c.hero)], index: 0 });
  }, []);
  const openPhotos = React.useCallback((images, index) => setLb({ images, index }), []);

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const scrollToBuy = () => {
    const el = document.getElementById('buy');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    return;
  };
  // The hero button says "See how it fits", and until 2026-08-31 it scrolled to the
  // Lookbook because the Lookbook was the next gallery down. The resequence moved the
  // Lookbook below Compare, five sections deeper, so the same button would now jump a
  // cold visitor clean over the entire fit argument. It points at Features instead,
  // which is the section that actually answers the promise on the button.
  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    return;
  };
  // Carries the chosen size to the store. Without the variant id the store opens
  // on its own default size, which is how a man who picked 5XL here could check out
  // in 3XL. Cross-sell passes the other colourway explicitly and the size travels
  // with him, because the size is his, not the colour's.
  const goToProduct = (c) => {
    const col = c || color;
    const vid = size && col.variants ? col.variants[size] : null;
    window.open(vid ? `${col.url}?variant=${vid}` : col.url, '_blank', 'noopener');
  };
  const onAdd = () => {
    if (!size) { scrollToBuy(); return; }
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_name: D.product.name,
        content_ids: [color.key],
        content_type: 'product',
        contents: [{ id: color.key, quantity: 1 }],
        value: D.product.price,
        currency: 'ZAR',
      });
    }
    goToProduct();
  };

  const rootStyle = { ...MOODS[t.mood || 'midnight'], '--cobalt': t.accent || '#2C53C9' };

  // Order notes — resequenced 2026-08-31 on Gilbert's brief. The page now leads with
  // the pain and the answer to it, and the aspiration follows instead of opening.
  // - Standard is at 2. It is the problem section, and it is the first thing after
  //   the hero. The page previously opened on six lifestyle tiles, which sells the
  //   life to a man who does not yet believe the shirt comes in his size.
  // - Features is at 3, directly under the problem it answers. Problem, then fix.
  // - Reviews at 4 and the comparison at 5, moved there 2026-08-31 on Gilbert's brief.
  //   Problem, then the fix, then other men saying it worked, then the side by side.
  // - Heritage sits immediately before the FAQ, set there by Gilbert 2026-08-31. It was
  //   at 4, then briefly after the comparison. Its job changes with the position: high on
  //   the page it inoculated against "is FEIRI Milano actually Italian?" before the
  //   argument ran; here it answers the same question for a man already at the questions
  //   block, still deciding. That is a real job, and it is the last thing he reads before
  //   the objections are handled.
  // - Owners and Lookbook are one gallery block at 6 and 7. Owners keeps the only
  //   headline on the page that names who this is for; the Lookbook masthead is
  //   demoted to an eyebrow so the block carries one heading, not two.
  // - Reviews, then marquee, then video, at 8 to 10. Proof in words before proof in
  //   pictures. The marquee and video used to sit at 3 and 5, above the argument.
  return (
    <div data-theme="dark" style={rootStyle}>
      <AnnouncementBar />
      <main>
        <window.HeroSection product={D.product} color={color} onBuy={scrollToFeatures} onOpenGallery={openHeroGallery} />
        <window.StandardSection />
        <window.FeaturesSection features={D.features} />
        <window.TestimonialsSection testimonials={D.testimonials} rating={D.product.rating} reviews={D.product.reviews} />
        <window.CompareSection compare={D.compare} />
        <window.OwnersSection review={D.featuredReview} onOpenPhoto={openPhotos} />
        <window.LookbookSection />
        <window.TrustSection />
        <window.VideoSection />
        <window.UrgencySection />
        <window.BuySection product={D.product} color={color} setColor={setColor} size={size} setSize={setSize} onAdd={onAdd} buyRef={buyRef} />
        <window.TrustRowSection trust={D.trust} />
        <window.GuaranteeSection />
        <window.HeritageSection />
        <window.FAQSection faq={D.faq} />
        <window.CrossSellSection product={D.product} color={color} setColor={setColor} onBuy={goToProduct} />
      </main>
      <Footer />
      <StickyBuyBar product={D.product} color={color} size={size} onAdd={onAdd} hidden={chromeHidden} />
      <WhatsAppFab hidden={chromeHidden} raised={!chromeHidden} />
      <window.Lightbox images={lb.images} index={lb.index} onClose={closeLb} onIndex={setLbIndex} />
      <Toast show={toast} label={`Added. ${color.name}, ${size || ''}`} />
    </div>
  );
}

// Mount defensively: the standalone-bundle runtime can re-inject and
// re-execute this script a second time (to swap in embedded assets), so make
// the root reusable and gate the first render on every dependency actually
// being registered on window — avoids a transient "Element type is invalid"
// throw if this pass fires before a later IIFE in the combined script runs.
(function mountWhenReady() {
  const required = [
    'Section', 'HeroSection', 'OwnersSection', 'TrustSection', 'VideoSection', 'LookbookSection',
    'FeaturesSection', 'StandardSection', 'HeritageSection', 'CompareSection', 'TestimonialsSection',
    'UrgencySection', 'BuySection', 'TrustRowSection', 'GuaranteeSection',
    'FAQSection', 'CrossSellSection', 'PDP_DATA', 'useTweaks',
    // Lightbox comes from pdp-parts, Btn from pdp-sections-a. Listed for the same
    // reason as the rest: if this pass fires before those IIFEs have run, rendering
    // them throws "Element type is invalid".
    'Lightbox', 'Btn',
  ];
  const ready = required.every(k => typeof window[k] !== 'undefined');
  if (!ready) { requestAnimationFrame(mountWhenReady); return; }
  window.__feiriRoot = window.__feiriRoot || ReactDOM.createRoot(document.getElementById('root'));
  window.__feiriRoot.render(<App />);
})();
