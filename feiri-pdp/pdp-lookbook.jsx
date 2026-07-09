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
      <span style={{ ...sans(14, 'var(--cream-dim)'), letterSpacing: '0.22em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      <span style={{ ...sans(14, 'var(--gold)'), letterSpacing: '0.16em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{colour}</span>
      <span className="lb-rule" />
    </div>
  );
}

const A = 'feiri-pdp/assets/lookbook/';

window.LookbookSection = function LookbookSection() {
  return (
    <window.Section ground="var(--ink-black)" label="Lookbook">
      <h2 className="lb-masthead" style={{ ...sc('clamp(2rem,3.6vw,3.3rem)', 'var(--cream)'), lineHeight: 1.1, textAlign: 'center', marginInline: 'auto' }}>Fashion Lookbook</h2>
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
        <span style={{ ...sans(15, 'var(--muted)'), letterSpacing: '0.14em' }}>Made for men who carry presence — proudly South African.</span>
      </div>
    </window.Section>
  );
};
