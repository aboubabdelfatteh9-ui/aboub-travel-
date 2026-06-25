import React from 'react';

interface AgencyLogoProps {
  className?: string;
  size?: number;
}

export default function AgencyLogo({ className = '', size = 48 }: AgencyLogoProps) {
  // SVG scaled viewbox representing the Aboub Agency Logo
  return (
    <svg 
      viewBox="0 0 1000 850" 
      width={size} 
      height={(size * 850) / 1000} 
      className={`select-none ${className}`}
      id="agency-logo-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Deep ocean blue gradient for the globe */}
        <linearGradient id="blueGlobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d6dfd" />
          <stop offset="50%" stopColor="#0052cc" />
          <stop offset="100%" stopColor="#002d72" />
        </linearGradient>

        {/* Vibrant luxury red gradient for the primary wing/swoosh */}
        <linearGradient id="redWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff3333" />
          <stop offset="40%" stopColor="#e60000" />
          <stop offset="100%" stopColor="#990000" />
        </linearGradient>

        {/* Metallic silver/gray gradient for technical elements */}
        <linearGradient id="grayMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b3b3b3" />
          <stop offset="50%" stopColor="#808080" />
          <stop offset="100%" stopColor="#4d4d4d" />
        </linearGradient>

        {/* Subtle glow filter to give a professional depth */}
        <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="3" dy="5" stdDeviation="8" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#softGlow)">
        {/* 1. Gray Background Crescent & Orbit Rings around visual center */}
        <path 
          d="M 380,680 A 240,240 0 0,0 840,430" 
          fill="none" 
          stroke="url(#grayMetalGrad)" 
          strokeWidth="36" 
          strokeLinecap="round" 
        />
        <path 
          d="M 520,770 A 250,250 0 0,0 900,470" 
          fill="none" 
          stroke="url(#blueGlobeGrad)" 
          strokeWidth="15" 
          strokeLinecap="round" 
          opacity="0.8"
        />

        {/* 2. Royal Blue Globe with precise Grid lines */}
        <g id="globe-group">
          {/* Base sphere */}
          <circle 
            cx="610" 
            cy="540" 
            r="195" 
            fill="url(#blueGlobeGrad)" 
            stroke="#ffffff" 
            strokeWidth="3" 
          />

          {/* Longitude ellipses (vertical graticules) */}
          <ellipse cx="610" cy="540" rx="150" ry="195" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.6" />
          <ellipse cx="610" cy="540" rx="100" ry="195" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.6" />
          <ellipse cx="610" cy="540" rx="50" ry="195" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.6" />
          <line x1="610" y1="345" x2="610" y2="735" stroke="#ffffff" strokeWidth="3" opacity="0.7-9" />

          {/* Latitude ellipses (horizontal graticules) */}
          <ellipse cx="610" cy="540" rx="195" ry="150" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.6" />
          <ellipse cx="610" cy="540" rx="195" ry="100" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.6" />
          <ellipse cx="610" cy="540" rx="195" ry="50" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.6" />
          <line x1="415" y1="540" x2="805" y2="540" stroke="#ffffff" strokeWidth="3" opacity="0.7-9" />
        </g>

        {/* 3. Top Gray Spiral / Wing detail */}
        <path 
          d="M 500,290 C 430,340 370,290 380,240 C 390,170 480,100 550,110 C 630,120 620,200 540,250 C 490,280 430,240 440,190 C 450,160 480,165 490,185 C 495,200 480,215 460,210" 
          fill="none" 
          stroke="url(#grayMetalGrad)" 
          strokeWidth="38" 
          strokeLinecap="round" 
        />

        {/* 4. Elegant Red Primary Wing ("Y" Swoosh) - Covers the core of the logo */}
        <path 
          d="M 210,10 C 230,130 300,280 420,380 C 560,490 810,230 950,55 C 860,100 740,160 640,230 C 510,320 400,470 340,580 C 255,690 145,640 25,535 C 130,555 250,510 330,425 C 410,340 390,270 330,170 C 280,90 230,40 210,10 Z" 
          fill="url(#redWingGrad)" 
        />
      </g>
    </svg>
  );
}
