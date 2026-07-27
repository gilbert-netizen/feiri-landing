// Production stand-in for feiri-pdp/tweaks-panel.jsx.
//
// The tweaks panel is an authoring tool: it renders a floating widget at
// z-index 2147483646 (over the CTA on small screens) and postMessages design
// edits to a parent authoring host that does not exist in production. Shipping
// it to customers costs ~24KB and puts a dev control panel on a sales page.
//
// App() still depends on useTweaks for its state (mood / accent / scarcity /
// heroLine), and the mount gate in pdp-app.jsx waits for both `useTweaks` and
// `TweaksPanel` on window before rendering. So production gets a shim that
// pins TWEAK_DEFAULTS and renders nothing.
//
// The real panel is unchanged in the repo — run `node build.mjs --with-tweaks`
// to build a bundle that includes it.

function useTweaks(defaults) {
  // Frozen at defaults: nothing in production can change them.
  const setTweak = React.useCallback(function () {}, []);
  return [defaults, setTweak];
}

function TweaksPanel() { return null; }
function TweakSection() { return null; }
function TweakRow() { return null; }
function TweakRadio() { return null; }
function TweakToggle() { return null; }
function TweakColor() { return null; }
function TweakSlider() { return null; }
function TweakSelect() { return null; }
function TweakText() { return null; }
function TweakNumber() { return null; }
function TweakButton() { return null; }
