const rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1300" width="100%" height="100%">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1d4ed8" />
      <stop offset="60%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#93c5fd" />
    </linearGradient>
    <linearGradient id="building" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="40%" stop-color="#ffffff" />
      <stop offset="65%" stop-color="#64748b" />
      <stop offset="100%" stop-color="#334155" />
    </linearGradient>
    <linearGradient id="redStripe" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#dc2626" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
    <linearGradient id="steelLadder" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#475569" />
      <stop offset="50%" stop-color="#e2e8f0" />
      <stop offset="100%" stop-color="#334155" />
    </linearGradient>
    <linearGradient id="liftBlue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#0369a1" />
    </linearGradient>
  </defs>

  <!-- Clear Sky -->
  <rect width="800" height="1300" fill="url(#sky)" />

  <!-- Multi-story Building Tower -->
  <path d="M 120,80 L 680,140 L 730,1300 L 70,1300 Z" fill="url(#building)" />

  <!-- Red Accent Column Stripe (Left) -->
  <path d="M 120,80 L 210,90 L 190,1300 L 70,1300 Z" fill="url(#redStripe)" />

  <!-- Red Accent Column Stripe (Right) -->
  <path d="M 610,130 L 680,140 L 730,1300 L 660,1300 Z" fill="url(#redStripe)" />

  <!-- Dark Balcony Windows Grid -->
  <g fill="#0f172a" stroke="#cbd5e1" stroke-width="2.5" opacity="0.9">
    <rect x="240" y="160" width="110" height="40" rx="2" />
    <rect x="370" y="170" width="100" height="40" rx="2" />
    <rect x="490" y="180" width="90" height="40" rx="2" />

    <rect x="235" y="230" width="115" height="45" rx="2" />
    <rect x="365" y="240" width="105" height="45" rx="2" />
    <rect x="485" y="250" width="95" height="45" rx="2" />

    <rect x="230" y="310" width="120" height="50" rx="2" />
    <rect x="360" y="320" width="110" height="50" rx="2" />
    <rect x="480" y="330" width="100" height="50" rx="2" />

    <rect x="225" y="400" width="125" height="55" rx="2" />
    <rect x="355" y="410" width="115" height="55" rx="2" />
    <rect x="475" y="420" width="105" height="55" rx="2" />

    <rect x="220" y="500" width="130" height="60" rx="2" />
    <rect x="350" y="510" width="120" height="60" rx="2" />
    <rect x="470" y="520" width="110" height="60" rx="2" />

    <rect x="215" y="610" width="135" height="65" rx="2" />
    <rect x="345" y="620" width="125" height="65" rx="2" />
    <rect x="465" y="630" width="115" height="65" rx="2" />

    <rect x="210" y="730" width="140" height="70" rx="2" />
    <rect x="340" y="740" width="130" height="70" rx="2" />
    <rect x="460" y="750" width="120" height="70" rx="2" />
  </g>

  <!-- Building Entrance Arch (A BLOK) -->
  <rect x="450" y="870" width="190" height="110" rx="6" fill="#ffffff" stroke="#64748b" stroke-width="3" />
  <circle cx="545" cy="905" r="22" fill="#e2e8f0" stroke="#334155" stroke-width="2" />
  <text x="545" y="911" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#0f172a">A BLOK</text>
  <rect x="485" y="930" width="120" height="50" fill="#1e293b" />

  <!-- Entrance Stairs & Greenery -->
  <polygon points="430,980 660,980 700,1070 390,1070" fill="#94a3b8" />
  <path d="M 50,1020 C 100,920 220,920 270,1020 Z" fill="#15803d" />
  <path d="M 280,1030 C 330,950 410,950 450,1030 Z" fill="#16a34a" />

  <!-- TALL BLUE MOBILE LADDER LIFT (CENTRAL HERO ELEMENT) -->
  <polygon points="385,60 415,60 550,1180 250,1180" fill="none" stroke="url(#steelLadder)" stroke-width="14" />
  <polygon points="392,60 408,60 530,1180 270,1180" fill="none" stroke="url(#liftBlue)" stroke-width="10" />

  <!-- Ladder Rungs -->
  <g stroke="url(#steelLadder)" stroke-width="6">
    <line x1="384" y1="80" x2="416" y2="80" />
    <line x1="378" y1="130" x2="422" y2="130" />
    <line x1="372" y1="190" x2="428" y2="190" />
    <line x1="365" y1="260" x2="435" y2="260" />
    <line x1="356" y1="340" x2="444" y2="340" />
    <line x1="346" y1="430" x2="454" y2="430" />
    <line x1="335" y1="530" x2="465" y2="530" />
    <line x1="322" y1="640" x2="478" y2="640" />
    <line x1="308" y1="760" x2="492" y2="760" />
    <line x1="292" y1="890" x2="508" y2="890" />
    <line x1="274" y1="1030" x2="526" y2="1030" />
    <line x1="254" y1="1170" x2="546" y2="1170" />
  </g>

  <!-- Cross Bracing Lattice -->
  <g stroke="#cbd5e1" stroke-width="3" opacity="0.85">
    <line x1="384" y1="80" x2="422" y2="130" /><line x1="416" y1="80" x2="378" y2="130" />
    <line x1="378" y1="130" x2="428" y2="190" /><line x1="422" y1="130" x2="372" y2="190" />
    <line x1="372" y1="190" x2="435" y2="260" /><line x1="428" y1="190" x2="365" y2="260" />
    <line x1="365" y1="260" x2="444" y2="340" /><line x1="435" y1="260" x2="356" y2="340" />
    <line x1="356" y1="340" x2="454" y2="430" /><line x1="444" y1="340" x2="346" y2="430" />
    <line x1="346" y1="430" x2="465" y2="530" /><line x1="454" y1="430" x2="335" y2="530" />
    <line x1="335" y1="530" x2="478" y2="640" /><line x1="465" y1="530" x2="322" y2="640" />
    <line x1="322" y1="640" x2="492" y2="760" /><line x1="478" y1="640" x2="308" y2="760" />
    <line x1="308" y1="760" x2="508" y2="890" /><line x1="492" y1="760" x2="292" y2="890" />
    <line x1="292" y1="890" x2="526" y2="1030" /><line x1="508" y1="890" x2="274" y2="1030" />
  </g>

  <!-- Blue Hydraulic Cylinder Arms -->
  <line x1="325" y1="700" x2="270" y2="1140" stroke="#0284c7" stroke-width="16" />
  <line x1="475" y1="700" x2="530" y2="1140" stroke="#0284c7" stroke-width="16" />
  <line x1="325" y1="700" x2="270" y2="1140" stroke="#e0f2fe" stroke-width="6" />
  <line x1="475" y1="700" x2="530" y2="1140" stroke="#e0f2fe" stroke-width="6" />

  <!-- Furniture Basket at Top -->
  <rect x="355" y="100" width="90" height="35" rx="5" fill="#0284c7" stroke="#ffffff" stroke-width="3" />
  <polygon points="345,135 455,135 440,165 360,165" fill="#e2e8f0" stroke="#334155" stroke-width="2" />

  <!-- Truck Bed & Platform at Bottom -->
  <polygon points="100,1180 700,1180 800,1300 0,1300" fill="#1e293b" />

  <!-- Red Front Plate ("TRAFİK") -->
  <rect x="240" y="1200" width="320" height="70" rx="10" fill="#dc2626" stroke="#ffffff" stroke-width="4" />
  <text x="400" y="1248" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="32" fill="#ffffff" letter-spacing="4">TRAFİK</text>

  <!-- Top Ribbon Overlay -->
  <rect x="250" y="1135" width="300" height="40" rx="8" fill="#0369a1" stroke="#ffffff" stroke-width="2" />
  <text x="400" y="1161" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="18" fill="#ffffff">AGA NAKLİYAT 25. KAT</text>
</svg>`;

export const ASANSOR_PHOTO_URL = `data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`;

// Real photography match URL from high quality Unsplash moving elevator
export const ASANSOR_REAL_PHOTO = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80';
