/* global React */
// FEIRI PDP — sections 8–13
const { sc: _sc, sans: _sans, Icon: _Icon, Stars: _Stars, Eyebrow: _Eyebrow, Mono: _Mono, Section: _Section, money: _money } = window;
const Btn2 = window.Btn;

// Moved into pdp-data.jsx on 2026-09-04. The proof deck renders the same table, and two
// hardcoded copies of the numbers a man buys on is exactly how they drift apart.
// pdp-data loads before this file, so reading it at module level is safe.
// These five decide the purchase; the full guide (armhole, bicep, cuff, neck) stays on
// the store.
const MEASURE = window.PDP_DATA.measure;

/* 8 — FINAL RELEASE. Installs the last rung (my size is the one that runs out)
   immediately before the buy box. No counter: the old one was hardcoded to 27 for
   every size and both colours. Any number here must read live inventory. */
window.UrgencySection = function UrgencySection() {
  return (
    <div style={{ background: 'var(--navy-deep)', borderTop: '1px solid var(--hair)', borderBottom: '1px solid var(--hair)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(34px,4.5vw,56px) var(--gutter)', textAlign: 'center' }}>
        <h2 style={{ ..._sc('clamp(1.7rem,2.8vw,2.4rem)', 'var(--cream)'), margin: '0 0 16px' }}>This is the final release of this piece</h2>
        <p style={{ ..._sans(17, 'var(--cream-dim)'), lineHeight: 1.66, margin: 0 }}>
          We made 300 in total, across both colours and all four sizes. When a size sells out, we are not making it again. Not in this colour, and not in this pattern.
        </p>
      </div>
    </div>
  );
};

/* 8.5 — THE FIT METHOD. Sits inside the buy box, directly above the size picker.

   Why it exists: `Chest, flat` is 76cm on a 3XL, while a man that size measures
   roughly 140cm to 150cm around. If he measures himself instead of measuring the
   shirt, he gets a number with no home in the table, and the word `flat` was
   carrying that whole distinction alone. Two arrows remove the ambiguity.

   The drawing is inline SVG, not an image. Three Defects are open on this page
   (D1 undersized masters, D3 missing alt text, D6 LCP 3.38s) and a raster would
   make all three worse. This adds no request, takes the theme tokens so it is
   correct on the dark ground, and carries its own <title>.

   It is drawn, not photographed, and deliberately not the FEIRI polo: the
   instruction is about a polo he ALREADY OWNS, so a photograph of the garment he
   does not have yet would teach the wrong object. */
function FitDiagram() {
  return (
    <svg viewBox="0 0 300 224" role="img" aria-labelledby="feiri-fit-dia" style={{ width: 250, maxWidth: '100%' }}>
      <title id="feiri-fit-dia">A polo laid flat, showing where to measure. The chest is measured straight across the shirt just below the sleeves. The body length is measured from the top of the shoulder straight down to the hem.</title>
      <g fill="none" stroke="var(--cream)" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" opacity="0.9">
        <path d="M130 44 L88 56 L52 82 L66 106 L92 92 L88 202 L212 202 L208 92 L234 106 L248 82 L212 56 L170 44" />
        <path d="M132 46 Q150 57 168 46" opacity="0.65" />
        <path d="M127 39 L146 72 L150 53 L154 72 L173 39" />
        <path d="M146 72 L146 97 M154 72 L154 97" strokeWidth="2.2" />
      </g>
      <g fill="var(--cream)" opacity="0.75"><circle cx="150" cy="80" r="2.2" /><circle cx="150" cy="92" r="2.2" /></g>
      {/* Type is 20 SVG units, not 14. The svg renders 250px wide from a 300-unit
          viewBox, so units scale by 0.833 and a 14 would land on screen at 11.67px,
          under the page's own 12px minimum and well under the 16px reading floor set
          on 2026-08-25. 20 units renders at 16.7px. Measure the RENDERED size, never
          the specified one, on anything inside a scaled viewBox.
          Arrows stay gold: at 4.14:1 on this ground they clear WCAG 1.4.11's 3:1 floor
          for non-text graphics. The two TEXT labels do not, so they take --cream and
          measure 15.14:1. Same class of defect the 2026-08-25 pass caught at 3.26:1. */}
      <g stroke="var(--gold)" strokeWidth="2" fill="var(--gold)" style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 600 }}>
        <line x1="92" y1="118" x2="208" y2="118" />
        <path d="M92 118 l9 -5 v10 z" /><path d="M208 118 l-9 -5 v10 z" />
        <text x="150" y="143" textAnchor="middle" stroke="none" fill="var(--cream)">Chest, flat</text>
        <line x1="28" y1="56" x2="28" y2="202" />
        <path d="M28 56 l-5 9 h10 z" /><path d="M28 202 l-5 -9 h10 z" />
        <text transform="translate(21,129) rotate(-90)" textAnchor="middle" stroke="none" fill="var(--cream)">Body length</text>
        <g strokeDasharray="3 4" strokeWidth="1.4" opacity="0.5">
          <line x1="28" y1="56" x2="86" y2="56" /><line x1="28" y1="202" x2="88" y2="202" />
        </g>
      </g>
    </svg>
  );
}

