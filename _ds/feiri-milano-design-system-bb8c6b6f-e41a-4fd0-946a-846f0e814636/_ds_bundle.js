/* @ds-bundle: {"format":3,"namespace":"FEIRIMilanoDesignSystem_bb8c6b","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"ColorSwatch","sourcePath":"components/core/ColorSwatch.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"PriceTag","sourcePath":"components/core/PriceTag.jsx"},{"name":"Rating","sourcePath":"components/core/Rating.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"7f5132364bb1","components/core/Button.jsx":"09696285f142","components/core/Card.jsx":"41a9648c95fe","components/core/ColorSwatch.jsx":"750c188ddebb","components/core/Divider.jsx":"d7682b2f43e7","components/core/Eyebrow.jsx":"44483dfcf42f","components/core/IconButton.jsx":"61c01a20124e","components/core/Input.jsx":"05d1ee690c9a","components/core/PriceTag.jsx":"9a9f6a3a213d","components/core/Rating.jsx":"06010cee53fc","components/core/Select.jsx":"9f4ada27b8c6","components/core/Tag.jsx":"c25f0f633310","ui_kits/storefront/app.jsx":"da563b1a68cf","ui_kits/storefront/data.js":"d6c72f36228f","ui_kits/storefront/parts.jsx":"c8eb35c6e360","ui_kits/storefront/screens.jsx":"0aee5a0915b7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FEIRIMilanoDesignSystem_bb8c6b = window.FEIRIMilanoDesignSystem_bb8c6b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  neutral: {
    background: 'var(--stone-100)',
    color: 'var(--stone-700)',
    border: '1px solid var(--border-soft)'
  },
  navy: {
    background: 'var(--navy-800)',
    color: 'var(--cream-200)',
    border: 'none'
  },
  cobalt: {
    background: 'var(--cobalt-600)',
    color: '#fff',
    border: 'none'
  },
  limited: {
    background: 'var(--crimson-800)',
    color: '#fff',
    border: 'none'
  },
  soft: {
    background: 'var(--cream-300)',
    color: 'var(--ink-900)',
    border: 'none'
  }
};

/**
 * Small status / category label. For "FOUNDERS EDITION", "ONLY 300 MADE",
 * "NEW", etc. Set `tricolore` for the FEIRI MILANO heritage stripe badge.
 */
function Badge({
  variant = 'neutral',
  tricolore = false,
  children,
  style = {},
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.neutral;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5em',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-2xs)',
    fontWeight: 600,
    letterSpacing: 'var(--tracking-wider)',
    textTransform: 'uppercase',
    padding: '5px 10px',
    borderRadius: 'var(--radius-xs)',
    lineHeight: 1,
    ...v,
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: base
  }, rest), tricolore && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 18,
      height: 4,
      borderRadius: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      flex: 1,
      background: 'var(--tricolore-red)'
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      flex: 1,
      background: 'var(--tricolore-white)'
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      flex: 1,
      background: 'var(--tricolore-green)'
    }
  })), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    padding: '8px 16px',
    fontSize: '12px',
    letterSpacing: '0.12em',
    minHeight: 36
  },
  md: {
    padding: '12px 24px',
    fontSize: '13px',
    letterSpacing: '0.14em',
    minHeight: 46
  },
  lg: {
    padding: '16px 36px',
    fontSize: '14px',
    letterSpacing: '0.16em',
    minHeight: 56
  }
};
const VARIANTS = {
  primary: {
    background: 'var(--navy-800)',
    color: 'var(--cream-200)',
    border: '1px solid var(--navy-800)'
  },
  accent: {
    background: 'var(--cobalt-600)',
    color: '#fff',
    border: '1px solid var(--cobalt-600)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--navy-800)',
    border: '1px solid var(--navy-800)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--ink-900)',
    border: '1px solid transparent'
  },
  light: {
    background: '#fff',
    color: 'var(--ink-900)',
    border: '1px solid #fff'
  }
};
const HOVER = {
  primary: {
    background: 'var(--navy-700)',
    borderColor: 'var(--navy-700)'
  },
  accent: {
    background: 'var(--cobalt-700)',
    borderColor: 'var(--cobalt-700)'
  },
  outline: {
    background: 'var(--navy-800)',
    color: 'var(--cream-200)'
  },
  ghost: {
    background: 'var(--stone-100)'
  },
  light: {
    background: 'var(--cream-100)',
    borderColor: 'var(--cream-100)'
  }
};

/**
 * FEIRI primary action. Quiet-luxury button: near-square, letter-spaced label,
 * calm hover that darkens one step.
 */
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  uppercase = true,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  children,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const Tag = as;
  const sz = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6em',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    textTransform: uppercase ? 'uppercase' : 'none',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: fullWidth ? '100%' : 'auto',
    transition: 'background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
    textDecoration: 'none',
    boxSizing: 'border-box',
    opacity: disabled ? 0.45 : 1,
    transform: active && !disabled ? 'translateY(1px)' : 'none',
    padding: sz.padding,
    fontSize: sz.fontSize,
    letterSpacing: sz.letterSpacing,
    minHeight: sz.minHeight,
    ...v,
    ...(hover && !disabled ? HOVER[variant] : {}),
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: base,
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SURFACES = {
  card: {
    background: 'var(--surface-card)',
    color: 'var(--text-body)'
  },
  raised: {
    background: 'var(--cream-50)',
    color: 'var(--text-body)'
  },
  navy: {
    background: 'var(--navy-800)',
    color: 'var(--cream-200)'
  },
  cobalt: {
    background: 'var(--cobalt-600)',
    color: '#fff'
  }
};

