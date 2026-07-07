/* global React, ReactDOM */
// Combined bundle for production export — each source file wrapped in its own IIFE to avoid top-level const collisions (e.g. repeated `const { sc, sans } = window`).


/* ===== feiri-pdp/tweaks-panel.jsx ===== */
(function(){
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel" data-omelette-chrome=""
           style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">
          {children}
        </div>
      </div>
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
             value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = (o) => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({ 2: 16, 3: 10 }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = (s) => {
      const m = options.find((o) => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return <TweakSelect label={label} value={value} options={options}
                        onChange={(s) => onChange(resolve(s))} />;
  }
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

const __TwkCheck = ({ light }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          stroke={light ? 'rgba(0,0,0,.78)' : '#fff'} />
  </svg>
);

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({ label, value, options, onChange }) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl"><span>{label}</span></div>
        <input type="color" className="twk-swatch" value={value}
               onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = (o) => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const colors = Array.isArray(o) ? o : [o];
          const [hero, ...rest] = colors;
          const sup = rest.slice(0, 4);
          const on = key(o) === cur;
          return (
            <button key={i} type="button" className="twk-chip" role="radio"
                    aria-checked={on} data-on={on ? '1' : '0'}
                    aria-label={colors.join(', ')} title={colors.join(' · ')}
                    style={{ background: hero }}
                    onClick={() => onChange(o)}>
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => <i key={j} style={{ background: c }} />)}
                </span>
              )}
              {on && <__TwkCheck light={__twkIsLight(hero)} />}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}

Object.assign(window, {
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton,
});

})();

/* ===== feiri-pdp/pdp-data.jsx ===== */
(function(){
/* global React */
// FEIRI Milano — Inverted PDP. Data + copy + shared helpers.
// Avatar: the Status & Social Man (28–42). "No loud logos. Just authority."

window.PDP_DATA = {
  product: {
    name: 'The Signature Monogram Knit',
    line: 'FEIRI Founders Edition',
    price: 2799,
    rating: 5,
    reviews: 7,
    sizes: ['3XL', '4XL', '5XL', '6XL'],
    colors: [
      { key: 'blue',  name: 'Blue & Cream', dot: 'var(--cobalt-600)',
        hero: 'feiri-pdp/assets/hero-couch-blue.jpg',
        gallery: ['feiri-pdp/assets/front-blue.jpg','feiri-pdp/assets/detail-blue.jpg','feiri-pdp/assets/seated-blue.jpg','feiri-pdp/assets/side-blue.jpg','feiri-pdp/assets/flat-blue.jpg'] },
      { key: 'black', name: 'Black & Sand', dot: '#1A1814',
        hero: 'feiri-pdp/assets/hero-black.jpg',
        gallery: ['feiri-pdp/assets/profile-black.jpg','feiri-pdp/assets/flat-black.jpg','feiri-pdp/assets/hero-black.jpg','feiri-pdp/assets/duo.jpg'] },
    ],
    stockInSize: 27,
  },

  // 4 — Features / benefits
  features: [
    { img: 'feiri-pdp/assets/detail-blue.jpg', title: 'A collar that holds the room',
      body: 'Structured, weighted, built to stand — never the collapsed, curling collar that quietly ages a man. It sits the way it should, all night.' },
    { img: 'feiri-pdp/assets/side-blue.jpg', title: 'Length that stays where it should',
      body: 'Engineered for 3XL–6XL proportions, so it never rides up when you sit, reach, or lean in. No tugging. No re-adjusting. Just ease.' },
    { img: 'feiri-pdp/assets/blue-5.jpg', title: 'Knit, not printed',
      body: 'The FF monogram is jacquard-knitted into the cloth itself — depth you can feel. It does not crack, fade, or peel after the wash.' },
  ],

  // 5 — The standard (maker / philosophy)
  standard: [
    { n: '01', title: 'Designed from the ground up', body: 'Most labels design for smaller men and simply “size up.” We start with your proportions and build the garment outward.' },
    { n: '02', title: 'Shoulders built for strength', body: 'A cut that frames a bigger frame with intention — balanced through the chest and midsection. Never tight. Never sloppy.' },
    { n: '03', title: 'Fabric that earns its keep', body: 'A premium cotton knit selected for structure and drape — it holds its shape after every wash, season after season.' },
  ],

  // 6 — Us vs Them
  compare: [
    ['Designed from the ground up for bigger men', true, false],
    ['Structured collar that holds its shape', true, false],
    ['Length engineered for 3XL–6XL', true, false],
    ['Monogram knitted in, not printed on', true, false],
    ['Limited to 300 — never mass-produced', true, false],
    ['Proudly South African', true, false],
  ],

  // 7 — Testimonials
  testimonials: [
    { name: 'Anonymous', body: 'I’m not exaggerating — the confidence this top brings out of you is crazy. I’ve never had a better fitment in all my life. The quality goes crazy, you feel it instantly when you pick it up. As a fellow big guy, we deserve to be stylish too.', size: 'South Africa', title: 'Out of this world' },
    { name: 'Kabelo S.', body: 'I’ve never felt this confident in clothes before.', size: 'Johannesburg', title: '' },
    { name: 'Thabo K.', body: 'Luxury clothing that actually fits my body properly.', size: 'Durban', title: '' },
    { name: 'Sipho M.', body: 'Finally a brand that understands bigger guys. The fit is perfect.', size: 'Cape Town', title: '' },
    { name: 'Anonymous', body: 'Now this is comfort for the big boys.', size: 'South Africa', title: 'The fabric on point' },
    { name: 'Jacob', body: 'Very nice and premium quality. Comfortable fit.', size: 'Verified buyer', title: 'Marvelous!' },
  ],

  // 10 — trust row
  trust: [
    { icon: 'truck', label: 'Free nationwide shipping' },
    { icon: 'shield-check', label: 'Secure checkout' },
    { icon: 'scissors', label: 'Crafted for SA’s real men' },
    { icon: 'rotate-ccw', label: '14-day Presence Guarantee' },
  ],

  // 12 — FAQ
  faq: [
    { q: 'Will it actually fit a bigger man properly?', a: 'Yes. FEIRI is designed from the ground up for 3XL–6XL — the chest and midsection sit balanced, the shoulders are built for a larger frame, and the length is engineered so nothing rides up. Never tight, never sloppy.' },
    { q: 'How do I choose my size?', a: 'Most men take their usual size — the cut is intentional, not slim. If you are between sizes, size down for a cleaner line or up for more ease. Message us on WhatsApp and we will size you in two minutes.' },
    { q: 'Is the monogram printed?', a: 'No. The FF monogram is jacquard-knitted into the fabric, so it has real depth and will not crack, peel, or fade in the wash.' },
    { q: 'What does “Founders Edition” mean?', a: 'This run is limited to 300 pieces across all sizes. When a size sells out in this colourway, it is gone. We restock rarely and never in the same form.' },
    { q: 'Shipping and returns?', a: 'Free shipping nationwide. If the piece does not carry the way we promised, return it within 14 days for a full refund — our Presence Guarantee.' },
  ],
};

})();

