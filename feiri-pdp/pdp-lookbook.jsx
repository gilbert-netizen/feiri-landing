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
        <Chapter label="Chapter One" colour="Blue &amp; Cream" />

        {/* Trio: uniform cards */}
        <div className="lb-row-trio">
          <Plate src={A + 'gala-interview.png'} ratio="4 / 5" n="Nº 01" place="On Camera" tag="Blue &amp; Cream" />
          <Plate src={A + 'golf-blue.png'} ratio="4 / 5" n="Nº 02" place="The Course" tag="Blue &amp; Cream" />
          <Plate src={A + 'chey-9.png'} ratio="4 / 5" n="Nº 03" place="The House" tag="Blue &amp; Cream" />
        </div>

        {/* Portrait + still life */}
        <div className="lb-row-duo">
          <Plate src={A + 'chey-7.png'} ratio="4 / 5" n="Nº 04" place="The Drive" tag="Blue &amp; Cream" />
          <Plate src={A + 'creative-9.png'} ratio="4 / 5" n="Nº 05" place="At Rest" tag="Blue &amp; Cream" />
        </div>

        {/* Duo of still lifes */}
        <div className="lb-row-duo">
          <Plate src={A + 'creative-12.png'} ratio="1 / 1" n="Nº 06" place="En Route" tag="Blue &amp; Cream" />
          <Plate src={A + 'creative-1.png'} ratio="1 / 1" n="Nº 07" place="The Rail" tag="Blue &amp; Cream" />
        </div>

        <Chapter label="Chapter Two" colour="Black &amp; Sand" />

        {/* Trio: uniform cards */}
        <div className="lb-row-trio">
          <Plate src={A + 'chey-4.png'} ratio="4 / 5" n="Nº 08" place="At Altitude" tag="Black &amp; Sand" />
          <Plate src={A + 'off-duty-redcarpet.png'} ratio="4 / 5" n="Nº 09" place="The Arrival" tag="Black &amp; Sand" />
          <Plate src={A + 'golf-black.png'} ratio="4 / 5" n="Nº 10" place="The Green" tag="Black &amp; Sand" />
        </div>

        {/* Portrait + still life */}
        <div className="lb-row-duo">
          <Plate src={A + 'chey-1.png'} n="Nº 11" place="The Long Game" tag="Black &amp; Sand" />
          <Plate src={A + 'car-ocean.png'} ratio="4 / 5" n="Nº 12" place="Sea Air" tag="Black &amp; Sand" />
        </div>
      </div>

      {/* Closing line */}
      <div className="lb-close">
        <span style={{ ...sans(15, 'var(--muted)'), letterSpacing: '0.14em' }}>Made for men who carry presence — proudly South African.</span>
      </div>
    </window.Section>
  );
};
