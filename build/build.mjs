#!/usr/bin/env node
// FEIRI landing page — production build.
//
// Replaces the in-browser Babel pipeline. Previously every visitor downloaded
// react.development.js (110KB) + react-dom.development.js (1.08MB) +
// @babel/standalone (3.14MB) from unpkg.com, then compiled 7 raw .jsx files in
// their own browser before a single pixel rendered. That is ~4.3MB of
// render-blocking third-party JS on the critical path.
//
// This script does the JSX transform once, at build time, and vendors the
// production React builds locally.
//
//   node build.mjs                 production bundle (tweaks panel stubbed out)
//   node build.mjs --with-tweaks   include the authoring panel (dev builds)
//
// Output is committed to the repo. There is deliberately no package.json at the
// repo root, so Vercel keeps serving this as a plain static site with no build
// step — nothing here runs on deploy.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WITH_TWEAKS = process.argv.includes('--with-tweaks');

const REACT_VERSION = '18.3.1';
const VENDOR = [
  { file: 'react.production.min.js', url: `https://unpkg.com/react@${REACT_VERSION}/umd/react.production.min.js` },
  { file: 'react-dom.production.min.js', url: `https://unpkg.com/react-dom@${REACT_VERSION}/umd/react-dom.production.min.js` },
];

// Load order matters. Each file reads globals registered by the ones before it
// (pdp-lookbook destructures window.sc/sans/Eyebrow at its top level, pdp-app
// destructures window.useTweaks, etc.), so this must match the original
// index.html script order exactly.
const SOURCES = [
  WITH_TWEAKS
    ? { label: 'tweaks-panel', file: 'feiri-pdp/tweaks-panel.jsx' }
    : { label: 'tweaks-shim', file: 'build/prod-tweaks-shim.js' },
  { label: 'pdp-data', file: 'feiri-pdp/pdp-data.jsx' },
  { label: 'pdp-parts', file: 'feiri-pdp/pdp-parts.jsx' },
  { label: 'pdp-sections-a', file: 'feiri-pdp/pdp-sections-a.jsx' },
  { label: 'pdp-lookbook', file: 'feiri-pdp/pdp-lookbook.jsx' },
  { label: 'pdp-sections-b', file: 'feiri-pdp/pdp-sections-b.jsx' },
  { label: 'pdp-app', file: 'feiri-pdp/pdp-app.jsx' },
];

// Each source is wrapped in its own IIFE. Babel Standalone evaluated every
// <script type="text/babel"> in an isolated scope, and the sources rely on
// that: pdp-parts, pdp-lookbook and pdp-app each open with their own
// `const { sc, sans, ... } = window;`, so a flat concatenation dies with
// "Identifier 'sc' has already been declared" before React ever mounts.
//
// Isolation is safe because every cross-file dependency already travels
// through window (window.Section, window.HeroSection, window.PDP_DATA, ...).
// Verified: no file references another file's bare top-level identifiers.
const wrap = (code, tail = '') => `(function(){\n${code}\n${tail}})();`;

// tweaks-panel.jsx (and its shim) declare these as bare top-level `function`s
// and relied on classic-script semantics to expose them on window. Inside an
// IIFE that no longer happens implicitly, and pdp-app.jsx destructures them off
// window while the mount gate polls for them — so bind them explicitly. This
// runs inside the same IIFE, where the declarations are in scope.
const TWEAK_GLOBALS = [
  'useTweaks', 'TweaksPanel', 'TweakSection', 'TweakRow', 'TweakRadio',
  'TweakToggle', 'TweakColor', 'TweakSlider', 'TweakSelect', 'TweakText',
  'TweakNumber', 'TweakButton',
];

const bindGlobals = (names) =>
  '\n/* explicit global binding — see build.mjs */\n' +
  names.map((n) => `if (typeof ${n} !== 'undefined') window.${n} = ${n};`).join('\n') +
  '\n';

async function transform(src) {
  const abs = path.join(ROOT, src.file);
  const code = await readFile(abs, 'utf8');
  const result = await esbuild.transform(code, {
    loader: 'jsx',
    jsx: 'transform',              // classic runtime — React is a UMD global
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    // Whitespace and syntax only. minifyIdentifiers MUST stay false: these
    // files share one global script scope and register components onto window
    // by name. Renaming top-level identifiers would break the mount gate.
    minifyWhitespace: true,
    minifySyntax: true,
    minifyIdentifiers: false,
    target: 'es2018',
    sourcefile: src.file,
  });
  for (const w of result.warnings) console.warn(`  ! ${src.label}: ${w.text}`);
  return result.code;
}

async function vendorReact() {
  const dir = path.join(ROOT, 'vendor');
  await mkdir(dir, { recursive: true });
  for (const v of VENDOR) {
    const res = await fetch(v.url);
    if (!res.ok) throw new Error(`Failed to fetch ${v.url}: ${res.status}`);
    const body = Buffer.from(await res.arrayBuffer());
    await writeFile(path.join(dir, v.file), body);
    console.log(`  vendored ${v.file.padEnd(30)} ${(body.length / 1024).toFixed(1)} KB`);
  }
}