/* ===== feiri-pdp/pdp-parts.jsx ===== */
(function(){
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
};
window.Icon = function Icon({ name, size = 20, sw = 1.6, color = 'currentColor', style }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-flex', flexShrink: 0, ...style }} dangerouslySetInnerHTML={{ __html: ICONS[name] || '' }} />;
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

// FF monogram mark (svg file)
window.Mono = function Mono({ size = 22, opacity = 1, style }) {
  return <img src="feiri-pdp/assets/monogram.svg" alt="" style={{ height: size, width: 'auto', opacity, display: 'block', ...style }} />;
};

// Section wrapper — controls ground colour + vertical rhythm
window.Section = function Section({ children, ground = 'transparent', pad = 'clamp(64px,8vw,120px)', id, label, style }) {
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
          <span style={{ ...window.sc('clamp(15px,1.6vw,20px)', color), padding: '0 26px', whiteSpace: 'nowrap', opacity: 0.92 }}>{t}</span>
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

window.money = (n) => 'R\u00a0' + Number(n).toLocaleString('en-ZA', { minimumFractionDigits: 2 });

Object.assign(window, { _F });

})();

/* ===== feiri-pdp/pdp-sections-a.jsx ===== */
(function(){
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
    <section data-screen-label="Hero" style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: 'var(--ink-black)' }}>
      {product.colors.map(c => (
        <img key={c.key} src={c.hero} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', opacity: c.key === color.key ? 1 : 0, transition: 'opacity .7s ease' }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(6,18,26,0.82) 0%, rgba(6,18,26,0.58) 30%, rgba(6,18,26,0.18) 58%, rgba(6,18,26,0) 80%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(6,18,26,0.5) 0%, rgba(6,18,26,0) 34%)' }} />
      <div style={{ position: 'relative', maxWidth: 1240, width: '100%', margin: '0 auto', padding: 'clamp(48px,7vw,96px) var(--gutter)' }}>
        <div style={{ maxWidth: 600 }}>
          <Eyebrow color="var(--gold)">{product.line} · Only 300 made</Eyebrow>
          <h1 style={{ ...sc('clamp(2.8rem,6vw,5rem)', 'var(--cream)'), margin: '22px 0 0', lineHeight: 1.02, textWrap: 'balance' }}>{lines[0]}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 36 }}>
            <Btn variant="cream" size="lg" onClick={onBuy}>Claim Your Limited Piece</Btn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Stars value={5} size={16} />
              <span style={{ ...sans(13, 'var(--cream-dim)'), letterSpacing: '0.04em' }}>Rated 5/5 by Verified Owners</span>
            </div>
          </div>
          {scarcity && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 30, padding: '9px 16px', borderRadius: 999, background: 'rgba(122,20,32,0.22)', border: '1px solid rgba(201,80,90,0.4)' }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: '#E06A74', boxShadow: '0 0 8px #E06A74' }}></span>
              <span style={{ ...sans(12.5, '#F0C9CC'), fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Founders Edition — selling through fast</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* 2 — OWNERS (real owners in place of logos) */
window.OwnersSection = function OwnersSection() {
  const owners = [
    { src: 'feiri-pdp/assets/owners/o1.jpg', tag: 'The Ivy Luxe' },
    { src: 'feiri-pdp/assets/owners/o5.jpg', tag: 'Cape Winelands' },
    { src: 'feiri-pdp/assets/owners/o2.jpg', tag: 'Home turf' },
    { src: 'feiri-pdp/assets/owners/o3.jpg', tag: 'Golden hour, 18th' },
    { src: 'feiri-pdp/assets/owners/o4.jpg', tag: 'Sunday best' },
    { src: 'feiri-pdp/assets/owners/o6.jpg', tag: 'Date night' },
  ];
  return (
    <Section ground="var(--ink-black)" label="Owners">
      <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 56px' }}>
        <Eyebrow center color="var(--gold)">Worn by the FEIRI man</Eyebrow>
        <h2 style={{ ...sc('clamp(2rem,3.6vw,3.3rem)', 'var(--cream)'), marginTop: 18, lineHeight: 1.1 }}>The SA man making moves &amp; in his element</h2>
        <p style={{ ...sans(16, 'var(--cream-dim)'), lineHeight: 1.6, marginTop: 18, maxWidth: 520, marginInline: 'auto' }}>
          No paid models. No borrowed logos. Just the men who already own the room — and now own the knit.
        </p>
      </div>
      <div className="feiri-owners-grid">
        {owners.map((o, i) => (
          <figure key={i} className="feiri-owner-card" style={{ margin: 0, position: 'relative', borderRadius: 11, overflow: 'hidden', border: '1px solid var(--hair)', background: '#000', boxShadow: '0 18px 44px rgba(0,0,0,0.45)' }}>
            <div style={{ aspectRatio: '3 / 4', overflow: 'hidden' }}>
              <img src={o.src} alt="FEIRI owner" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', transition: 'transform .6s ease' }} />
            </div>
            <figcaption style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '34px 14px 12px', background: 'linear-gradient(to top, rgba(6,18,26,0.86), rgba(6,18,26,0))', display: 'flex', alignItems: 'center', gap: 7 }}>
              <img src="feiri-pdp/assets/monogram.svg" alt="" style={{ height: 13, opacity: 0.7, filter: 'brightness(0) invert(1)' }} />
              <span style={{ ...sans(11.5, 'var(--cream)'), letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, opacity: 0.92 }}>{o.tag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
};

/* 3 — TRUST MARQUEE */
window.TrustSection = function TrustSection() {
  return <Marquee items={['Proudly Local, Internationally Inspired.', 'Limited to 300 pieces', 'Built for 3XL – 6XL', 'Free nationwide shipping', 'Monogram knitted, never printed', 'Worn, not styled']} />;
};

/* 3 — EDITORIAL / "in motion" — replaced by LookbookSection (pdp-lookbook.jsx) */

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
              <Icon name="x" size={20} color="rgba(250,240,214,0.32)" sw={2} />
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
          <p style={{ ...sans(14, 'var(--cream-dim)'), marginTop: 6 }}>Rated Highly by Verified Owners</p>
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

})();

/* ===== feiri-pdp/pdp-lookbook.jsx ===== */
(function(){
/* global React */
// FEIRI PDP — The Lookbook (season's catalogue / editorial gallery)
const { sc, sans, Eyebrow } = window;

// A single catalogue plate: framed image + hairline caption row
function Plate({ src, ratio = '4 / 5', n, place, tag }) {
  return (
    <figure className="lb-fig">
      <div className="lb-frame" style={{ aspectRatio: ratio }}>
        <img src={src} alt={place} loading="lazy" />
      </div>
      <figcaption className="lb-cap">
        <span className="lb-idx" style={{ ...sc(15, 'var(--gold)') }}>{n}</span>
        <span className="lb-place" style={{ ...sc(17, 'var(--cream)') }}>{place}</span>
        <span className="lb-tag" style={{ ...sans(10.5, 'var(--muted)') }}>{tag}</span>
      </figcaption>
    </figure>
  );
}

function Chapter({ label, colour }) {
  return (
    <div className="lb-chapter">
      <span className="lb-rule" />
      <span style={{ ...sans(12, 'var(--cream-dim)'), letterSpacing: '0.22em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      <span style={{ ...sans(12, 'var(--gold)'), letterSpacing: '0.16em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{colour}</span>
      <span className="lb-rule" />
    </div>
  );
}

const A = 'feiri-pdp/assets/lookbook/';

window.LookbookSection = function LookbookSection() {
  return (
    <window.Section ground="var(--ink-black)" label="Lookbook">
      <div className="feiri-lookbook">
        <Chapter label="Chapter One" colour="Black &amp; Sand" />

        {/* Feature: tall portrait + stacked still lifes */}
        <div className="lb-row-feat">
          <Plate src={A + 'chey-4.png'} n="Nº 01" place="At Altitude" tag="Black &amp; Sand" />
          <div className="lb-stack">
            <Plate src={A + 'creative-6.png'} ratio="1 / 1" n="Nº 02" place="Off-Duty" tag="Black &amp; Sand" />
            <Plate src={A + 'creative-10.png'} ratio="1 / 1" n="Nº 03" place="Still Life" tag="Black &amp; Sand" />
          </div>
        </div>

        {/* Portrait + still life */}
        <div className="lb-row-duo">
          <Plate src={A + 'chey-1.png'} n="Nº 04" place="The Long Game" tag="Black &amp; Sand" />
          <Plate src={A + 'creative-14.png'} ratio="4 / 5" n="Nº 05" place="Sunday Morning" tag="Black &amp; Sand" />
        </div>

        <Chapter label="Chapter Two" colour="Blue &amp; Cream" />

        {/* Feature (mirrored): stacked still lifes + portrait */}
        <div className="lb-row-feat lb-row-feat--rev">
          <div className="lb-stack">
            <Plate src={A + 'creative-2.png'} ratio="1 / 1" n="Nº 06" place="Folded" tag="Blue &amp; Cream" />
            <Plate src={A + 'creative-11.png'} ratio="1 / 1" n="Nº 07" place="The Table" tag="Blue &amp; Cream" />
          </div>
          <Plate src={A + 'chey-9.png'} ratio="4 / 5" n="Nº 08" place="The House" tag="Blue &amp; Cream" />
        </div>

        {/* Portrait + still life */}
        <div className="lb-row-duo">
          <Plate src={A + 'chey-7.png'} ratio="4 / 5" n="Nº 09" place="The Drive" tag="Blue &amp; Cream" />
          <Plate src={A + 'creative-9.png'} ratio="4 / 5" n="Nº 10" place="At Rest" tag="Blue &amp; Cream" />
        </div>

        {/* Duo of still lifes */}
        <div className="lb-row-duo">
          <Plate src={A + 'creative-12.png'} ratio="1 / 1" n="Nº 11" place="En Route" tag="Blue &amp; Cream" />
          <Plate src={A + 'creative-1.png'} ratio="1 / 1" n="Nº 12" place="The Rail" tag="Blue &amp; Cream" />
        </div>
      </div>

      {/* Closing line */}
      <div className="lb-close">
        <span style={{ ...sans(12.5, 'var(--muted)'), letterSpacing: '0.14em' }}>Made for men who carry presence — proudly South African.</span>
      </div>
    </window.Section>
  );
};

})();

/* ===== feiri-pdp/pdp-sections-b.jsx ===== */
(function(){
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
            <Btn2 variant="cream" size="lg" onClick={() => { setColor(other); onBuy(); }}>Shop {other.name} — {_money(product.price)}</Btn2>
          </div>
        </div>
      </div>
    </_Section>
  );
};

})();

/* ===== feiri-pdp/pdp-app.jsx ===== */
(function(){
/* global React, ReactDOM */
// FEIRI PDP — app shell, chrome, state, tweaks, assembly.
const { sc, sans, Icon, Mono, money } = window;
const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor } = window;
const D = window.PDP_DATA;
const PRODUCT_URL = 'https://feiri.co.za/products/feiri-signature-monogram-tee-khaki-blue';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mood": "midnight",
  "accent": "#2C53C9",
  "scarcity": true,
  "heroLine": "No loud logos"
}/*EDITMODE-END*/;

const MOODS = {
  midnight: { '--ink-black': '#080F14', '--navy-deep': '#0C2330', '--panel': '#10293659', '--panel-2': '#0A1A24' },
  marine:   { '--ink-black': '#0C2A3B', '--navy-deep': '#103A52', '--panel': '#17455f80', '--panel-2': '#0E3146' },
};

function Header({ bag, onBuy }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ background: 'var(--navy-deep)', borderBottom: '1px solid var(--hair)', textAlign: 'center', padding: '9px 16px' }}>
        <span style={{ ...sans(12, 'var(--gold)'), letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Founders Edition · Only 300 made · Free nationwide shipping</span>
      </div>
      <div style={{ background: 'var(--ink-black)', borderBottom: '1px solid var(--hair)', backdropFilter: 'blur(8px)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '16px var(--gutter)', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 20 }}>
          <nav className="feiri-nav" style={{ display: 'flex', gap: 26 }}>
            {['Shop', 'The Fit', 'Founders Edition'].map(l => (
              <a key={l} href="#buy" onClick={(e) => { e.preventDefault(); onBuy(); }} style={{ ...sans(13, 'var(--cream-dim)'), letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', cursor: 'pointer' }}>{l}</a>
            ))}
          </nav>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="feiri-pdp/assets/lockup-cream.svg" alt="FEIRI Milano" style={{ height: 40 }} />
          </a>
          <div className="feiri-nav-icons" style={{ display: 'flex', gap: 20, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Icon name="search" size={19} color="var(--cream)" />
            <Icon name="user" size={19} color="var(--cream)" />
            <button onClick={onBuy} style={{ position: 'relative', background: 'transparent', border: 0, cursor: 'pointer', color: 'var(--cream)', display: 'inline-flex' }}>
              <Icon name="shopping-bag" size={20} color="var(--cream)" />
              {bag > 0 && <span style={{ position: 'absolute', top: -7, right: -9, minWidth: 17, height: 17, padding: '0 4px', borderRadius: 999, background: 'var(--cobalt)', color: '#fff', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{bag}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const cols = [
    ['Shop', ['The Signature Knit', 'Blue & Cream', 'Black & Sand', 'Size 3XL–6XL']],
    ['The House', ['Our standard', 'The FEIRI fit', 'Founders Edition', 'Crafted in SA']],
    ['Support', ['Size guide', 'Shipping & returns', 'Presence Guarantee', 'WhatsApp us']],
  ];
  return (
    <footer style={{ background: '#05101699', borderTop: '1px solid var(--hair)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(56px,7vw,88px) var(--gutter) 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40 }} className="feiri-foot">
          <div>
            <img src="feiri-pdp/assets/lockup-cream.svg" alt="FEIRI Milano" style={{ height: 48, marginBottom: 18 }} />
            <p style={{ ...sans(14, 'var(--cream-dim)'), lineHeight: 1.6, maxWidth: 300 }}>Premium monogram knitwear, built from the ground up for bigger men. Proudly South African.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <Icon name="instagram" size={20} color="var(--cream)" />
            </div>
          </div>
          {cols.map(([h, items]) => (
            <div key={h}>
              <h4 style={{ ...sans(12, 'var(--gold)'), letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 18 }}>{h}</h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {items.map(it => <li key={it}><a href="#" onClick={e => e.preventDefault()} style={{ ...sans(14, 'var(--cream-dim)'), textDecoration: 'none' }}>{it}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--hair)', marginTop: 48, paddingTop: 26, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ ...sans(12.5, 'var(--muted)') }}>© {new Date().getFullYear()} FEIRI Milano · feiri.co.za · Built &amp; powered by V8 Media</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {['VISA', 'MC', 'AMEX', ' Pay', 'G Pay'].map(p => (
              <span key={p} style={{ ...sans(11, 'var(--cream-dim)'), fontWeight: 600, padding: '5px 10px', border: '1px solid var(--hair)', borderRadius: 5 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsApp() {
  return (
    <a href="https://wa.me/27000000000" target="_blank" rel="noreferrer" className="feiri-wa" style={{ position: 'fixed', right: 22, bottom: 22, zIndex: 60, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 20px 13px 16px', borderRadius: 999, background: '#25D366', color: '#06351A', textDecoration: 'none', boxShadow: '0 12px 32px rgba(0,0,0,0.45)', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14 }}>
      <Icon name="message-circle" size={22} color="#06351A" sw={2} /> Contact us
    </a>
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
  const renderKey = `${color.key}-${size}-${t.mood}-${t.scarcity}-${bag}`;

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const scrollToBuy = () => {
    const el = document.getElementById('buy');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    return;
  };
  const goToProduct = () => { window.open(PRODUCT_URL, '_blank', 'noopener'); };
  const onAdd = () => {
    if (!size) { scrollToBuy(); return; }
    goToProduct();
  };

  const heroLine = t.heroLine;
  const rootStyle = { ...MOODS[t.mood || 'midnight'], '--cobalt': t.accent || '#2C53C9' };

  return (
    <div data-theme="dark" style={rootStyle}>
      <Header bag={bag} onBuy={goToProduct} />
      <main>
        <window.HeroSection product={D.product} color={color} onBuy={goToProduct} scarcity={t.scarcity} heroLine={heroLine} />
        <window.OwnersSection />
        <window.TrustSection />
        <window.LookbookSection />
        <window.FeaturesSection features={D.features} />
        <window.StandardSection standard={D.standard} />
        <window.CompareSection compare={D.compare} />
        <window.TestimonialsSection testimonials={D.testimonials} rating={D.product.rating} reviews={D.product.reviews} />
        <window.UrgencySection product={D.product} color={color} scarcity={t.scarcity} />
        <window.BuySection product={D.product} color={color} setColor={setColor} size={size} setSize={setSize} onAdd={onAdd} buyRef={buyRef} scarcity={t.scarcity} />
        <window.TrustRowSection trust={D.trust} />
        <window.GuaranteeSection />
        <window.FAQSection faq={D.faq} />
        <window.CrossSellSection product={D.product} color={color} setColor={setColor} onBuy={goToProduct} />
      </main>
      <Footer />
      <WhatsApp />
      <Toast show={toast} label={`Added — ${color.name}, ${size || ''}`} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Mood" />
        <TweakRadio label="Register" value={t.mood} options={['midnight', 'marine']} onChange={v => setTweak('mood', v)} />
        <TweakColor label="Accent" value={t.accent} options={['#2C53C9', '#22409B', '#0D3D56']} onChange={v => setTweak('accent', v)} />
        <TweakSection label="Conversion" />
        <TweakToggle label="Scarcity cues" value={t.scarcity} onChange={v => setTweak('scarcity', v)} />
        <TweakSection label="Hero copy" />
        <TweakRadio label="Headline" value={t.heroLine} options={['No loud logos', 'Carry presence']} onChange={v => setTweak('heroLine', v)} />
      </TweaksPanel>
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
    'Section', 'HeroSection', 'OwnersSection', 'TrustSection', 'LookbookSection',
    'FeaturesSection', 'StandardSection', 'CompareSection', 'TestimonialsSection',
    'UrgencySection', 'BuySection', 'TrustRowSection', 'GuaranteeSection',
    'FAQSection', 'CrossSellSection', 'PDP_DATA', 'useTweaks', 'TweaksPanel',
  ];
  const ready = required.every(k => typeof window[k] !== 'undefined');
  if (!ready) { requestAnimationFrame(mountWhenReady); return; }
  window.__feiriRoot = window.__feiriRoot || ReactDOM.createRoot(document.getElementById('root'));
  window.__feiriRoot.render(<App />);
})();

})();
