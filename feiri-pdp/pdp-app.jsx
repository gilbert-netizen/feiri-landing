/* global React, ReactDOM */
// FEIRI PDP — app shell, chrome, state, tweaks, assembly.
const { sc, sans, Icon, Mono, money } = window;
const { useTweaks } = window;
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
    <footer style={{ background: 'var(--panel-2)', borderTop: '1px solid var(--hair)' }}>
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

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const scrollToBuy = () => {
    const el = document.getElementById('buy');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    return;
  };
  const scrollToLookbook = () => {
    const el = document.getElementById('lookbook');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    return;
  };
  const goToProduct = (c) => { window.open((c || color).url, '_blank', 'noopener'); };
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

  // Order notes:
  // - Heritage sits at 4. The title says FEIRI Milano, so "is this actually Italian?"
  //   is asked within two seconds and is answered before the page argues anything.
  // - Standard sits ahead of the Lookbook. The page used to reach its central
  //   argument only after a video and twelve images, which asks a cold visitor to
  //   want the garment before he believes it comes in his size.
  // - Grounds alternate: white, cream, white, black(video), white, cream, white,
  //   cream, white, cream, panel-2, white, cream, white, panel-2.
  return (
    <div data-theme="dark" style={rootStyle}>
      <AnnouncementBar />
      <main>
        <window.HeroSection product={D.product} color={color} onBuy={scrollToLookbook} />
        <window.OwnersSection />
        <window.TrustSection />
        <window.HeritageSection />
        <window.VideoSection />
        <window.StandardSection />
        <window.LookbookSection />
        <window.FeaturesSection features={D.features} />
        <window.CompareSection compare={D.compare} />
        <window.TestimonialsSection testimonials={D.testimonials} rating={D.product.rating} reviews={D.product.reviews} />
        <window.UrgencySection />
        <window.BuySection product={D.product} color={color} setColor={setColor} size={size} setSize={setSize} onAdd={onAdd} buyRef={buyRef} />
        <window.TrustRowSection trust={D.trust} />
        <window.GuaranteeSection />
        <window.FAQSection faq={D.faq} />
        <window.CrossSellSection product={D.product} color={color} setColor={setColor} onBuy={goToProduct} />
      </main>
      <Footer />
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
  ];
  const ready = required.every(k => typeof window[k] !== 'undefined');
  if (!ready) { requestAnimationFrame(mountWhenReady); return; }
  window.__feiriRoot = window.__feiriRoot || ReactDOM.createRoot(document.getElementById('root'));
  window.__feiriRoot.render(<App />);
})();
