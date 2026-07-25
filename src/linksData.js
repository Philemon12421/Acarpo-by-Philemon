// ---------------------------------------------------------------------------
// The Linker page. Add any link, website, or software app here \u2014 this is
// the ONLY file you need to touch to update that page. Every entry opens
// the destination directly in a new tab (no redirect, no interstitial).
//
// Fields:
//   name     \u2013 display name
//   url      \u2013 the actual destination (must start with https://)
//   category \u2013 groups entries on the page; reuse a category string to
//              group items together, or add a brand-new one any time
//   desc     \u2013 one short sentence describing it
// ---------------------------------------------------------------------------

export const LINKS = [
  { id: 1, name: 'OWASP Foundation', url: 'https://owasp.org', category: 'Websites',
    desc: 'Open community resource for web application security knowledge and tools.' },
  { id: 2, name: 'Have I Been Pwned', url: 'https://haveibeenpwned.com', category: 'Websites',
    desc: 'Check if your email or password has shown up in a known breach.' },
  { id: 3, name: 'MDN Web Docs', url: 'https://developer.mozilla.org', category: 'Websites',
    desc: 'Reference documentation for HTML, CSS, and JavaScript.' },
  { id: 4, name: 'Visual Studio Code', url: 'https://code.visualstudio.com', category: 'Software',
    desc: 'Free source-code editor with a large extension ecosystem.' },
  { id: 5, name: 'Figma', url: 'https://www.figma.com', category: 'Software',
    desc: 'Collaborative interface design tool used for mockups and prototypes.' },
  { id: 6, name: 'Acarpo GitHub', url: 'https://github.com/Philemon12421/Acarpo-by-Philemon', category: 'This Project',
    desc: 'Source code for this site.' },
];
