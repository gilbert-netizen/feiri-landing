/* global React */
// FEIRI Milano — Inverted PDP. Data + copy + shared helpers.
// Copy standard: the Copy Law (one test, nine gates, no em dashes).
// Deck: Web CRO/internal/feiri/05-copy/2026-08-10-drop-lp-copy-deck.md
// Buyer: a man who wears 3XL to 6XL and has spent years in shirts that ride up.
// Ladder to Life Force 3 (freedom from discomfort), not #6 (superiority).

window.PDP_DATA = {
  product: {
    name: 'The Signature Monogram Polo',
    line: '300 made. Sizes 3XL to 6XL',
    price: 1899,
    rating: 5,
    reviews: 7,
    sizes: ['3XL', '4XL', '5XL', '6XL'],
    colors: [
      // Colour names must match the Shopify product titles exactly. The store is
      // where he checks out, and it says "Cream & Blue", not "Blue & Cream".
      { key: 'blue',  name: 'Cream & Blue', dot: 'var(--cobalt-600)',
        hero: 'feiri-pdp/assets/hero-standing-blue.jpg',
        url: 'https://feiri.co.za/products/feiri-signature-monogram-tee-khaki-blue',
        variants: { '3XL': 45253144740019, '4XL': 45253144772787, '5XL': 45253144805555, '6XL': 45253144838323 },
        gallery: ['feiri-pdp/assets/front-blue.jpg','feiri-pdp/assets/detail-blue.jpg','feiri-pdp/assets/seated-blue.jpg','feiri-pdp/assets/side-blue.jpg','feiri-pdp/assets/flat-blue.jpg'] },
      { key: 'black', name: 'Black & Sand', dot: '#1A1814',
        hero: 'feiri-pdp/assets/hero-black.jpg',
        url: 'https://feiri.co.za/products/feiri-signature-monogram-tee-black-sand',
        variants: { '3XL': 45211456045235, '4XL': 45211456078003, '5XL': 45211456110771, '6XL': 45211456143539 },
        gallery: ['feiri-pdp/assets/profile-black.jpg','feiri-pdp/assets/flat-black.jpg','feiri-pdp/assets/hero-black.jpg','feiri-pdp/assets/duo.jpg'] },
    ],
    // Variant ids read live from `feiri.co.za/products/<handle>.js` on 2026-08-24,
    // both colourways, all four sizes, all available. They are what carries the
    // chosen size across the handoff. **Re-read them if either product is ever
    // deleted and recreated in Shopify** — a stale id sends the buyer to an empty
    // cart, which is the failure this map exists to prevent.
    //
    // stockInSize removed 2026-08-12. It was hardcoded to 27 and shown for every
    // size and both colours, which is fabricated scarcity. Any counter must read
    // live inventory. 6XL is the only genuinely scarce size (15 per colourway).
  },

  // 1b — The hero strip. Supplied by Gilbert 2026-09-05 and REPLACING the photographs
  // that were in the hero, on his instruction. This is the scrolling section of the
  // header, which is where Clarity recorded 18 taps on a picture that did nothing.
  //
  // Every caption names what ITS photograph proves. That is the whole job of a caption
  // in a gallery: the reader can already see what the thing looks like, so the words
  // have to add the claim the picture is evidence for. The labels these replace on the
  // original composite read "Sand and black", "Structured collar" and "100% Cotton
  // fabric", all of which named what the thing IS.
  //
  // 🚩 "100% Cotton" is deliberately absent. The store makes no composition claim on
  // any surface, so it cannot be verified. Copy Law gate 7.
  //
  // 🚩 Slide 6 is a rendered card, not a picture of one. A five column measurement
  // table baked into a JPEG and scaled into a 390px slot is unreadable, and it is the
  // single thing the fit-anxious buyer needs most. Slide 7 IS a supplied image, on
  // Gilbert's call, and its aspect (0.80) matches the mobile slot exactly.
  //
  // 🚩 Provenance: six of these files came from ChatGPT and are AI-processed. See the
  // note in 01-context/qc-facts.md before any of them is treated as a photograph of
  // the actual garment.
  heroStrip: [
    { type: 'image', src: 'feiri-pdp/assets/hero/01-standing.jpg',
      alt: 'A man wearing the Black and Sand polo, standing, photographed against a cream backdrop.',
      caption: 'Cut for a broader frame, not sized up from a medium.' },
    { type: 'image', src: 'feiri-pdp/assets/hero/02-shoulder.jpg',
      alt: 'The polo seen side on, with close crops of the collar, the shoulder and the knitted fabric.',
      caption: 'The seam sits on your shoulder, not halfway down your arm.' },
    { type: 'image', src: 'feiri-pdp/assets/hero/03-collar.jpg',
      alt: 'The polo on a wooden hanger, the collar standing up on its own, the FEIRI Milano label and a 5XL size tab visible.',
      caption: 'The collar holds its shape with nothing inside it.' },
    { type: 'image', src: 'feiri-pdp/assets/hero/04-seated.jpg',
      alt: 'A man seated in a leather armchair wearing the Black and Sand polo, the hem still sitting flat.',
      caption: 'Seated, the hem stays where you put it.' },
    { type: 'image', src: 'feiri-pdp/assets/hero/05-colourways.jpg',
      alt: 'Both colourways folded side by side, Cream and Blue beside Black and Sand.',
      caption: 'Two colourways. Both cut from the same 3XL pattern.' },
    { type: 'size' },
    { type: 'image', src: 'feiri-pdp/assets/hero/07-review.jpg',
      alt: 'A five star review headed Out of this world, from a verified buyer in South Africa, with two photographs he sent in.',
      caption: null },
  ],

  // Measured flat, in centimetres, 1cm to 2cm tolerance. Source: the FEIRI size guide on
  // the Shopify PDP, verified 2026-08-10. Moved here from pdp-sections-b on 2026-09-05
  // because two places now render it, the buy block and the hero strip's size slide.
  // One copy, so they cannot drift apart. These five decide the purchase; the full guide
  // (armhole, bicep, cuff, neck) stays on the store.
  measure: [
    ['Chest, flat', 76, 80, 84, 88],
    ['Body length', 91, 93, 95, 97],
    ['Shoulder', 54, 57, 60, 63],
    ['Sleeve length', 26, 27, 28, 29],
    ['Hem, flat', 70, 74, 78, 82],
  ],

  // 4 — Features. Each block opens on the failure he has already lived through,
  // then gives a number he can check with a tape measure. `pos` reframes the 4:3
  // crop when the centre of the photo is not the part that proves the claim.
  features: [
    { img: 'feiri-pdp/assets/detail-blue.jpg', title: 'The collar does not go soft and curl',
      body: 'A cheap polo collar loses its shape after a few washes. The points start to curl, and the shirt starts looking old long before it is worn out. This collar is a knitted rib 9cm deep, built to sit flat on the fortieth wear the way it did on the first.' },
    { img: 'feiri-pdp/assets/seated-hem-blue.jpg', title: 'It stays down when you sit',
      body: 'Shirts cut for smaller men are too short in the body, so the hem climbs the moment you sit down or reach across a table. Then you spend the evening pulling it back into place. A 4XL FEIRI measures 93cm from the top of the shoulder straight down to the hem, laid flat. Go and measure the polo you wear most, the same way. If it is shorter than 93cm, that is why it rides up.' },
    { img: 'feiri-pdp/assets/monogram-knit-blue.jpg', title: 'The monogram is knitted in, not printed on top',
      body: 'Printed logos crack, then peel, usually within a few months of normal washing. Ours is jacquard knitted, which means the pattern is made out of the yarn itself while the fabric is being knitted. You can feel the texture of it with your hand. There is nothing sitting on the surface, so there is nothing that can lift off.' },
    // Swapped 2026-08-15 from profile-black.jpg. That was a full-body side
    // profile, so at 4:3 the shoulder was a small part of the frame and the
    // photograph was not proving the claim the block makes. This one is shot
    // close on the shoulder, the sleeve head and the armhole.
    { img: 'feiri-pdp/assets/shoulder-black.jpg', title: 'The shoulders are cut for a broader frame',
      body: 'When a pattern has been stretched, the shoulder seam ends up somewhere down your arm and the sleeve drags every time you move. A 4XL FEIRI is 57cm across the shoulders and 25cm through the armhole, so the seam sits where your shoulder actually is and the sleeve is not tight around your arm.' },
  ],

  // 5 — The standard array was deleted 2026-08-12. StandardSection now carries the
  // mechanism argument on its own, and the three items repeated the feature blocks.

  // 6 — Us vs Them. Every row must be something a tick can honestly sit next to.
  compare: [
    ['Pattern drawn at 3XL, not scaled up from a medium', true, false],
    ['Body length 93cm on a 4XL, so it stays down when you sit', true, false],
    ['Collar keeps its shape after washing', true, false],
    ['Monogram knitted into the fabric, so it cannot peel', true, false],
    ['300 made, then never again', true, false],
  ],

  // 7 — Testimonials. VERBATIM customer words. Do not edit these to satisfy the
  // no-em-dash rule; that rule governs copy we write, and gate 7 (facts right)
  // outranks it. Getting real names and cities is an open item.
  // "Out of this world" used to sit here as testimonials[0]. It was moved to
  // `featuredReview` below on 2026-09-04 and is now rendered once, in the Owners
  // grid, in full and with the buyer's own two photographs.
  //
  // 🚩 It was also CONDENSED here, despite the VERBATIM instruction above. Three
  // things had been cut, and one of them was the strongest line in all seven
  // reviews: "If there's any hesitation to click purchase...trust me just do it."
  // That is an objection handler in a buyer's own voice and the page was throwing
  // it away. The text in `featuredReview` is the Fera record word for word, pulled
  // from the store's own review API on 2026-09-04 (review frev_3jU9gCsy).
  //
  // The count stays at 7 and stays honest: 6 in this grid plus the featured one.
  // **Do not "fix" this back to 7 entries here** — that reintroduces the duplicate.
  testimonials: [
    { name: 'Kabelo S.', body: 'I’ve never felt this confident in clothes before.', size: 'Johannesburg', title: '' },
    { name: 'Thabo K.', body: 'Luxury clothing that actually fits my body properly.', size: 'Durban', title: '' },
    { name: 'Sipho M.', body: 'Finally a brand that understands bigger guys. The fit is perfect.', size: 'Cape Town', title: '' },
    { name: 'Anonymous', body: 'Now this is comfort for the big boys.', size: 'South Africa', title: 'The fabric on point' },
    { name: 'Jacob', body: 'Very nice and premium quality. Comfortable fit.', size: 'Verified buyer', title: 'Marvelous!' },
    // The seventh. Added 2026-08-24: the page claimed 7 reviews and rendered 6, and
    // 7 is the true combined Fera count (3 on Cream & Blue, 4 on Black & Sand, read
    // live 2026-08-24). Left exactly as he wrote it, typos and all. The Copy Law
    // governs our words, not a customer's, and an unpolished review reads truer than
    // a tidied one.
    { name: 'Big Jim', body: 'Im sooooo in love with my Shirt! Definately recommend.', size: 'Verified buyer', title: '' },
  ],

  // 7b — The featured review. VERBATIM, from Fera review `frev_3jU9gCsy`, read from
  // the store's own public review API on 2026-09-04. is_verified: true, rated 5,
  // submitted 2026-06-17, on the Black & Sand polo.
  //
  // It earns a card of its own for one reason: it is the only review on the brand
  // that answers the page's central question in a buyer's own words ("I've never had
  // a better fitment in all my life") AND comes with photographs of the man wearing
  // it. Everything else on this page arguing that the polo fits is the seller talking.
  //
  // The two photographs are his, downloaded from Fera and served from our own origin
  // rather than hotlinked: a third-party CDN on the critical path is exactly what
  // build.mjs exists to avoid, and this market pays for its own data.
  // Originals were 2316x3088 at 1.5MB and 2.1MB. Served at 900x1200, with a separate
  // 400px thumbnail so the card costs ~93KB and the full file loads only on a tap.
  //
  // Fera returns no customer name or location on this record, so "Anonymous" and
  // "South Africa" are Fera's own display values, matching the store. Do not invent
  // a name for him.
  featuredReview: {
    title: 'Out of this world',
    body: 'I’m not even exaggerating about my summary, the confidence this top brings out of You is crazy. I’ve never had a better fitment in all my life. The quality goes crazy you feel it instantly when you pick it up.\n\nIf there’s any hesitation to click purchase…trust me just do it. As a fellow Big Guy we deserve to be stylish too.\n\n@Feiri I can’t wait to see what you guys bring out next cause I need more.',
    name: 'Anonymous',
    location: 'South Africa',
    verified: true,
    photos: [
      { thumb: 'feiri-pdp/assets/reviews/owner-review-1-thumb.jpg', full: 'feiri-pdp/assets/reviews/owner-review-1.jpg' },
      { thumb: 'feiri-pdp/assets/reviews/owner-review-2-thumb.jpg', full: 'feiri-pdp/assets/reviews/owner-review-2.jpg' },
    ],
  },

  // 10 — trust row. Delivery figures are the store's own.
  trust: [
    { icon: 'truck', label: 'Free delivery anywhere in South Africa' },
    { icon: 'check-circle', label: 'Major cities 1 to 3 working days' },
    { icon: 'rotate-ccw', label: 'Free returns for 14 days' },
    { icon: 'scissors', label: 'Sizes 3XL to 6XL' },
  ],

  // 12 — FAQ. Returns wording commits to the COST, never to the mechanism.
  faq: [
    { q: 'Will it fit properly if I am a bigger build?', a: 'That is the whole reason it exists. The pattern is drawn at 3XL and worked upward to 6XL, instead of being scaled up from a medium. The shoulder seam sits where your shoulder actually is, the armhole is not tight, and the body is long enough to stay down when you sit. Every measurement for every size is in the table above.' },
    { q: 'How do I choose my size?', a: 'Most men take the size they normally wear, because this is not a slim cut. If you are between two sizes, take the smaller one for a closer fit or the bigger one for more room. The surest way is to lay a polo you already own and like flat on a bed, measure it from the top of the shoulder seam down to the hem, and compare it to the table above.',
      link: { icon: 'whatsapp', label: 'Or send us a WhatsApp and we will do it with you in two minutes', href: 'https://wa.me/message/RBOA6UZAMVSWC1' } },
    { q: 'Is the monogram printed on?', a: 'No. It is jacquard knitted, which means the pattern is made from the yarn while the fabric is being knitted. It is part of the cloth rather than a layer sitting on top of it, so there is nothing that can crack, peel or fade in the wash.' },
    { q: 'Why only 300?', a: 'This is the final release of this piece. We made 300 in total, across both colours and all four sizes. When a size sells out, we are not making it again in that colour or that pattern.' },
    { q: 'How long does delivery take, and what if I want to send it back?', a: 'Delivery is free anywhere in South Africa. Major cities take 1 to 3 working days and outlying areas 2 to 5, and you get a tracking number as soon as it ships. If it is not right, tell us within 14 days of delivery and we sort the return out with you, at no cost to you. Once it reaches us we refund you in full within 7 to 14 days.' },
    // The opening sentence moved here 2026-08-31 from the care footnote under the
    // Features grid, which was deleted. It is the only part of that paragraph the FAQ
    // did not already say, and it is the why behind the instruction that follows it.
    { q: 'How do I wash it?', a: 'Cotton knit goes baggy at the hem and the elbows when it is washed hot and tumble dried. Cold gentle wash, inside out. Do not tumble dry. Cool iron on the reverse if it needs it. The fabric is built to hold its shape, and washing it cool is what keeps it that way.' },
  ],
};