function renderIndexHtml({ appHref, reactHref, reactDomHref }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>The FEIRI Signature Monogram Polo. Made only in sizes 3XL to 6XL</title>
  <meta name="description" content="A cotton polo made only in sizes 3XL to 6XL. R1,899, free delivery anywhere in South Africa, and free returns for 14 days if it does not fit." />

  <!-- Link preview. WhatsApp is a primary sharing channel in this market. -->
  <meta property="og:type" content="product" />
  <meta property="og:title" content="The FEIRI Signature Monogram Polo. Made only in sizes 3XL to 6XL" />
  <meta property="og:description" content="A cotton polo made only in sizes 3XL to 6XL. R1,899, free delivery anywhere in South Africa, and free returns for 14 days if it does not fit." />
  <meta property="og:image" content="https://drop.feiri.co.za/feiri-pdp/assets/hero-standing-blue.jpg" />
  <meta property="og:url" content="https://drop.feiri.co.za/" />
  <meta name="twitter:card" content="summary_large_image" />

  <!-- Meta Pixel -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '2568538996934107');
    fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=2568538996934107&ev=PageView&noscript=1"
  /></noscript>

  <!-- Design system tokens + styles -->
  <link rel="stylesheet" href="_ds/feiri-milano-design-system-bb8c6b6f-e41a-4fd0-946a-846f0e814636/tokens/fonts.css" />
  <link rel="stylesheet" href="_ds/feiri-milano-design-system-bb8c6b6f-e41a-4fd0-946a-846f0e814636/tokens/colors.css" />
  <link rel="stylesheet" href="_ds/feiri-milano-design-system-bb8c6b6f-e41a-4fd0-946a-846f0e814636/tokens/typography.css" />
  <link rel="stylesheet" href="_ds/feiri-milano-design-system-bb8c6b6f-e41a-4fd0-946a-846f0e814636/tokens/spacing.css" />
  <link rel="stylesheet" href="_ds/feiri-milano-design-system-bb8c6b6f-e41a-4fd0-946a-846f0e814636/tokens/effects.css" />
  <link rel="stylesheet" href="_ds/feiri-milano-design-system-bb8c6b6f-e41a-4fd0-946a-846f0e814636/tokens/base.css" />
  <link rel="stylesheet" href="_ds/feiri-milano-design-system-bb8c6b6f-e41a-4fd0-946a-846f0e814636/styles.css" />

  <!-- Hero image is the Largest Contentful Paint element on desktop -->
  <link rel="preload" as="image" href="feiri-pdp/assets/hero-standing-blue.jpg" fetchpriority="high" />

  <style>
__INLINE_STYLE__
  </style>

  <!-- React 18 production (self-hosted; no third-party CDN on the critical path) -->
  <script src="${reactHref}"></script>
  <script src="${reactDomHref}"></script>

  <!-- Microsoft Clarity -->
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "w2rkkajdb0");
  </script>
</head>
<body>
  <div id="root"></div>

  <!-- Prebuilt bundle: JSX compiled at build time, not in the visitor's browser -->
  <script src="${appHref}"></script>
</body>
</html>
`;
}

async function main() {
  console.log(`\nFEIRI landing build ${WITH_TWEAKS ? '(dev — tweaks panel included)' : '(production)'}\n`);

  console.log('React:');
  await vendorReact();

  console.log('\nBundle:');
  const parts = [];
  for (const src of SOURCES) {
    const code = await transform(src);
    const isTweaks = src.label === 'tweaks-panel' || src.label === 'tweaks-shim';
    parts.push(
      `/* ── ${src.label} ─────────────────────────────── */\n` +
      wrap(code, isTweaks ? bindGlobals(TWEAK_GLOBALS) : '')
    );
    console.log(`  ${src.label.padEnd(20)} ${(code.length / 1024).toFixed(1)} KB`);
  }

  const bundle = parts.join('\n\n');
  const hash = createHash('sha256').update(bundle).digest('hex').slice(0, 8);
  const appFile = `app.${hash}.js`;
  await writeFile(path.join(ROOT, 'feiri-pdp', appFile), bundle);

  // Preserve the original page's inline <style> block verbatim — it carries the
  // responsive rules and the lookbook grid, and is not worth re-authoring here.
  const previous = await readFile(path.join(ROOT, 'index.html'), 'utf8');
  const styleMatch = previous.match(/<style>([\s\S]*?)<\/style>/);
  if (!styleMatch) throw new Error('Could not find the inline <style> block in index.html');

  const html = renderIndexHtml({
    appHref: `feiri-pdp/${appFile}`,
    reactHref: 'vendor/react.production.min.js',
    reactDomHref: 'vendor/react-dom.production.min.js',
  }).replace('__INLINE_STYLE__', styleMatch[1].trim());

  await writeFile(path.join(ROOT, 'index.html'), html);

  console.log(`\n  bundle               ${(bundle.length / 1024).toFixed(1)} KB  →  feiri-pdp/${appFile}`);
  console.log(`  index.html rewritten\n`);
  console.log('Critical path before: 4,327 KB (react dev + react-dom dev + babel standalone, all from unpkg.com)');
  console.log(`Critical path now:    ${((bundle.length + 11_000 + 132_000) / 1024).toFixed(0)} KB (self-hosted, precompiled)\n`);
}

main().catch((err) => { console.error(err); process.exit(1); });