/* The header deliberately does NOT reuse the store's "do not size up". That exact
   phrase already appears on this page in StandardSection, where "We do not size
   up" describes FEIRI's patternmaking, not the buyer's ordering. One phrase, two
   meanings, 14,000px apart, would be worse than no parity.

   The arithmetic is checkable in the table directly below: every step in the
   MEASURE array adds exactly +2 length, +4 chest, +3 shoulder. */
const FIT_STEPS = [
  'Lay a polo you already own flat on a bed.',
  'Measure the chest, then the body length.',
  'Match the chest to the table below. That is your size.',
];

function FitMethod() {
  return (
    <div style={{ marginBottom: 26 }}>
      <h3 style={{ ..._sc(22, 'var(--cream)'), margin: '0 0 10px' }}>Take the size you already wear.</h3>
      <p style={{ ..._sans(17, 'var(--cream-dim)'), lineHeight: 1.6, margin: '0 0 16px' }}>
        If a polo fits your chest but rides up when you sit, it is too short in the body. Going one size bigger does add 2cm of length, but it adds 4cm at the chest and 3cm across the shoulders at the same time. Then nothing sits right.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 16px' }}><FitDiagram /></div>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {FIT_STEPS.map((t, i) => (
          <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10, ..._sans(17, 'var(--cream-dim)'), lineHeight: 1.5 }}>
            <span aria-hidden="true" style={{ flexShrink: 0, width: 22, height: 22, marginTop: 2, borderRadius: 999, border: '1px solid var(--gold)', color: 'var(--cream)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
            <span>{t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* 9 — BUY BOX. Measurements are shown here rather than hidden behind a link: the
   single most persuasive device on this account is telling him to go and measure a
   polo he already owns, and that only works if the numbers are in front of him. */
window.BuySection = function BuySection({ product, color, setColor, size, setSize, onAdd, buyRef }) {
  const [active, setActive] = React.useState(0);
  const [openFit, setOpenFit] = React.useState(true);
  React.useEffect(() => { setActive(0); }, [color.key]);
  const gallery = color.gallery;
  const detailHead = { ..._sans(12, 'var(--muted)'), letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 12px' };
  // Commit to the cost, never to the mechanism. Returns are handled case by case,
  // so naming a courier risks a promise FEIRI cannot always keep.
  const reassurance = [
    ['truck', 'Free delivery anywhere in South Africa. Major cities 1 to 3 working days, outlying areas 2 to 5. You get a tracking number as soon as it ships.'],
    ['rotate-ccw', 'If it does not fit, tell us within 14 days and we sort the return out with you. It does not cost you anything, and you get a full refund.'],
    ['check-circle', 'Or pay it off. Stitch Pay Later splits R1,899 into interest-free instalments from R316.50.'],
  ];
  return (
    <Section ground="var(--panel-2)" label="Buy" id="buy">
      <div ref={buyRef} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,0.95fr)', gap: 'clamp(28px,4vw,60px)', alignItems: 'start' }} className="feiri-2col">
        {/* gallery */}
        <div>
          <div style={{ borderRadius: 12, overflow: 'hidden', background: '#000', aspectRatio: '4/5' }}>
            <img src={gallery[active]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginTop: 12 }}>
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ padding: 0, border: i === active ? '2px solid var(--gold)' : '1px solid var(--hair)', borderRadius: 7, overflow: 'hidden', cursor: 'pointer', aspectRatio: '1', background: '#000' }}>
                <img src={g} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>
        {/* details */}
        <div className="feiri-buybox">
          <Eyebrow color="var(--gold)">{product.line}</Eyebrow>
          <h2 style={{ ..._sc('clamp(2rem,3.2vw,2.8rem)', 'var(--cream)'), margin: '14px 0 14px' }}>{product.name}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 22 }}>
            <span style={{ ..._sc(30, 'var(--cream)'), flexShrink: 0 }}>{_money(product.price)}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><_Stars value={5} size={14} /><span style={{ ..._sans(13, 'var(--muted)') }}>{product.reviews} reviews</span></span>
          </div>
          {/* Removed 2026-08-28 on Gilbert's call: "this section now just underneath the
              price is too wordy let's remove it and just keep the color selector and new
              size guide that follows under it".

              Nothing unique died. All four of its claims are carried elsewhere on the page:
              3XL to 6XL in the H1, the marquee directly above this title and the footer;
              the collar in feature block 1 and a compare row; staying down when you sit in
              the hero subhead, feature block 2, a compare row and the fit block below; the
              knitted monogram in feature block 3 and a compare row.

              Its job was weak here anyway. It restated what the product is to a reader who
              has already scrolled 15,550px past the hero, the features, the lookbook, the
              comparison table and the reviews. Nobody arrives cold at the buy box on a
              single-page LP.

              The meta and og descriptions share this line's opening sentence but are a
              separate string generated by build/build.mjs, and are unaffected. */}

          <p style={detailHead}>Colourway: {color.name}</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 26 }}>
            {product.colors.map(c => (
              <button key={c.key} onClick={() => setColor(c)} title={c.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '8px 14px 8px 8px', borderRadius: 999, cursor: 'pointer', background: c.key === color.key ? 'rgba(250,240,214,0.08)' : 'transparent', border: c.key === color.key ? '1px solid var(--gold)' : '1px solid var(--hair)' }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, background: c.dot, border: '1px solid var(--hair-strong)' }}></span>
                <span style={{ ..._sans(15, 'var(--cream)') }}>{c.name}</span>
              </button>
            ))}
          </div>

          {/* Added 2026-08-28. Scope: 06-builds/2026-08-28-scope-fit-method-buy-box.md.
              The method used to live 888px BELOW the size buttons and 812px below the Buy
              button, as the last line of the measurements accordion, so a man could pick a
              size and check out having been told nothing about how to pick one. The store
              fixed exactly this on 2026-08-19 after Gilbert's return data traced 3XL men
              buying 5XL to the sizing copy; this page never got the same fix. It goes above
              the picker because an instruction after the decision is not an instruction. */}
          <FitMethod />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <p style={{ ...detailHead, margin: 0 }}>Select size</p>
            {/* Not a link. The measurements are inline below, and a fake link next to
                the size selector is a dead click. */}
            <span style={{ ..._sans(13, 'var(--muted)') }}>Measurements below</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
            {product.sizes.map(s => (
              <button key={s} onClick={() => setSize(s)} style={{ minWidth: 60, padding: '13px 16px', borderRadius: 7, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em',
                background: size === s ? 'var(--cream)' : 'transparent', color: size === s ? 'var(--navy-deep)' : 'var(--cream)', border: size === s ? '1px solid var(--cream)' : '1px solid var(--hair-strong)' }}>{s}</button>
            ))}
          </div>

          <div style={{ margin: '0 0 26px', borderTop: '1px solid var(--hair)' }}>
            <button onClick={() => setOpenFit(!openFit)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '20px 0', background: 'transparent', border: 0, cursor: 'pointer', textAlign: 'left', ..._sans(13, 'var(--cream)'), fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Measurements, taken flat, in centimetres
              <_Icon name={openFit ? 'minus' : 'plus'} size={17} color="var(--gold)" />
            </button>
            {openFit && (
              <React.Fragment>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        {['', '3XL', '4XL', '5XL', '6XL'].map((h, i) => (
                          <th key={i} style={{ textAlign: i ? 'center' : 'left', padding: '8px 6px', borderBottom: '1px solid var(--hair)', ..._sans(12, 'var(--muted)'), fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MEASURE.map(r => (
                        <tr key={r[0]}>
                          {r.map((c, i) => (
                            <td key={i} style={{ textAlign: i ? 'center' : 'left', padding: '11px 6px', borderBottom: '1px solid var(--hair)', whiteSpace: 'nowrap', ..._sans(16, i ? 'var(--cream)' : 'var(--cream-dim)') }}>{c}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ..._sans(17, 'var(--cream-dim)'), lineHeight: 1.6, margin: '14px 0 22px' }}>
                  Allow 1cm to 2cm either way. These are measured by hand. The surest way to pick your size is to lay a polo you already like flat on a bed and measure it the same way. The chest measurement picks your size. The body length is what tells you why your old polo rides up.
                </p>
              </React.Fragment>
            )}
          </div>

          <Btn2 variant="accent" size="lg" full onClick={() => onAdd()} style={{ marginBottom: 18 }}>
            {size ? `Buy your ${size}. ${_money(product.price)}` : 'Select your size'}
          </Btn2>

          {/* The handoff sentence that stood here from 2026-08-24 was removed on
              2026-08-31, Gilbert's call: the buy column reads as too much text. The
              reason it existed still stands, that landing on an unexpected domain is a
              trust hit in this market, so if the store handoff ever reads as a surprise
              in a recording, this is the line to bring back. */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {reassurance.map(([ic, txt]) => (
              <div key={ic} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, ..._sans(16, 'var(--cream-dim)'), lineHeight: 1.55 }}>
                <_Icon name={ic} size={18} sw={2.2} color="var(--cream)" style={{ marginTop: 2, flexShrink: 0 }} />
                {txt}
              </div>
            ))}
          </div>
          <p style={{ ..._sans(16, 'var(--cream-dim)'), lineHeight: 1.55, margin: '14px 0 0' }}>
            Not sure which size? <a href="https://wa.me/message/RBOA6UZAMVSWC1" target="_blank" rel="noopener" style={{ color: 'var(--gold)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, verticalAlign: '-0.18em' }}><_Icon name="whatsapp" size={17} color="currentColor" />Send us a WhatsApp</a> and we will work it out with you in two minutes.
          </p>

        </div>
      </div>
    </Section>
  );
};

/* 10 — TRUST ROW */
window.TrustRowSection = function TrustRowSection({ trust }) {
  return (
    <div style={{ background: 'var(--ink-black)', borderTop: '1px solid var(--hair)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(36px,5vw,56px) var(--gutter)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 28 }}>
        {trust.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center' }}>
            <_Icon name={t.icon} size={26} color="var(--cream)" sw={2.2} />
            <span style={{ ..._sans(16, 'var(--cream)'), fontWeight: 500 }}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 11 — GUARANTEE. With returns free, this stops being a list of conditions and
   becomes a reason to act, so the heading states the reader's benefit. The terms
   commit to the COST and never to the mechanism. */
window.GuaranteeSection = function GuaranteeSection() {
  return (
    <_Section ground="var(--navy-deep)" label="Guarantee">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }} className="feiri-2col">
        <div style={{ borderRadius: 14, overflow: 'hidden', background: '#000', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
          <img src="feiri-pdp/assets/guarantee-couple.jpg" alt="A FEIRI couple outside Sandton Prestige Suites" style={{ width: '100%', display: 'block' }} />
        </div>
        <div>
          <Eyebrow color="var(--gold)">No risk</Eyebrow>
          <h2 style={{ ..._sc('clamp(1.7rem,2.6vw,2.4rem)', 'var(--cream)'), margin: '18px 0 18px', lineHeight: 1.18 }}>Try it on at home. If it does not fit, sending it back will not cost you.</h2>
          <p style={{ ..._sans(17, 'var(--cream-dim)'), lineHeight: 1.66, marginBottom: 24, maxWidth: 480 }}>
            Wear it around the house. Sit down in it. Check the length against the shirt you measured. If it is not right, tell us within 14 days of the day it arrives and we will sort the return out with you. You will not be out of pocket for it. Your refund lands 7 to 14 days after the shirt reaches us.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {['14 days from the day it arrives to tell us', 'We sort the return out with you, at no cost to you', 'A full refund of what you paid, not a credit note', 'Your refund lands 7 to 14 days after it reaches us', 'Arrives in FEIRI Milano packaging'].map(t => (
              <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', ..._sans(16, 'var(--cream)') }}>
                <_Icon name="shield-check" size={20} color="var(--gold)" /> {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </_Section>
  );
};

/* 12 — FAQ */
window.FAQSection = function FAQSection({ faq }) {
  const [open, setOpen] = React.useState(0);
  return (
    <_Section ground="var(--ink-black)" label="FAQ">
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Eyebrow center color="var(--gold)">Questions</Eyebrow>
          <h2 style={{ ..._sc('clamp(2rem,3.4vw,3rem)', 'var(--cream)'), marginTop: 18 }}>Before you decide</h2>
        </div>
        <div>
          {faq.map((f, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--hair)', borderBottom: i === faq.length - 1 ? '1px solid var(--hair)' : 'none' }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, padding: '24px 4px', background: 'transparent', border: 0, cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ ..._sc(21, 'var(--cream)') }}>{f.q}</span>
                <_Icon name={open === i ? 'minus' : 'plus'} size={20} color="var(--gold)" style={{ flexShrink: 0 }} />
              </button>
              {open === i && (
                <div style={{ padding: '0 4px 26px', maxWidth: 680 }}>
                  <p style={{ ..._sans(17, 'var(--cream-dim)'), lineHeight: 1.66, margin: 0 }}>{f.a}</p>
                  {f.link && <a href={f.link.href} target="_blank" rel="noopener" style={{ ..._sans(17, 'var(--gold)'), display: 'inline-flex', alignItems: 'flex-start', gap: 8, marginTop: 12, fontWeight: 600 }}>{f.link.icon && <_Icon name={f.link.icon} size={17} color="currentColor" style={{ marginTop: 4 }} />}{f.link.label}</a>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </_Section>
  );
};

/* 13 — CROSS-SELL */
window.CrossSellSection = function CrossSellSection({ product, color, setColor, onBuy }) {
  const other = product.colors.find(c => c.key !== color.key) || product.colors[1];
  return (
    <_Section ground="var(--panel-2)" label="Cross-sell">
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <Eyebrow center color="var(--gold)">Also available</Eyebrow>
        <h2 style={{ ..._sc('clamp(2rem,3.4vw,3rem)', 'var(--cream)'), marginTop: 18 }}>The other colour</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(28px,4vw,56px)', alignItems: 'center', maxWidth: 1000, margin: '0 auto' }} className="feiri-2col">
        <div style={{ borderRadius: 14, overflow: 'hidden', background: '#000', aspectRatio: '4/5' }}>
          <img src={other.gallery[0]} alt={other.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        </div>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
            <span style={{ width: 24, height: 24, borderRadius: 999, background: other.dot, border: '1px solid var(--hair-strong)' }}></span>
            <span style={{ ..._sans(14, 'var(--gold)'), letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{other.name}</span>
          </span>
          <h3 style={{ ..._sc('clamp(1.8rem,2.8vw,2.4rem)', 'var(--cream)'), marginBottom: 14 }}>{product.name}</h3>
          <p style={{ ..._sans(17, 'var(--cream-dim)'), lineHeight: 1.64, marginBottom: 22, maxWidth: 420 }}>
            The same shirt and the same fit, in a darker colour. Also part of the 300.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <Btn2 variant="cream" size="lg" onClick={() => { setColor(other); onBuy(other); }}>Shop {other.name}. {_money(product.price)}</Btn2>
          </div>
        </div>
      </div>
    </_Section>
  );
};