/**
 * Surface container. `elevation` adds a soft shadow; `bordered` a hairline.
 * `interactive` lifts on hover (use for product cards).
 */
function Card({
  surface = 'card',
  elevation = 'sm',
  bordered = true,
  interactive = false,
  padding = 'var(--space-5)',
  children,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const s = SURFACES[surface] || SURFACES.card;
  const shadowMap = {
    none: 'none',
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)'
  };
  const isDark = surface === 'cobalt' || surface === 'navy';
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: 'var(--radius-lg)',
      border: bordered && !isDark ? '1px solid var(--border-soft)' : 'none',
      boxShadow: interactive && hover ? 'var(--shadow-md)' : shadowMap[elevation],
      transform: interactive && hover ? 'translateY(-3px)' : 'none',
      transition: 'box-shadow var(--duration-normal) var(--ease-standard), transform var(--duration-normal) var(--ease-standard)',
      padding,
      overflow: 'hidden',
      boxSizing: 'border-box',
      ...s,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/ColorSwatch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Round colour swatch for product variants. Selectable; pass a CSS `color`. */
function ColorSwatch({
  color,
  label,
  selected = false,
  size = 26,
  onClick,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    onClick: onClick,
    style: {
      width: size + 8,
      height: size + 8,
      padding: 3,
      borderRadius: 'var(--radius-pill)',
      background: 'transparent',
      cursor: 'pointer',
      border: `1px solid ${selected ? 'var(--ink-900)' : 'transparent'}`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'border-color var(--duration-fast) var(--ease-standard)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-pill)',
      background: color,
      boxShadow: 'inset 0 0 0 1px rgba(26,20,16,0.12)',
      display: 'block'
    }
  }));
}
Object.assign(__ds_scope, { ColorSwatch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ColorSwatch.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hairline divider. `tricolore` renders the heritage stripe; `gold` a thin gold rule. */
function Divider({
  tricolore = false,
  gold = false,
  width,
  style = {},
  ...rest
}) {
  if (tricolore) {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: 'inline-flex',
        height: 4,
        width: width || 96,
        borderRadius: 1,
        overflow: 'hidden',
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("i", {
      style: {
        flex: 1,
        background: 'var(--tricolore-red)'
      }
    }), /*#__PURE__*/React.createElement("i", {
      style: {
        flex: 1,
        background: 'var(--tricolore-white)',
        boxShadow: 'inset 0 0 0 1px var(--border-soft)'
      }
    }), /*#__PURE__*/React.createElement("i", {
      style: {
        flex: 1,
        background: 'var(--tricolore-green)'
      }
    }));
  }
  return /*#__PURE__*/React.createElement("hr", _extends({
    style: {
      border: 0,
      height: 1,
      width: width || '100%',
      background: gold ? 'var(--gold-500)' : 'var(--border-soft)',
      margin: 0,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Uppercase letter-spaced micro-label. The brand's signature eyebrow. */
function Eyebrow({
  as = 'p',
  color = 'var(--text-muted)',
  withRule = false,
  children,
  style = {},
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.8em',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-widest)',
      textTransform: 'uppercase',
      color,
      margin: 0,
      ...style
    }
  }, rest), withRule && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 1,
      background: 'var(--cobalt-600)'
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 36,
  md: 44,
  lg: 52
};
const VARIANTS = {
  solid: {
    background: 'var(--navy-800)',
    color: 'var(--cream-200)',
    border: '1px solid var(--navy-800)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--ink-900)',
    border: '1px solid var(--border-strong)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--ink-900)',
    border: '1px solid transparent'
  }
};
const HOVER = {
  solid: {
    background: 'var(--navy-700)'
  },
  outline: {
    background: 'var(--stone-100)',
    borderColor: 'var(--stone-400)'
  },
  ghost: {
    background: 'var(--stone-100)'
  }
};

/** Square icon-only button. Pass a Lucide (or any) icon as children. */
function IconButton({
  variant = 'ghost',
  size = 'md',
  disabled = false,
  label,
  children,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const d = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: d,
      height: d,
      borderRadius: 'var(--radius-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
      ...v,
      ...(hover && !disabled ? HOVER[variant] : {}),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input with floating label feel — hairline border, gold focus, cream-tinted field. */
function Input({
  label,
  hint,
  error,
  id,
  type = 'text',
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `feiri-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--cobalt-600)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--ink-900)',
      background: 'var(--cream-50)',
      padding: '12px 14px',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-sm)',
      outline: 'none',
      transition: 'border-color var(--duration-fast) var(--ease-standard)',
      boxShadow: focus ? '0 0 0 3px rgba(201,162,75,0.18)' : 'none',
      ...style
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/PriceTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 'var(--text-md)',
  md: 'var(--text-lg)',
  lg: 'var(--text-xl)'
};

/** Product price. Optional `compareAt` shows a struck original; `currency` prefixes. */
function PriceTag({
  price,
  compareAt,
  currency = 'R ',
  size = 'md',
  style = {},
  ...rest
}) {
  const onSale = compareAt != null && compareAt > price;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: '0.55em',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: SIZES[size] || SIZES.md,
      fontWeight: 500,
      letterSpacing: '0.01em',
      color: onSale ? 'var(--crimson-800)' : 'var(--ink-900)'
    }
  }, currency, Number(price).toLocaleString('en-ZA', {
    minimumFractionDigits: 2
  })), onSale && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      textDecoration: 'line-through'
    }
  }, currency, Number(compareAt).toLocaleString('en-ZA', {
    minimumFractionDigits: 2
  })));
}
Object.assign(__ds_scope, { PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/core/Rating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STAR = 'M12 2.2l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.77 6.12 20.86l1.12-6.55L2.48 9.12l6.58-.96L12 2.2z';
function Star({
  fill,
  size
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: STAR,
    fill: fill
  }));
}

/** Star rating display. Supports half via fractional `value`. */
function Rating({
  value = 0,
  count,
  size = 16,
  showValue = false,
  style = {},
  ...rest
}) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fillPct = Math.max(0, Math.min(1, value - (i - 1)));
    const id = `feiri-star-${i}-${Math.round(fillPct * 100)}`;
    stars.push(/*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        position: 'relative',
        display: 'inline-block',
        width: size,
        height: size
      }
    }, /*#__PURE__*/React.createElement(Star, {
      fill: "var(--stone-300)",
      size: size
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        inset: 0,
        width: `${fillPct * 100}%`,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(Star, {
      fill: "var(--navy-700)",
      size: size
    }))));
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 2
    }
  }, stars), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--ink-900)',
      fontWeight: 500
    }
  }, value.toFixed(1)), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, "(", count, ")"));
}
Object.assign(__ds_scope, { Rating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Rating.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select styled to match Input. */
function Select({
  label,
  hint,
  id,
  children,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const selId = id || (label ? `feiri-sel-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--ink-900)',
      background: 'var(--cream-50)',
      padding: '12px 38px 12px 14px',
      border: `1px solid ${focus ? 'var(--cobalt-600)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-sm)',
      outline: 'none',
      cursor: 'pointer',
      transition: 'border-color var(--duration-fast) var(--ease-standard)',
      boxShadow: focus ? '0 0 0 3px rgba(201,162,75,0.18)' : 'none',
      ...style
    }
  }, rest), children), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--stone-500)',
      fontSize: 12
    }
  }, "\u25BE")), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Selectable chip — size selector, filter, swatch label. Near-square.
 * Controlled via `selected` + `onClick`.
 */
function Tag({
  selected = false,
  disabled = false,
  children,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    height: 40,
    padding: '0 14px',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
    letterSpacing: '0.04em',
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all var(--duration-fast) var(--ease-standard)',
    background: selected ? 'var(--ink-900)' : 'transparent',
    color: selected ? 'var(--cream-200)' : disabled ? 'var(--stone-400)' : 'var(--ink-900)',
    border: `1px solid ${selected ? 'var(--ink-900)' : 'var(--border-strong)'}`,
    textDecoration: disabled ? 'line-through' : 'none',
    opacity: disabled ? 0.6 : 1,
    ...(hover && !selected && !disabled ? {
      borderColor: 'var(--ink-900)'
    } : {}),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: base
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/app.jsx
try { (() => {
/* global React, ReactDOM */
const {
  Header,
  Footer,
  HomeScreen,
  ListingScreen,
  ProductScreen,
  CartScreen,
  ContactScreen,
  WhatsAppButton
} = window;
function App() {
  const [screen, setScreen] = React.useState('home');
  const [ctx, setCtx] = React.useState(null);
  const [product, setProduct] = React.useState(null);
  const [cart, setCart] = React.useState([]);
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons({
      attrs: {
        'stroke-width': 1.5
      }
    });
  });
  const onNav = (s, c = null) => {
    setScreen(s);
    setCtx(c);
    window.scrollTo({
      top: 0
    });
  };
  const onOpen = p => {
    setProduct(p);
    setScreen('product');
    window.scrollTo({
      top: 0
    });
  };
  const onAdd = (p, size) => {
    setCart(prev => {
      const found = prev.find(i => i.id === p.id && i.size === size);
      if (found) return prev.map(i => i === found ? {
        ...i,
        qty: i.qty + 1
      } : i);
      return [...prev, {
        ...p,
        size,
        qty: 1
      }];
    });
    setScreen('cart');
    window.scrollTo({
      top: 0
    });
  };
  const onQty = (it, d) => setCart(prev => prev.map(i => i === it ? {
    ...i,
    qty: Math.max(1, i.qty + d)
  } : i));
  const onRemove = it => setCart(prev => prev.filter(i => i !== it));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(Header, {
    onNav: onNav,
    cartCount: cartCount
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1
    }
  }, screen === 'home' && /*#__PURE__*/React.createElement(HomeScreen, {
    onNav: onNav,
    onOpen: onOpen
  }), screen === 'listing' && /*#__PURE__*/React.createElement(ListingScreen, {
    ctx: ctx,
    onOpen: onOpen
  }), screen === 'product' && /*#__PURE__*/React.createElement(ProductScreen, {
    product: product,
    onAdd: onAdd,
    onNav: onNav
  }), screen === 'cart' && /*#__PURE__*/React.createElement(CartScreen, {
    items: cart,
    onQty: onQty,
    onRemove: onRemove,
    onNav: onNav
  }), screen === 'contact' && /*#__PURE__*/React.createElement(ContactScreen, {
    onNav: onNav
  })), /*#__PURE__*/React.createElement(Footer, {
    onNav: onNav
  }), /*#__PURE__*/React.createElement(WhatsAppButton, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/data.js
try { (() => {
// FEIRI Milano — storefront sample data.
// Mirrors the live feiri.co.za catalogue: limited Founders-Edition monogram
// knit polos, built for plus-size men (3XL–6XL). Product imagery is cropped
// from the real storefront (see assets/product-*.jpg).
window.FEIRI_DATA = {
  products: [{
    id: 'feiri-signature-monogram-tee-khaki-blue',
    name: 'FEIRI Signature Monogram Tee – Khaki & Blue',
    category: 'Polos',
    price: 2799,
    compareAt: null,
    image: '../../assets/shot-blue.jpg',
    gallery: ['../../assets/shot-blue.jpg', '../../assets/collar-detail.jpg', '../../assets/duo-torso.jpg', '../../assets/hero-studio.jpg'],
    colorName: 'Khaki & Blue',
    badges: ['Founders Edition', 'Only 300 made'],
    rating: 5,
    reviews: 3,
    desc: 'A structured monogram knit polo built from the ground up for bigger men. The collar holds its shape, the length stays where it should, and the chest and midsection sit balanced — never tight, never sloppy.',
    details: ['100% cotton knit', 'Structured collar that doesn’t collapse', 'Length engineered for 3XL–6XL proportions', 'Premium fabric that holds its shape after every wash', 'Crafted in South Africa'],
    colors: [['Khaki & Blue', 'var(--cobalt-600)', '../../assets/shot-blue.jpg'], ['Black & Sand', 'var(--ink-900)', '../../assets/shot-black.jpg']],
    sizes: ['3XL', '4XL', '5XL', '6XL']
  }, {
    id: 'feiri-signature-monogram-tee-black-sand',
    name: 'FEIRI Signature Monogram Tee – Black & Sand',
    category: 'Polos',
    price: 2799,
    compareAt: null,
    image: '../../assets/shot-black.jpg',
    gallery: ['../../assets/shot-black.jpg', '../../assets/duo-torso.jpg', '../../assets/collar-detail.jpg', '../../assets/hero-studio.jpg'],
    colorName: 'Black & Sand',
    badges: ['Founders Edition', 'Only 300 made'],
    rating: 5,
    reviews: 3,
    desc: 'The signature FF monogram rendered in black and sand. A premium cotton knit with a structured collar and an intentional fit, designed for men who want luxury, confidence, and the perfect fit.',
    details: ['100% cotton knit', 'Structured collar that doesn’t collapse', 'Shoulders built for strength', 'Premium fabric that holds its shape after every wash', 'Crafted in South Africa'],
    colors: [['Black & Sand', 'var(--ink-900)', '../../assets/shot-black.jpg'], ['Khaki & Blue', 'var(--cobalt-600)', '../../assets/shot-blue.jpg']],
    sizes: ['3XL', '4XL', '5XL', '6XL']
  }],
  // The site's value-proposition tiles (the navy icon row near the footer)
  promises: [{
    icon: 'shirt',
    title: 'Designed for Plus Sizes',
    body: 'Created from the ground up for plus-size proportions.'
  }, {
    icon: 'truck',
    title: 'Free shipping for all orders',
    body: 'Nationwide delivery on qualifying orders.'
  }, {
    icon: 'scissors',
    title: 'Premium Fabrics',
    body: 'Selected for structure, drape, and lasting quality.'
  }, {
    icon: 'heart-handshake',
    title: 'Proudly South African',
    body: 'Designed and crafted locally with intention.'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/data.js", error: String((e && e.message) || e) }); }

// ui_kits/storefront/parts.jsx
try { (() => {
/* global React */
const DS = window.FEIRIMilanoDesignSystem_bb8c6b;
const {
  Button,
  IconButton,
  Badge,
  Eyebrow,
  PriceTag,
  Rating,
  Card
} = DS;

// Lucide icon helper
function L({
  name,
  size = 20,
  color,
  sw = 1.75,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          'stroke-width': sw
        }
      });
    }
  }, [name, size, sw]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      color: color || 'currentColor',
      ...style
    }
  });
}
window.L = L;

// Real product photography (cropped from the live storefront)
function ProductImage({
  product,
  src,
  ratio = '3 / 4',
  rounded = true
}) {
  const img = src || product.image;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: ratio,
      width: '100%',
      overflow: 'hidden',
      borderRadius: rounded ? 'var(--radius-md)' : 0,
      background: 'var(--cream-100)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: product ? product.name : '',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'top center',
      display: 'block'
    }
  }));
}
window.ProductImage = ProductImage;
function ProductCard({
  product,
  onOpen
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onClick: () => onOpen && onOpen(product),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transition: 'box-shadow var(--duration-normal) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement(ProductImage, {
    product: product,
    ratio: "4 / 5",
    rounded: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      left: 14,
      display: 'flex',
      gap: 8
    }
  }, product.badges.map((b, i) => /*#__PURE__*/React.createElement(Badge, {
    key: b,
    variant: i === 0 ? 'navy' : 'limited',
    style: {
      textTransform: i === 0 ? 'none' : 'uppercase',
      letterSpacing: i === 0 ? '0.04em' : 'var(--tracking-wider)',
      borderRadius: 'var(--radius-pill)',
      padding: '5px 12px'
    }
  }, b)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontVariant: 'small-caps',
      fontWeight: 600,
      fontSize: 'var(--text-lg)',
      color: 'var(--text-strong)',
      margin: '0 0 8px',
      lineHeight: 1.2,
      letterSpacing: '0.02em'
    }
  }, product.name.replace('FEIRI Signature Monogram Tee – ', 'Signature Tee — ')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Rating, {
    value: product.rating,
    count: product.reviews,
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(PriceTag, {
    price: product.price
  }))));
}
window.ProductCard = ProductCard;

// Brand monogram mark (cobalt FF in a ring) — used as marquee separator
function MonoMark({
  size = 30,
  color = 'var(--navy-800)'
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: '50%',
      border: `1.5px solid ${color}`,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: size * 0.42,
      fontWeight: 700,
      color,
      letterSpacing: '-0.04em',
      lineHeight: 1
    }
  }, "FF"));
}
window.MonoMark = MonoMark;
function Marquee() {
  const items = ['Made for plus-size bodies', 'Premium fabrics, intentional fit', 'Crafted in South Africa', 'Limited 3XL–6XL pieces'];
  const run = [...items, ...items];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--cream-100)',
      borderTop: '1px solid var(--border-soft)',
      borderBottom: '1px solid var(--border-soft)',
      overflow: 'hidden',
      padding: '16px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "feiri-marquee",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 34,
      whiteSpace: 'nowrap'
    }
  }, run.map((t, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontVariant: 'small-caps',
      fontSize: 26,
      letterSpacing: '0.04em',
      color: 'var(--navy-800)',
      fontWeight: 600
    }
  }, t), /*#__PURE__*/React.createElement(MonoMark, null)))));
}
window.Marquee = Marquee;
function Logo({
  height = 44,
  onCream = true
}) {
  // FEIRI wordmark · tricolore rule · MILANO — the brand lockup
  const dark = onCream ? 'var(--navy-800)' : 'var(--cream-100)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      lineHeight: 1,
      gap: height * 0.07
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: height * 0.6,
      letterSpacing: '0.14em',
      color: dark,
      paddingLeft: '0.14em'
    }
  }, "FEIRI"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      width: height * 1.7,
      height: 2.5,
      borderRadius: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      flex: 1,
      background: 'var(--tricolore-red)'
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      flex: 1,
      background: 'var(--tricolore-white)'
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      flex: 1,
      background: 'var(--tricolore-green)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 400,
      fontSize: height * 0.2,
      letterSpacing: '0.42em',
      color: dark,
      paddingLeft: '0.42em'
    }
  }, "MILANO"));
}
window.Logo = Logo;
function Header({
  onNav,
  cartCount
}) {
  const [shopOpen, setShopOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#fff',
      borderBottom: '1px solid var(--border-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--navy-800)',
      color: 'var(--cream-200)',
      textAlign: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      fontWeight: 600,
      padding: '9px 16px'
    }
  }, "Free shipping for all orders"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      gap: 24,
      padding: '0 var(--gutter-page)',
      height: 80
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 30,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav('home'),
    style: navLink
  }, "Home"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative'
    },
    onMouseEnter: () => setShopOpen(true),
    onMouseLeave: () => setShopOpen(false)
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav('listing'),
    style: {
      ...navLink,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, "Shop ", /*#__PURE__*/React.createElement(L, {
    name: "chevron-down",
    size: 15,
    sw: 2
  })), shopOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      background: '#fff',
      border: '1px solid var(--border-soft)',
      boxShadow: 'var(--shadow-md)',
      borderRadius: 'var(--radius-sm)',
      padding: '10px 0',
      minWidth: 190,
      marginTop: 8
    }
  }, ['All products', 'Founders Edition', 'Khaki & Blue', 'Black & Sand'].map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    onClick: () => onNav('listing'),
    style: {
      display: 'block',
      padding: '9px 18px',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-body)',
      cursor: 'pointer'
    }
  }, i)))), /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav('contact'),
    style: navLink
  }, "Contact")), /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav('home'),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    height: 44
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    variant: "ghost",
    label: "Search"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search"
  })), /*#__PURE__*/React.createElement(IconButton, {
    variant: "ghost",
    label: "Account"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "user"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav('cart'),
    "aria-label": "Cart",
    style: {
      position: 'relative',
      width: 44,
      height: 44,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
      color: 'var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shopping-bag"
  }), cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 5,
      right: 2,
      background: 'var(--cobalt-600)',
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      fontWeight: 700,
      minWidth: 17,
      height: 17,
      borderRadius: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 4px'
    }
  }, cartCount)))));
}
const navLink = {
  fontFamily: 'var(--font-sans)',
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--ink-900)',
  cursor: 'pointer',
  letterSpacing: '0.02em'
};
window.Header = Header;
function PayMark({
  children,
  bg = '#fff',
  color = 'var(--ink-900)'
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 24,
      padding: '0 8px',
      borderRadius: 4,
      background: bg,
      color,
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: '0.02em',
      border: '1px solid rgba(0,0,0,0.08)'
    }
  }, children);
}
function Footer({
  onNav
}) {
  const [email, setEmail] = React.useState('');
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--navy-800)',
      color: 'var(--cream-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--gutter-page) var(--space-6)',
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
      gap: 44
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontVariant: 'small-caps',
      fontSize: 32,
      color: 'var(--cream-100)',
      margin: '0 0 16px',
      letterSpacing: '0.02em'
    }
  }, "Join our community"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--navy-100)',
      maxWidth: 340,
      margin: '0 0 22px',
      lineHeight: 1.6
    }
  }, "Sign up for our newsletter to receive exclusive updates and inspiration."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      maxWidth: 340
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "Enter your email",
    style: {
      height: 50,
      borderRadius: 'var(--radius-sm)',
      border: 'none',
      padding: '0 16px',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--ink-900)',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "light",
    uppercase: false,
    style: {
      alignSelf: 'flex-start',
      fontWeight: 600
    }
  }, "Subscribe now"))), /*#__PURE__*/React.createElement(FooterCol, {
    title: "Quick links",
    items: [['Home', 'home'], ['Shop', 'listing'], ['Contact', 'contact']],
    onNav: onNav
  }), /*#__PURE__*/React.createElement(FooterCol, {
    title: "More Info",
    items: [['Privacy Policy'], ['Refund Policy'], ['Shipping Policy'], ['Terms of Service']],
    onNav: onNav
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: footHead
  }, "Our store"), /*#__PURE__*/React.createElement("a", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--navy-100)',
      cursor: 'pointer'
    }
  }, "info@feiri.co.za"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      border: '1px solid rgba(255,241,214,0.3)',
      color: 'var(--cream-200)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "20",
    rx: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.5",
    cy: "6.5",
    r: "1.1",
    fill: "currentColor",
    stroke: "none"
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,241,214,0.14)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: '20px var(--gutter-page)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--navy-100)'
    }
  }, "\xA9 FEIRI | Powered by ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--cream-200)'
    }
  }, "V8 Media")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(PayMark, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#d8412f'
    }
  }, "Pay")), /*#__PURE__*/React.createElement(PayMark, null, "SAMSUNG Pay"), /*#__PURE__*/React.createElement(PayMark, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#eb001b'
    }
  }, "master"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#f79e1b'
    }
  }, "card")), /*#__PURE__*/React.createElement(PayMark, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#1a1f71'
    }
  }, "VISA")), /*#__PURE__*/React.createElement(PayMark, null, "G Pay")))));
}
const footHead = {
  fontFamily: 'var(--font-serif)',
  fontVariant: 'small-caps',
  fontSize: 18,
  letterSpacing: '0.04em',
  color: 'var(--cream-100)',
  margin: '0 0 16px'
};
function FooterCol({
  title,
  items,
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: footHead
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, items.map(([label, dest]) => /*#__PURE__*/React.createElement("li", {
    key: label
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => dest && onNav(dest),
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--navy-100)',
      cursor: 'pointer'
    }
  }, label)))));
}
window.Footer = Footer;
function WhatsAppButton() {
  return /*#__PURE__*/React.createElement("button", {
    style: {
      position: 'fixed',
      right: 22,
      bottom: 22,
      zIndex: 200,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      background: '#25D366',
      color: '#fff',
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      padding: '12px 18px 12px 14px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.22)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "message-circle",
    style: {
      width: 22,
      height: 22
    }
  }), " Contact us");
}
window.WhatsAppButton = WhatsAppButton;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/screens.jsx
try { (() => {
/* global React */
const _DS = window.FEIRIMilanoDesignSystem_bb8c6b;
const {
  Button: FButton,
  IconButton: FIconButton,
  Badge: FBadge,
  Tag: FTag,
  Eyebrow: FEyebrow,
  Divider: FDivider,
  PriceTag: FPriceTag,
  Rating: FRating,
  ColorSwatch: FColorSwatch,
  Card: FCard
} = _DS;
const L = window.L;
const sectionPad = {
  padding: 'var(--section-y) var(--gutter-page)'
};
const wrap = {
  maxWidth: 'var(--container-xl)',
  margin: '0 auto'
};
const sc = (size, color = 'var(--text-strong)') => ({
  fontFamily: 'var(--font-serif)',
  fontVariant: 'small-caps',
  fontWeight: 600,
  letterSpacing: '0.02em',
  fontSize: size,
  color,
  lineHeight: 1.16,
  margin: 0
});

/* ---------------- HOME ---------------- */
function HomeScreen({
  onNav,
  onOpen
}) {
  const products = window.FEIRI_DATA.products;
  const promises = window.FEIRI_DATA.promises;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 680,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'var(--navy-900)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/hero-studio.jpg",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'right center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(8,28,40,0.94) 0%, rgba(8,28,40,0.78) 32%, rgba(8,28,40,0.2) 58%, rgba(8,28,40,0) 78%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      position: 'relative',
      padding: '64px var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 540
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--cream-100)',
      background: 'rgba(255,241,214,0.14)',
      borderRadius: 'var(--radius-pill)',
      padding: '7px 16px',
      marginBottom: 22
    }
  }, "FEIRI"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...sc('clamp(2.2rem, 4.4vw, 3.5rem)', 'var(--cream-100)'),
      lineHeight: 1.12,
      marginBottom: 20
    }
  }, "Made for men", /*#__PURE__*/React.createElement("br", null), "who carry presence"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...sc('clamp(1.25rem, 2.2vw, 1.7rem)', 'var(--cream-200)'),
      opacity: 0.95,
      marginBottom: 10
    }
  }, "Limited 3XL\u20136XL pieces"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      color: 'var(--cream-300)',
      marginBottom: 30
    }
  }, "Shirts that fit the way they should."), /*#__PURE__*/React.createElement(FButton, {
    variant: "accent",
    size: "lg",
    onClick: () => onNav('listing')
  }, "Shop Limited Pieces")))), /*#__PURE__*/React.createElement(window.Marquee, null), /*#__PURE__*/React.createElement("section", {
    style: sectionPad
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'grid',
      gridTemplateColumns: '1.15fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      minHeight: 440
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/collar-detail.jpg",
    alt: "Structured collar detail",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '54px 30px 26px',
      background: 'linear-gradient(to top, rgba(13,61,86,0.96), rgba(13,61,86,0))'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...sc(34, 'var(--cream-100)')
    }
  }, "Structured collar", /*#__PURE__*/React.createElement("br", null), "that ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cream-300)'
    }
  }, "doesn\u2019t collapse")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: 16
    }
  }, ['../../assets/duo-torso.jpg', '../../assets/shot-black.jpg', '../../assets/lounge.jpg', '../../assets/shot-blue.jpg'].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: 'var(--cream-100)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: s,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...sectionPad,
      paddingTop: 0,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...sc('var(--text-3xl)')
    }
  }, "Style built for bigger men"), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...sc('var(--text-3xl)', 'var(--navy-800)'),
      marginTop: 4
    }
  }, "Fit Matters"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      color: 'var(--text-body)',
      maxWidth: 620,
      margin: '18px auto 48px',
      lineHeight: 1.6
    }
  }, "Most fashion brands design for smaller bodies and simply \u201Csize up.\u201D At FEIRI, we design from the ground up for men who want luxury, confidence, and the perfect fit."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 40,
      maxWidth: 820,
      margin: '0 auto'
    }
  }, products.map(p => /*#__PURE__*/React.createElement(window.ProductCard, {
    key: p.id,
    product: p,
    onOpen: onOpen
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--cream-200)',
      padding: 'var(--section-y) var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...sc('clamp(2rem, 4vw, 3.2rem)')
    }
  }, "Premium fabrics that hold their shape after every wash"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/duo-torso.jpg",
    alt: "",
    style: {
      width: '100%',
      display: 'block'
    }
  })))), /*#__PURE__*/React.createElement("section", {
    style: sectionPad
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...sc('var(--text-2xl)')
    }
  }, "Built for Presence"), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...sc('var(--text-2xl)', 'var(--navy-800)'),
      marginTop: 2,
      marginBottom: 18
    }
  }, "Styled for Real Life"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      color: 'var(--text-body)',
      lineHeight: 1.65,
      maxWidth: 400
    }
  }, "See how FEIRI garments move beyond fit \u2014 combining structure, refinement, and confidence across every silhouette. Designed to be worn, lived in, and seen.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 14
    }
  }, ['../../assets/shot-blue.jpg', '../../assets/shot-black.jpg', '../../assets/collar-detail.jpg', '../../assets/lounge.jpg', '../../assets/duo-pair.jpg', '../../assets/duo-torso.jpg'].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      aspectRatio: '3 / 4',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: 'var(--cream-100)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: s,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#fff',
      padding: 'var(--space-8) var(--gutter-page)',
      borderTop: '1px solid var(--border-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 32
    }
  }, promises.map(pr => /*#__PURE__*/React.createElement("div", {
    key: pr.title,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--navy-800)',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(L, {
    name: pr.icon,
    size: 40,
    sw: 1.5
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      ...sc(20),
      marginBottom: 8
    }
  }, pr.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-body)',
      margin: 0,
      lineHeight: 1.55
    }
  }, pr.body))))));
}
window.HomeScreen = HomeScreen;

/* ---------------- LISTING ---------------- */
function ListingScreen({
  ctx,
  onOpen
}) {
  const all = window.FEIRI_DATA.products;
  const [size, setSize] = React.useState(null);
  const sizes = ['3XL', '4XL', '5XL', '6XL'];
  return /*#__PURE__*/React.createElement("div", {
    style: sectionPad
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement(FEyebrow, {
    withRule: true,
    style: {
      justifyContent: 'center'
    }
  }, "Founders Edition \xB7 Only 300 made"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...sc('var(--text-3xl)'),
      marginTop: 12
    }
  }, "The Collection")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '230px 1fr',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 140,
      display: 'flex',
      flexDirection: 'column',
      gap: 26
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: filterHead
  }, "Size"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, sizes.map(s => /*#__PURE__*/React.createElement(FTag, {
    key: s,
    selected: size === s,
    onClick: () => setSize(size === s ? null : s)
  }, s)))), /*#__PURE__*/React.createElement(FDivider, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: filterHead
  }, "Colourway"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, ['Khaki & Blue', 'Black & Sand'].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--text-body)'
    }
  }, c)))), /*#__PURE__*/React.createElement(FDivider, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: filterHead
  }, "Price"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--text-body)'
    }
  }, "R 2,799.00"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 40
    }
  }, all.map(p => /*#__PURE__*/React.createElement(window.ProductCard, {
    key: p.id,
    product: p,
    onOpen: onOpen
  }))))));
}
const filterHead = {
  fontFamily: 'var(--font-sans)',
  fontSize: 11,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  margin: '0 0 12px'
};
window.ListingScreen = ListingScreen;

/* ---------------- PRODUCT ---------------- */
function ProductScreen({
  product,
  onAdd,
  onNav
}) {
  const p = product || window.FEIRI_DATA.products[0];
  const [color, setColor] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const [size, setSize] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const gallery = p.gallery || [p.image];
  return /*#__PURE__*/React.createElement("div", {
    style: sectionPad
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav('listing'),
    style: {
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 24,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(L, {
    name: "arrow-left",
    size: 14
  }), " Shop"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: 56,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: 'var(--cream-100)',
      aspectRatio: '4 / 5'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: gallery[active],
    alt: p.name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'top center',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 10,
      marginTop: 12
    }
  }, gallery.map((g, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setActive(i),
    style: {
      padding: 0,
      border: i === active ? '2px solid var(--navy-800)' : '1px solid var(--border-soft)',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      cursor: 'pointer',
      aspectRatio: '1',
      background: 'var(--cream-100)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: g,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 140
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 14
    }
  }, p.badges.map((b, i) => /*#__PURE__*/React.createElement(FBadge, {
    key: b,
    variant: i === 0 ? 'navy' : 'limited',
    style: {
      borderRadius: 'var(--radius-pill)',
      padding: '5px 12px',
      textTransform: i === 0 ? 'none' : 'uppercase',
      letterSpacing: i === 0 ? '0.04em' : 'var(--tracking-wider)'
    }
  }, b))), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...sc('var(--text-2xl)'),
      margin: '0 0 14px'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(FPriceTag, {
    price: p.price,
    size: "lg"
  }), /*#__PURE__*/React.createElement(FRating, {
    value: p.rating,
    count: p.reviews,
    size: 15
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--text-body)',
      marginBottom: 26
    }
  }, p.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: detailHead
  }, "Colourway \u2014 ", p.colors[color][0]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, p.colors.map((c, i) => /*#__PURE__*/React.createElement(FColorSwatch, {
    key: c[0],
    color: c[1],
    label: c[0],
    selected: color === i,
    onClick: () => {
      setColor(i);
      setActive(0);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...detailHead,
      margin: 0
    }
  }, "Size"), /*#__PURE__*/React.createElement("a", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-link)',
      cursor: 'pointer',
      textDecoration: 'underline',
      textUnderlineOffset: 3
    }
  }, "Size guide")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, p.sizes.map(s => /*#__PURE__*/React.createElement(FTag, {
    key: s,
    selected: size === s,
    onClick: () => setSize(s)
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(FButton, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: () => onAdd(p, size || p.sizes[0])
  }, size ? 'Add to bag' : 'Select a size'), /*#__PURE__*/React.createElement(FIconButton, {
    variant: "outline",
    size: "lg",
    label: "Wishlist"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "heart"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--text-muted)',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(L, {
    name: "truck",
    size: 16
  }), " Free shipping for all orders \xB7 Crafted in South Africa"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      borderTop: '1px solid var(--border-soft)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px 0',
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--ink-900)',
      fontWeight: 600
    }
  }, "The FEIRI fit ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": open ? 'minus' : 'plus',
    style: {
      width: 16,
      height: 16
    }
  })), open && /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '0 0 18px',
      paddingLeft: 18,
      color: 'var(--text-body)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      lineHeight: 1.9
    }
  }, p.details.map(d => /*#__PURE__*/React.createElement("li", {
    key: d
  }, d))))))));
}
const detailHead = {
  fontFamily: 'var(--font-sans)',
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  margin: '0 0 10px'
};
window.ProductScreen = ProductScreen;

/* ---------------- CART ---------------- */
function CartScreen({
  items,
  onQty,
  onRemove,
  onNav
}) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const fmt = n => 'R\u00a0' + Number(n).toLocaleString('en-ZA', {
    minimumFractionDigits: 2
  });
  return /*#__PURE__*/React.createElement("div", {
    style: sectionPad
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...sc('var(--text-3xl)'),
      marginBottom: 36
    }
  }, "Shopping bag"), items.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: 'var(--space-9) 0'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...sc(26),
      marginBottom: 18
    }
  }, "Your bag is empty."), /*#__PURE__*/React.createElement(FButton, {
    variant: "primary",
    onClick: () => onNav('home')
  }, "Continue shopping")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 380px',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, items.map((it, idx) => /*#__PURE__*/React.createElement("div", {
    key: it.id + it.size,
    style: {
      display: 'flex',
      gap: 20,
      padding: '22px 0',
      borderTop: idx === 0 ? '1px solid var(--border-soft)' : 'none',
      borderBottom: '1px solid var(--border-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 92,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(window.ProductImage, {
    product: it,
    ratio: "4 / 5"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      ...sc('var(--text-md)'),
      margin: '0 0 4px'
    }
  }, it.name), /*#__PURE__*/React.createElement(FPriceTag, {
    price: it.price * it.qty
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--text-muted)',
      margin: '0 0 16px'
    }
  }, it.colorName, " \xB7 Size ", it.size), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-pill)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onQty(it, -1),
    "aria-label": "Decrease",
    style: qtyBtn
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      minWidth: 22,
      textAlign: 'center'
    }
  }, it.qty), /*#__PURE__*/React.createElement("button", {
    onClick: () => onQty(it, 1),
    "aria-label": "Increase",
    style: qtyBtn
  }, "+")), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(it),
    style: {
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--text-muted)',
      textDecoration: 'underline',
      textUnderlineOffset: 3
    }
  }, "Remove")))))), /*#__PURE__*/React.createElement(FCard, {
    surface: "raised",
    padding: "var(--space-6)",
    elevation: "sm",
    bordered: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...sc('var(--text-xl)'),
      margin: '0 0 20px'
    }
  }, "Order summary"), [['Subtotal', fmt(subtotal)], ['Shipping', 'Free'], ['Estimated tax', 'Calculated at checkout']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 12,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", null, k), /*#__PURE__*/React.createElement("span", null, v))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-soft)',
      margin: '18px 0',
      paddingTop: 16,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-900)'
    }
  }, "Total"), /*#__PURE__*/React.createElement(FPriceTag, {
    price: subtotal,
    size: "lg"
  })), /*#__PURE__*/React.createElement(FButton, {
    variant: "primary",
    size: "lg",
    fullWidth: true
  }, "Proceed to checkout"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-muted)',
      textAlign: 'center',
      marginTop: 14,
      marginBottom: 0
    }
  }, "Free shipping for all orders.")))));
}
const qtyBtn = {
  width: 34,
  height: 34,
  border: 0,
  background: 'transparent',
  cursor: 'pointer',
  color: 'var(--ink-900)',
  fontSize: 16
};
window.CartScreen = CartScreen;

/* ---------------- CONTACT ---------------- */
function ContactScreen({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: sectionPad
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      maxWidth: 720,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...sc('var(--text-3xl)'),
      marginBottom: 14
    }
  }, "Contact us"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      color: 'var(--text-body)',
      marginBottom: 36
    }
  }, "Questions about sizing, your order, or a Founders Edition piece? We\u2019re happy to help."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      textAlign: 'left'
    }
  }, [['mail', 'Email us', 'info@feiri.co.za'], ['message-circle', 'WhatsApp', 'Chat with us — bottom-right']].map(([ic, t, v]) => /*#__PURE__*/React.createElement(FCard, {
    key: t,
    surface: "raised",
    padding: "var(--space-6)",
    bordered: true
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--navy-800)',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(L, {
    name: ic,
    size: 26
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      ...sc(20),
      marginBottom: 6
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--text-body)',
      margin: 0
    }
  }, v))))));
}
window.ContactScreen = ContactScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ColorSwatch = __ds_scope.ColorSwatch;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.PriceTag = __ds_scope.PriceTag;

__ds_ns.Rating = __ds_scope.Rating;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Tag = __ds_scope.Tag;

})();
