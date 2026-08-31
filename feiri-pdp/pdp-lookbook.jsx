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
        <span className="lb-tag" style={{ ...sans(12, 'var(--muted)') }}>{tag}</span>
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
    <window.Section ground="var(--navy-deep)" label="Lookbook" id="lookbook">
      {/* Demoted from an h2 masthead to an eyebrow on 2026-08-31. Owners now sits
          directly above this and carries the block's single headline, "The FEIRI man
          does not dress down because of his size", which is the only line on the page
          naming who this is for. "Fashion Lookbook" is a category label that tells a
          buyer nothing the pictures have not, so it marks the continuation instead of
          competing for the heading. The wrapper keeps .lb-masthead, which owns the
          640px max-width and the 40 to 64px gap down to the first plate. */}
      {/* F2 fix, 2026-08-31. The demotion put --gold #8A6D2E at 12px on this section's
          #F4EFE6 ground, measuring 4.26:1 against the 4.5:1 AA floor for normal text.
          #82662B on the same ground measures 4.72:1. Scoped to this instance rather than
          changed on the --gold token, because --gold is also used on dark grounds where
          darkening it would reduce contrast instead of improving it. The token-level fix
          belongs with F1, which is Gilbert's and dated 2026-09-11. */}
      <div className="lb-masthead" style={{ textAlign: 'center', marginInline: 'auto' }}>
        <Eyebrow center color="#82662B">Fashion Lookbook</Eyebrow>
      </div>
      <div className="feiri-lookbook">
        <Chapter label="Chapter One" colour="Blue &amp; Cream" />

        {/* Trio: uniform cards */}
        <div className="lb-row-trio">
          <Plate src={A + 'gala-interview.jpg'} ratio="4 / 5" n="Nº 01" place="On Camera" tag="Blue &amp; Cream" />
          <Plate src={A + 'golf-blue.jpg'} ratio="4 / 5" n="Nº 02" place="The Course" tag="Blue &amp; Cream" />
          <Plate src={A + 'chey-9.jpg'} ratio="4 / 5" n="Nº 03" place="The House" tag="Blue &amp; Cream" />
        </div>

        {/* Portrait + still life */}
        <div className="lb-row-duo">
          <Plate src={A + 'chey-7.jpg'} ratio="4 / 5" n="Nº 04" place="The Drive" tag="Blue &amp; Cream" />
          <Plate src={A + 'creative-9.jpg'} ratio="4 / 5" n="Nº 05" place="At Rest" tag="Blue &amp; Cream" />
        </div>

        {/* Duo of still lifes */}
        <div className="lb-row-duo">
          <Plate src={A + 'creative-12.jpg'} ratio="1 / 1" n="Nº 06" place="En Route" tag="Blue &amp; Cream" />
          <Plate src={A + 'creative-1.jpg'} ratio="1 / 1" n="Nº 07" place="The Rail" tag="Blue &amp; Cream" />
        </div>

        <Chapter label="Chapter Two" colour="Black &amp; Sand" />

        {/* Trio: uniform cards */}
        <div className="lb-row-trio">
          <Plate src={A + 'chey-4.jpg'} ratio="4 / 5" n="Nº 08" place="At Altitude" tag="Black &amp; Sand" />
          <Plate src={A + 'off-duty-redcarpet.jpg'} ratio="4 / 5" n="Nº 09" place="The Arrival" tag="Black &amp; Sand" />
          <Plate src={A + 'golf-black.jpg'} ratio="4 / 5" n="Nº 10" place="The Green" tag="Black &amp; Sand" />
        </div>

        {/* Portrait + still life */}
        <div className="lb-row-duo">
          <Plate src={A + 'chey-1.jpg'} n="Nº 11" place="The Long Game" tag="Black &amp; Sand" />
          <Plate src={A + 'car-ocean.jpg'} ratio="4 / 5" n="Nº 12" place="Sea Air" tag="Black &amp; Sand" />
        </div>
      </div>

      {/* Closing line removed 2026-08-12: pure atmosphere, and it broke gate 4.
          The real upgrade for this section is size-tagged captions
          ("Sipho, 5XL, Cream & Blue"), which is blocked on names and sizes. */}
    </window.Section>
  );
};
