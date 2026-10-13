/**
 * ALL marketing copy, links and images for the public site.
 * Replace with your client's content. Images use royalty-free dummy photos from picsum.photos —
 * swap for your own files in /public (e.g. "/images/hero.jpg").
 */
export const pic = (seed: string, w = 1200, h = 900) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const brand = {
  name: "BRAND",
  edgeLetters: ["B", "D"] as const, // giant accent letters at the screen edges
  tagline: "Ready-to-buy collections and on-demand production that help modern labels move faster and grow without compromise.",
  social: { instagram: "#", linkedin: "#" },
};

export const nav = {
  header: [
    { label: "About us", href: "/about" },
    { label: "Get started", href: "/get-started", index: "[01]" },
  ],
  footer: [
    { label: "Join us", href: "/talent" },
    { label: "About", href: "/about" },
    { label: "Collection", href: "/collection" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  login: { label: "Login", href: "/admin/login" },
  legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms & conditions", href: "/terms" },
    { label: "Track order", href: "/track-order" },
  ],
};

export const img = {
  hero1: pic("hero-a", 900, 1200),
  hero2: pic("hero-b", 900, 1200),
  story: pic("story", 600, 800),
  video: pic("workshop", 1200, 1400),
  frame1: pic("frame-a", 900, 1100),
  frame2: pic("frame-b", 900, 1100),
  believe: pic("motion", 1000, 1200),
  showcase: pic("showcase", 1800, 1100),
  demo: pic("demo", 1600, 900),
};

export const video = {
  workshop: "https://vjs.zencdn.net/v/oceans.mp4",
  demo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  reel: "https://www.w3schools.com/html/mov_bbb.mp4",
};


export const home = {
  story: {
    eyebrow: "Our story",
    title: ["Built for", "the", "next season"],
    body: [
      "We started with one goal: make production simpler, faster and more transparent for growing labels.",
      "Our teams work across several cities, supported by a certified partner network and our own software — so collections move from idea to shelf without the usual friction.",
    ],
    link: { label: "About us", href: "/about" },
  },
  whatWeDo: {
    eyebrow: "What we do",
    title: "One partner from sketch to shipment",
    body: "Forecasting, sampling, fit checks and global delivery in a single workflow — so your team can focus on the product, not the paperwork.",
    tabs: [
      { label: "Concept to delivery", href: "/concept-to-delivery" },
      { label: "On demand production", href: "/on-demand" },
    ],
  },
  logos: ["Northwind", "Lumen Co.", "Atlas Wear", "Kestrel", "Oro Studio", "Meridian", "Fieldnote"],
  believe: {
    eyebrow: "What we believe",
    title: "Good ideas shouldn't wait a season",
    body: [
      "Long lead times and rigid minimums slow brands down and leave money on the table.",
      "We replace that with a flexible, design-led chain — choose speed, margin or flexibility and keep control from first sample to final delivery.",
    ],
    link: { label: "Success stories", href: "/success-stories" },
  },
  help: {
    eyebrow: "How we help",
    title: ["Ship sooner.", "Spend smarter.", "Grow steadier."],
    items: [
      { title: "Turn fixed costs into variable", body: "Pick from ready styles and pay only for what you produce." },
      { title: "Shorter time to market", body: "Production-ready designs go from selection to shelf in weeks." },
      { title: "Flexible minimums", body: "Test small, learn fast, reorder what sells." },
      { title: "A single accountable team", body: "Design, sourcing, quality and logistics under one roof." },
    ],
  },
  showcase: {
    script: "with love, Brand",
    body: "See how growing labels launch faster with flexible minimums, hands-on support and an end-to-end process.",
    link: { label: "Success stories", href: "/success-stories" },
  },
  needs: {
    eyebrow: "Your needs",
    title: "Let's make what's next, together",
    cards: [
      { title: "For talent", body: "Join a team where craft, quality and technology meet.", link: { label: "Join us", href: "/talent" } },
      { title: "For brands", body: "Launch collections faster with one partner for everything.", link: { label: "Get started", href: "/get-started" } },
      { title: "For partners", body: "Factories, suppliers and tech partners — grow with us.", link: { label: "Partner with us", href: "/partner" } },
    ],
  },
};

export type Step = { title: string; body: string };
export type PanelPage = {
  slug: string; title: string; intro?: string; hero?: string;
  quote?: { text: string; by: string }; aside?: string;
  stats?: { value: string; label: string }[]; carousel?: string[]; steps?: Step[];
  showLogos?: boolean; closingImage?: string; closingQuote?: { text: string; by: string };
  offices?: boolean; team?: { name: string; role: string; email: string; photo: string }[];
};

const fourSteps: Step[] = [
  { title: "Browse the library", body: "Explore ready-to-produce styles across categories, curated by our designers." },
  { title: "Decide in the room", body: "See pricing, materials and lead times instantly while you select." },
  { title: "We handle the rest", body: "Sampling, production and logistics through our vetted network." },
  { title: "Launch and learn", body: "Receive finished goods and use sell-through data to plan reorders." },
];

export const panels: PanelPage[] = [
  {
    slug: "success-stories",
    title: "Helping labels win",
    hero: pic("panel-success", 1600, 900),
    quote: { text: "“Quick, dependable and the designs always land on time.”", by: "Sample Client, Buying Lead" },
    aside: "From tight deadlines to tricky sourcing, growing labels rely on our team for quality, speed and responsive support.",
    stats: [
      { value: "30+", label: "Brands partnered" }, { value: "10M", label: "Units shipped" },
      { value: "5K", label: "Designs launched" }, { value: "50", label: "Partners vetted" },
    ],
    carousel: [pic("c1", 800, 600), pic("c2", 800, 600), pic("c3", 800, 600), pic("c4", 800, 600), pic("c5", 800, 600)],
    steps: fourSteps,
    showLogos: true,
    closingImage: pic("panel-closing", 1600, 900),
    closingQuote: { text: "“A steady partner through every tight timeline and complex development.”", by: "Sample Client, Sourcing Manager" },
  },
  {
    slug: "concept-to-delivery",
    title: "Concept to delivery",
    intro: "Browse ready-to-shop collections that we build end to end. Choose the styles you love — we take care of everything after that.",
    hero: pic("panel-concept", 1600, 900),
    carousel: [pic("d1", 800, 600), pic("d2", 800, 600), pic("d3", 800, 600), pic("d4", 800, 600)],
    steps: fourSteps,
    showLogos: true,
  },
  {
    slug: "on-demand",
    title: "Your designs, made on demand",
    hero: pic("panel-ondemand", 1600, 900),
    quote: { text: "“Every other supplier missed our dates. This team didn't.”", by: "Sample Client, Founder" },
    intro: "Bring your own designs. We handle costed tech-packs, rapid sampling, responsible sourcing, production and delivery.",
    steps: [
      { title: "Share your vision", body: "Send designs and specs; we return fully costed tech-packs." },
      { title: "Develop together", body: "Refine fit, fabric and finish with our specialists." },
      { title: "Sample quickly", body: "First prototypes in weeks, not months." },
      { title: "Produce and deliver", body: "Scale across our network with door-to-door logistics." },
    ],
  },
  {
    slug: "about",
    title: "Inside Brand",
    intro: "An end-to-end engine for modern labels — built for speed, quality and reliability.",
    hero: pic("panel-about", 1600, 900),
    aside: "Founded to bring visibility and efficiency to production.",
    offices: true,
    steps: [
      { title: "Design labs", body: "In-house designers turn moodboards into production-ready styles." },
      { title: "Product labs", body: "A vetted partner network with sourcing and tech-packs built in." },
      { title: "Our technology", body: "Market insight and production tracking in one platform." },
    ],
    team: [
      { name: "Alex Morgan", role: "Chief Executive Officer", email: "alex@example.com", photo: pic("team-1", 600, 750) },
      { name: "Sam Rivera", role: "President", email: "sam@example.com", photo: pic("team-2", 600, 750) },
    ],
  },
];

export const offices = [
  { city: "Dhaka", address: "House 00, Road 00, Gulshan, Dhaka", x: 72, y: 46 },
  { city: "London", address: "00 Example Street, London", x: 47.5, y: 28 },
  { city: "Barcelona", address: "Carrer Example 00, Barcelona", x: 48.5, y: 34 },
  { city: "New York", address: "000 Example Ave, New York", x: 27, y: 35 },
  { city: "Istanbul", address: "Example Cd. 00, Istanbul", x: 56, y: 34 },
  { city: "Singapore", address: "00 Example Road, Singapore", x: 76, y: 60 },
];

export const labs = [
  { city: "Dhaka", address: "House 00, Road 00, Gulshan, Dhaka", image: pic("lab-1", 900, 700) },
  { city: "Barcelona", address: "Carrer Example 00, Barcelona", image: pic("lab-2", 900, 700) },
  { city: "London", address: "00 Example Street, London", image: pic("lab-3", 900, 700) },
  { city: "New York", address: "000 Example Ave, New York", image: pic("lab-4", 900, 700) },
];

export const infoPages = {
  talent: {
    crumb: "Talent",
    title: "Building what comes next",
    hero: pic("talent-hero", 1800, 1000),
    eyebrow: "Why join?",
    stats: [
      { value: "150", label: "Expert team" }, { value: "6", label: "Offices" },
      { value: "80", label: "Brands partnered" }, { value: "100", label: "Partners vetted" },
    ],
    body: "We're building the infrastructure for a more responsive, more responsible industry — and we need curious people to do it.",
    bullets: ["Work across design labs, product teams and engineering.", "Own projects that ship to real customers.", "Learn from experienced people in several countries."],
    listTitle: "Open roles",
    list: [
      { title: "Graphic designer — menswear & womenswear", meta: "Barcelona" },
      { title: "Business development executive", meta: "Dhaka" },
      { title: "Junior product developer", meta: "London" },
      { title: "Frontend engineer", meta: "Remote" },
    ],
    gallery: [pic("t1", 800, 600), pic("t2", 800, 600), pic("t3", 800, 600), pic("t4", 800, 600), pic("t5", 800, 600)],
  },
  partner: {
    crumb: "Partner",
    title: "Partnering for what's next",
    hero: pic("partner-hero", 1800, 1000),
    eyebrow: "Why partner with us?",
    stats: [
      { value: "80", label: "Brands partnered" }, { value: "40M", label: "Units shipped" },
      { value: "20K", label: "Designs launched" }, { value: "100", label: "Partners vetted" },
    ],
    body: "We build the path together. Every partnership is a chance to improve quality, sustainability and growth for everyone involved.",
    bullets: [] as string[],
    quote: { text: "“Supportive in every way — they've saved us at critical moments more than once.”", by: "Sample Partner, Operations Director" },
    gallery: [pic("p1", 800, 600), pic("p2", 800, 600), pic("p3", 800, 600), pic("p4", 800, 600)],
  },
};

export type BlogPost = { slug: string; tag: string; date: string; title: string; excerpt: string; image: string; body: string[] };
export const blogPosts: BlogPost[] = [
  { slug: "beyond-compliance", tag: "Sustainability", date: "Nov 21, 2026", title: "Beyond compliance: earning trust again", excerpt: "The next frontier isn't faster production — it's transparency people can verify.", image: pic("b1", 1200, 800), body: ["Placeholder article body. Replace with your own writing.", "Use as many paragraphs as you need — each array item becomes one paragraph."] },
  { slug: "ai-in-design", tag: "Technology", date: "Nov 6, 2026", title: "How AI is changing design and production", excerpt: "Connecting design, data and delivery in real time.", image: pic("b2", 1200, 800), body: ["Placeholder article body."] },
  { slug: "culture-wins", tag: "Culture", date: "Oct 17, 2026", title: "In the end, culture wins", excerpt: "Lasting companies are built on shared belief, not just great products.", image: pic("b3", 1200, 800), body: ["Placeholder article body."] },
  { slug: "forecast-dont-follow", tag: "Trends", date: "Oct 6, 2026", title: "Forecast, don't follow", excerpt: "Reading culture early with data and good instincts.", image: pic("b4", 1200, 800), body: ["Placeholder article body."] },
  { slug: "featured-visionary", tag: "Featured", date: "Sep 30, 2026", title: "Every brand needs a visionary — and an analyst", excerpt: "Where intuition meets predictive insight.", image: pic("b5", 900, 1200), body: ["Placeholder article body."] },
  { slug: "agentic-supply-chain", tag: "Technology", date: "Sep 12, 2026", title: "The autonomous supply chain", excerpt: "The next big shift may not be a brand at all.", image: pic("b6", 900, 1200), body: ["Placeholder article body."] },
];

export const legal = {
  privacy: {
    title: "Privacy policy",
    sections: [
      { h: "Overview", p: "Placeholder text. Replace with your client's privacy policy, reviewed by a lawyer." },
      { h: "Information we collect", p: "Describe what personal information is collected and why." },
      { h: "How we use it", p: "Explain how information is used and shared." },
      { h: "Cookies", p: "Explain cookie usage and how to opt out." },
      { h: "Security", p: "Describe how data is protected." },
      { h: "Contact", p: "How people can reach you about privacy questions." },
    ],
  },
  terms: {
    title: "Terms & conditions",
    sections: [
      { h: "Introduction", p: "Placeholder text. Replace with your client's terms, reviewed by a lawyer." },
      { h: "Intellectual property", p: "…" },
      { h: "Orders & production", p: "…" },
      { h: "Refunds", p: "…" },
      { h: "Limitation of liability", p: "…" },
      { h: "Governing law", p: "…" },
    ],
  },
};
