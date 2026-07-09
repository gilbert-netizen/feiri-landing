/* global React */
// FEIRI PDP — sections 8–13
const { sc: _sc, sans: _sans, Icon: _Icon, Stars: _Stars, Eyebrow: _Eyebrow, Mono: _Mono, Section: _Section, money: _money } = window;
const Btn2 = window.Btn;

/* 8 — URGENCY STRIP */
window.UrgencySection = function UrgencySection({ product, color, scarcity }) {
  return (
    <div style={{ background: 'var(--navy-deep)', borderTop: '1px solid var(--hair)', borderBottom: '1px solid var(--hair)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '22px var(--gutter)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 'clamp(16px,4vw,48px)', textAlign: 'center' }}>
        <span style={{ ..._sans(13, 'var(--gold)'), fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Founders Edition</span>
        <span style={{ width: 5, height: 5, borderRadius: 9, background: 'var(--hair-strong)' }}></span>
        <span style={{ ..._sans(13, 'var(--cream)'), fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Only 300 made — ever</span>
        {scarcity && <React.Fragment>
          <span style={{ width: 5, height: 5, borderRadius: 9, background: 'var(--hair-strong)' }}></span>
          <span style={{ ..._sans(13, '#F0C9CC'), fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: 9, background: '#E06A74', boxShadow: '0 0 8px #E06A74' }}></span>
            {product.stockInSize} left in {color.name}
          </span>
        </React.Fragment>}
      </div>
    </div>
  );
};

/* 9 — BUY BOX */
window.BuySection = function BuySection({ product, color, setColor, size, setSize, onAdd, buyRef, scarcity }) {
  const [active, setActive] = React.useState(0);
  const [openFit, setOpenFit] = React.useState(true);
  React.useEffect(() => { setActive(0); }, [color.key]);
  const gallery = color.gallery;
  const detailHead = { ..._sans(11, 'var(--muted)'), letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 12px' };
  const fit = ['100% premium cotton knit', 'Structured collar that doesn’t collapse', 'Length engineered for 3XL–6XL proportions', 'Monogram jacquard-knitted, never printed', 'Holds its shape after every wash', 'Crafted for SA’s real men'];
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
          <p style={{ ..._sans(15.5, 'var(--cream-dim)'), lineHeight: 1.6, marginBottom: 28 }}>
            A structured monogram knit polo, built from the ground up for bigger men. The collar holds, the length stays put, and the fit sits balanced — never tight, never sloppy.
          </p>

          <p style={detailHead}>Colourway — {color.name}</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 26 }}>
            {product.colors.map(c => (
              <button key={c.key} onClick={() => setColor(c)} title={c.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '8px 14px 8px 8px', borderRadius: 999, cursor: 'pointer', background: c.key === color.key ? 'rgba(250,240,214,0.08)' : 'transparent', border: c.key === color.key ? '1px solid var(--gold)' : '1px solid var(--hair)' }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, background: c.dot, border: '1px solid var(--hair-strong)' }}></span>
                <span style={{ ..._sans(13.5, 'var(--cream)') }}>{c.name}</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <p style={{ ...detailHead, margin: 0 }}>Select size</p>
            <span style={{ ..._sans(12.5, 'var(--gold)'), cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>Size guide</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
            {product.sizes.map(s => (
              <button key={s} onClick={() => setSize(s)} style={{ minWidth: 60, padding: '13px 16px', borderRadius: 7, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em',
                background: size === s ? 'var(--cream)' : 'transparent', color: size === s ? 'var(--navy-deep)' : 'var(--cream)', border: size === s ? '1px solid var(--cream)' : '1px solid var(--hair-strong)' }}>{s}</button>
            ))}
          </div>

          <Btn2 variant="accent" size="lg" full onClick={() => onAdd()} style={{ marginBottom: 14 }}>
            {size ? `Add to bag — ${_money(product.price)}` : 'Select your size'}
          </Btn2>
          {scarcity && <p style={{ ..._sans(13, '#E89aa0'), textAlign: 'center', marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
            <span style={{ width: 6, height: 6, borderRadius: 9, background: '#E06A74' }}></span>
            Only {product.stockInSize} left in {color.name}
          </p>}

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, ..._sans(13, 'var(--muted)'), marginBottom: 8 }}>
            <_Icon name="truck" size={16} color="var(--gold)" /> Free nationwide shipping · Crafted for SA’s real men
          </div>

          <div style={{ marginTop: 20, borderTop: '1px solid var(--hair)' }}>
            <button onClick={() => setOpenFit(!openFit)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', background: 'transparent', border: 0, cursor: 'pointer', ..._sans(13, 'var(--cream)'), fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              The FEIRI fit <_Icon name={openFit ? 'minus' : 'plus'} size={17} color="var(--gold)" />
            </button>
            {openFit && (
              <ul style={{ margin: '0 0 22px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                {fit.map(d => (
                  <li key={d} style={{ display: 'flex', gap: 11, ..._sans(14.5, 'var(--cream-dim)'), lineHeight: 1.5 }}>
                    <_Icon name="check" size={16} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} /> {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
            <_Icon name={t.icon} size={26} color="var(--gold)" sw={1.5} />
            <span style={{ ..._sans(14.5, 'var(--cream)'), fontWeight: 500 }}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 11 — GUARANTEE */
window.GuaranteeSection = function GuaranteeSection() {
  return (
    <_Section ground="var(--navy-deep)" label="Guarantee">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }} className="feiri-2col">
        <div style={{ borderRadius: 14, overflow: 'hidden', background: '#000', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
          <img src="feiri-pdp/assets/guarantee-couple.jpg" alt="A FEIRI couple outside Sandton Prestige Suites" style={{ width: '100%', display: 'block' }} />
        </div>
        <div>
          <Eyebrow color="var(--gold)">No risk</Eyebrow>
          <h2 style={{ ..._sc('clamp(2rem,3.4vw,3rem)', 'var(--cream)'), margin: '18px 0 18px' }}>The Presence Guarantee</h2>
          <p style={{ ..._sans(16.5, 'var(--cream-dim)'), lineHeight: 1.66, marginBottom: 24, maxWidth: 460 }}>
            Wear it. Sit in it. Walk into a room in it. If the Signature Knit doesn’t carry the way we promised — the collar, the length, the presence — send it back within 14 days for a full refund.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {['14-day no-questions returns', 'Arrives in signature FEIRI Milano packaging', 'Free shipping, both ways'].map(t => (
              <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', ..._sans(15, 'var(--cream)') }}>
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
              {open === i && <p style={{ ..._sans(15.5, 'var(--cream-dim)'), lineHeight: 1.66, padding: '0 4px 26px', maxWidth: 680 }}>{f.a}</p>}
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
        <Eyebrow center color="var(--gold)">Complete the set</Eyebrow>
        <h2 style={{ ..._sc('clamp(2rem,3.4vw,3rem)', 'var(--cream)'), marginTop: 18 }}>The other colourway</h2>
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
          <p style={{ ..._sans(16, 'var(--cream-dim)'), lineHeight: 1.64, marginBottom: 22, maxWidth: 420 }}>
            Same structured knit, same intentional fit — a darker, dressed-up register for the nights that call for it. Limited Founders Edition stock.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <Btn2 variant="cream" size="lg" onClick={() => { setColor(other); onBuy(other); }}>Shop {other.name} — {_money(product.price)}</Btn2>
          </div>
        </div>
      </div>
    </_Section>
  );
};
