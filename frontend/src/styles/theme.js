// Design tokens extracted from the Claude Design mockups (Melbourne Site Agent — Mobile/Wide).
export const theme = {
  color: {
    walnutShadow: '#100904', // app/card-shell background
    barkBrown: '#382416', // elevated surface — every data card's fill
    corkBorder: '#40372e', // card borders, dashed dividers
    driftwood: '#6c5f51', // muted text, gridlines, disabled state
    warmCream: '#ffedd7', // primary text, outline borders, chart line
    ember: '#dc5000', // the one accent — never on a filled button
    // categorical ramp for donut segments, ember down to driftwood
    chartRamp: ['#dc5000', '#a85a2e', '#7d5f45', '#6c5f51'],
  },
  font: {
    family: "'Figtree', 'Inter', system-ui, sans-serif",
    weightRegular: 400,
    weightMedium: 500,
  },
  radius: {
    card: '12px',
    pill: '22.5px',
    full: '9999px',
    input: '0px',
  },
  // mobile-first: base styles target 390px, min-width queries layer on tablet/desktop
  breakpoint: {
    tablet: '768px',
    desktop: '1440px',
  },
  space: {
    6: '6px',
    8: '8px',
    9: '9px',
    10: '10px',
    12: '12px',
    14: '14px',
    18: '18px',
    24: '24px',
    31: '31px',
    41: '41px',
    45: '45px',
    68: '68px',
  },
}

export const media = {
  tablet: (styles) => `@media (min-width: ${theme.breakpoint.tablet}) { ${styles} }`,
  desktop: (styles) => `@media (min-width: ${theme.breakpoint.desktop}) { ${styles} }`,
}
