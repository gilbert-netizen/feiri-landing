/* global React */
// FEIRI Milano — Inverted PDP. Data + copy + shared helpers.
// Avatar: the Status & Social Man (28–42). "No loud logos. Just authority."

window.PDP_DATA = {
  product: {
    name: 'The Signature Monogram Knit',
    line: 'FEIRI Founders Edition',
    price: 1899,
    rating: 5,
    reviews: 7,
    sizes: ['3XL', '4XL', '5XL', '6XL'],
    colors: [
      { key: 'blue',  name: 'Blue & Cream', dot: 'var(--cobalt-600)',
        hero: 'feiri-pdp/assets/hero-couch-blue.jpg',
        url: 'https://feiri.co.za/products/feiri-signature-monogram-tee-khaki-blue',
        gallery: ['feiri-pdp/assets/front-blue.jpg','feiri-pdp/assets/detail-blue.jpg','feiri-pdp/assets/seated-blue.jpg','feiri-pdp/assets/side-blue.jpg','feiri-pdp/assets/flat-blue.jpg'] },
      { key: 'black', name: 'Black & Sand', dot: '#1A1814',
        hero: 'feiri-pdp/assets/hero-black.jpg',
        url: 'https://feiri.co.za/products/feiri-signature-monogram-tee-black-sand',
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
      body: 'The FEIRI monogram is jacquard-knitted into the cloth itself — depth you can feel. It does not crack, fade, or peel after the wash.' },
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
    ['Understands SA men', true, false],
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
    { q: 'Is the monogram printed?', a: 'No. The FEIRI monogram is jacquard-knitted into the fabric, so it has real depth and will not crack, peel, or fade in the wash.' },
    { q: 'What does “Founders Edition” mean?', a: 'This run is limited to 300 pieces across all sizes. When a size sells out in this colourway, it is gone. We restock rarely and never in the same form.' },
    { q: 'Shipping and returns?', a: 'Free shipping nationwide. If the piece does not carry the way we promised, return it within 14 days for a full refund — our Presence Guarantee.' },
  ],
};
