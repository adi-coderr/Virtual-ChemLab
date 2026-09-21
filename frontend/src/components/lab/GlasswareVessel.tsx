import React from "react";
import type { EquipmentType } from "../../types/experiment";
import "./GlasswareVessel.css";

interface GlasswareVesselProps {
  equipmentType: EquipmentType;
  fillPercent: number;
  liquidColor: string;
  temperatureC: number;
  hasContents: boolean;
}

export function GlasswareVessel({
  equipmentType,
  fillPercent,
  liquidColor,
  temperatureC,
  hasContents,
}: GlasswareVesselProps) {
  const isHot = temperatureC >= 45;
  const isBoiling = temperatureC >= 80;
  const isCold = temperatureC <= 18;

  // Compute liquid top y position based on fillPercent (0% to 100%)
  const clampedFill = Math.max(0, Math.min(100, fillPercent));

  return (
    <div className={`glassware-vessel glassware-vessel--${equipmentType}`}>
      {/* Thermal atmospheric effects */}
      {isHot && (
        <div className={`glassware-vessel__steam ${isBoiling ? "glassware-vessel__steam--intense" : ""}`} aria-hidden="true">
          <span className="steam-particle s1" />
          <span className="steam-particle s2" />
          <span className="steam-particle s3" />
        </div>
      )}
      {isCold && (
        <div className="glassware-vessel__frost" aria-hidden="true">
          <span className="frost-glint" />
        </div>
      )}

      <svg
        viewBox="0 0 160 200"
        className="glassware-vessel__svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Glass specular sheen gradient */}
          <linearGradient id="glass-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="85%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>

          {/* Liquid depth lighting gradient */}
          <linearGradient id={`liq-grad-${equipmentType}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={liquidColor} stopOpacity="0.75" />
            <stop offset="100%" stopColor={liquidColor} stopOpacity="0.95" />
          </linearGradient>

          {/* Subtle liquid surface glow */}
          <linearGradient id="meniscus-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
          </linearGradient>

          {/* Vessel interior clip paths for liquid containment */}
          <clipPath id="clip-beaker">
            <path d="M 25 22 L 25 180 Q 25 192 40 192 L 120 192 Q 135 192 135 180 L 135 22 Z" />
          </clipPath>

          <clipPath id="clip-erlenmeyer">
            <path d="M 68 22 L 68 55 L 22 180 Q 22 192 38 192 L 122 192 Q 138 192 138 180 L 92 55 L 92 22 Z" />
          </clipPath>

          <clipPath id="clip-test-tube">
            <path d="M 60 20 L 60 155 C 60 196 100 196 100 155 L 100 20 Z" />
          </clipPath>

          <clipPath id="clip-cylinder">
            <path d="M 58 22 L 58 172 L 102 172 L 102 22 Z" />
          </clipPath>

          <clipPath id="clip-burette">
            <path d="M 70 12 L 70 152 L 90 152 L 90 12 Z" />
          </clipPath>
        </defs>

        {/* Render specific glassware vessel */}
        {equipmentType === "erlenmeyer_flask" && (
          <ErlenmeyerSvg fillPercent={clampedFill} hasContents={hasContents} />
        )}
        {equipmentType === "test_tube" && (
          <TestTubeSvg fillPercent={clampedFill} hasContents={hasContents} />
        )}
        {equipmentType === "graduated_cylinder" && (
          <GraduatedCylinderSvg fillPercent={clampedFill} hasContents={hasContents} />
        )}
        {equipmentType === "burette" && (
          <BuretteSvg fillPercent={clampedFill} hasContents={hasContents} />
        )}
        {(equipmentType === "beaker" ||
          !["erlenmeyer_flask", "test_tube", "graduated_cylinder", "burette"].includes(equipmentType)) && (
          <BeakerSvg fillPercent={clampedFill} hasContents={hasContents} />
        )}
      </svg>
    </div>
  );
}

/* =========================================================================
 * BEAKER SVG COMPONENT
 * ========================================================================= */
function BeakerSvg({ fillPercent, hasContents }: { fillPercent: number; hasContents: boolean }) {
  // Total fillable height in beaker: from y = 190 (bottom) to y = 30 (top) = 160px span
  const liquidHeight = (160 * fillPercent) / 100;
  const liquidY = 190 - liquidHeight;

  return (
    <g className="glass-beaker">
      {/* Liquid Body (clipped to beaker interior) */}
      {hasContents && fillPercent > 0 && (
        <g clipPath="url(#clip-beaker)">
          <rect
            x="20"
            y={liquidY}
            width="120"
            height={liquidHeight + 10}
            fill="url(#liq-grad-beaker)"
            className="glass-liquid-rect"
          />
          {/* Surface Meniscus */}
          <path
            d={`M 25 ${liquidY} Q 80 ${liquidY + 4} 135 ${liquidY}`}
            stroke="url(#meniscus-glow)"
            strokeWidth="2.5"
            fill="none"
            opacity="0.85"
          />
          {/* Internal ambient bubbles */}
          <circle cx="50" cy={Math.min(180, liquidY + 30)} r="2" fill="#ffffff" opacity="0.6" className="bubble b1" />
          <circle cx="85" cy={Math.min(180, liquidY + 50)} r="2.5" fill="#ffffff" opacity="0.5" className="bubble b2" />
          <circle cx="105" cy={Math.min(180, liquidY + 20)} r="1.5" fill="#ffffff" opacity="0.7" className="bubble b3" />
        </g>
      )}

      {/* Graduation Markings */}
      <g className="glass-graduations" stroke="currentColor" strokeWidth="1.2" opacity="0.45">
        <line x1="112" y1="60" x2="132" y2="60" />
        <text x="106" y="63" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end" fill="currentColor" stroke="none">200ml</text>

        <line x1="120" y1="92" x2="132" y2="92" />
        <text x="114" y="95" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end" fill="currentColor" stroke="none">150</text>

        <line x1="112" y1="124" x2="132" y2="124" />
        <text x="106" y="127" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end" fill="currentColor" stroke="none">100</text>

        <line x1="120" y1="156" x2="132" y2="156" />
        <text x="114" y="159" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end" fill="currentColor" stroke="none">50</text>
      </g>

      {/* Glassware Outer Outline with Spout */}
      <path
        d="M 16 16 L 24 22 L 25 180 Q 25 192 40 192 L 120 192 Q 135 192 135 180 L 136 22 L 140 20"
        fill="none"
        stroke="var(--ink-800)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top Rim Lip */}
      <ellipse cx="80" cy="22" rx="55" ry="3.5" fill="none" stroke="var(--ink-800)" strokeWidth="2.2" opacity="0.3" />

      {/* Specular Highlight along glass edge */}
      <path
        d="M 30 30 L 30 178 Q 30 186 38 186"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </g>
  );
}

/* =========================================================================
 * ERLENMEYER FLASK SVG COMPONENT
 * ========================================================================= */
function ErlenmeyerSvg({ fillPercent, hasContents }: { fillPercent: number; hasContents: boolean }) {
  // Height from y = 190 to y = 50 = 140px span
  const liquidHeight = (140 * fillPercent) / 100;
  const liquidY = 190 - liquidHeight;

  return (
    <g className="glass-erlenmeyer">
      {/* Liquid Body */}
      {hasContents && fillPercent > 0 && (
        <g clipPath="url(#clip-erlenmeyer)">
          <rect
            x="15"
            y={liquidY}
            width="130"
            height={liquidHeight + 10}
            fill="url(#liq-grad-erlenmeyer_flask)"
            className="glass-liquid-rect"
          />
          <path
            d={`M 25 ${liquidY} Q 80 ${liquidY + 3} 135 ${liquidY}`}
            stroke="url(#meniscus-glow)"
            strokeWidth="2.5"
            fill="none"
            opacity="0.85"
          />
          <circle cx="65" cy={Math.min(180, liquidY + 25)} r="2" fill="#ffffff" opacity="0.6" className="bubble b1" />
          <circle cx="95" cy={Math.min(180, liquidY + 45)} r="2.5" fill="#ffffff" opacity="0.5" className="bubble b2" />
        </g>
      )}

      {/* Graduations */}
      <g className="glass-graduations" stroke="currentColor" strokeWidth="1.2" opacity="0.45">
        <line x1="90" y1="95" x2="105" y2="95" />
        <text x="86" y="98" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="end" fill="currentColor" stroke="none">200ml</text>

        <line x1="96" y1="125" x2="114" y2="125" />
        <text x="92" y="128" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="end" fill="currentColor" stroke="none">100</text>

        <line x1="102" y1="155" x2="125" y2="155" />
        <text x="98" y="158" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="end" fill="currentColor" stroke="none">50</text>
      </g>

      {/* Outer Outline */}
      <path
        d="M 64 16 L 96 16 M 68 18 L 68 55 L 22 180 Q 22 192 38 192 L 122 192 Q 138 192 138 180 L 92 55 L 92 18"
        fill="none"
        stroke="var(--ink-800)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rim collar */}
      <ellipse cx="80" cy="17" rx="16" ry="3" fill="none" stroke="var(--ink-800)" strokeWidth="2.2" />

      {/* Specular highlights */}
      <path
        d="M 72 26 L 72 52 L 32 174"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </g>
  );
}

/* =========================================================================
 * TEST TUBE SVG COMPONENT
 * ========================================================================= */
function TestTubeSvg({ fillPercent, hasContents }: { fillPercent: number; hasContents: boolean }) {
  // Height from y = 180 to y = 30 = 150px span
  const liquidHeight = (150 * fillPercent) / 100;
  const liquidY = 180 - liquidHeight;

  return (
    <g className="glass-test-tube">
      {/* Liquid Body */}
      {hasContents && fillPercent > 0 && (
        <g clipPath="url(#clip-test-tube)">
          <rect
            x="55"
            y={liquidY}
            width="50"
            height={liquidHeight + 20}
            fill="url(#liq-grad-test_tube)"
            className="glass-liquid-rect"
          />
          <path
            d={`M 60 ${liquidY} Q 80 ${liquidY + 3} 100 ${liquidY}`}
            stroke="url(#meniscus-glow)"
            strokeWidth="2.5"
            fill="none"
            opacity="0.85"
          />
          <circle cx="75" cy={Math.min(170, liquidY + 30)} r="2" fill="#ffffff" opacity="0.6" className="bubble b1" />
        </g>
      )}

      {/* Outer Outline with Hemispherical bottom */}
      <path
        d="M 54 14 L 106 14 M 60 16 L 60 155 C 60 196 100 196 100 155 L 100 16"
        fill="none"
        stroke="var(--ink-800)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Top collar rim */}
      <ellipse cx="80" cy="15" rx="23" ry="3.5" fill="none" stroke="var(--ink-800)" strokeWidth="2.2" />

      {/* Specular highlight */}
      <path
        d="M 66 25 L 66 150 C 66 175 75 185 80 185"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </g>
  );
}

/* =========================================================================
 * GRADUATED CYLINDER SVG COMPONENT
 * ========================================================================= */
function GraduatedCylinderSvg({ fillPercent, hasContents }: { fillPercent: number; hasContents: boolean }) {
  // Height from y = 170 to y = 25 = 145px span
  const liquidHeight = (145 * fillPercent) / 100;
  const liquidY = 170 - liquidHeight;

  return (
    <g className="glass-cylinder">
      {/* Pedestal Foot */}
      <polygon points="36,192 124,192 110,172 50,172" fill="var(--paper-200)" stroke="var(--ink-800)" strokeWidth="2.5" />

      {/* Liquid Body */}
      {hasContents && fillPercent > 0 && (
        <g clipPath="url(#clip-cylinder)">
          <rect
            x="55"
            y={liquidY}
            width="50"
            height={liquidHeight + 10}
            fill="url(#liq-grad-graduated_cylinder)"
            className="glass-liquid-rect"
          />
          <path
            d={`M 58 ${liquidY} Q 80 ${liquidY + 3} 102 ${liquidY}`}
            stroke="url(#meniscus-glow)"
            strokeWidth="2.5"
            fill="none"
            opacity="0.85"
          />
          <circle cx="75" cy={Math.min(160, liquidY + 25)} r="2" fill="#ffffff" opacity="0.6" className="bubble b1" />
        </g>
      )}

      {/* Dense graduations */}
      <g className="glass-graduations" stroke="currentColor" strokeWidth="1" opacity="0.5">
        {[30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map((y, i) => (
          <React.Fragment key={y}>
            <line x1="88" y1={y} x2="100" y2={y} strokeWidth={i % 2 === 0 ? 1.5 : 1} />
            {i % 2 === 0 && (
              <text x="84" y={y + 3} fontSize="6.5" fontFamily="var(--font-mono)" textAnchor="end" fill="currentColor" stroke="none">
                {100 - i * 10}
              </text>
            )}
          </React.Fragment>
        ))}
      </g>

      {/* Cylinder column */}
      <path
        d="M 50 16 L 58 22 L 58 172 L 102 172 L 102 22 L 106 18"
        fill="none"
        stroke="var(--ink-800)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Specular sheen */}
      <line x1="64" y1="26" x2="64" y2="168" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
    </g>
  );
}

/* =========================================================================
 * BURETTE SVG COMPONENT
 * ========================================================================= */
function BuretteSvg({ fillPercent, hasContents }: { fillPercent: number; hasContents: boolean }) {
  const liquidHeight = (135 * fillPercent) / 100;
  const liquidY = 150 - liquidHeight;

  return (
    <g className="glass-burette">
      {/* Liquid */}
      {hasContents && fillPercent > 0 && (
        <g clipPath="url(#clip-burette)">
          <rect
            x="65"
            y={liquidY}
            width="30"
            height={liquidHeight + 10}
            fill="url(#liq-grad-burette)"
            className="glass-liquid-rect"
          />
          <path
            d={`M 70 ${liquidY} Q 80 ${liquidY + 2} 90 ${liquidY}`}
            stroke="url(#meniscus-glow)"
            strokeWidth="2"
            fill="none"
            opacity="0.85"
          />
        </g>
      )}

      {/* Fine tick marks */}
      <g className="glass-graduations" stroke="currentColor" strokeWidth="0.9" opacity="0.45">
        {[20, 35, 50, 65, 80, 95, 110, 125, 140].map((y, i) => (
          <line key={y} x1="82" y1={y} x2="89" y2={y} strokeWidth={i % 2 === 0 ? 1.4 : 0.8} />
        ))}
      </g>

      {/* Slim body tube */}
      <path d="M 66 12 L 94 12 M 70 14 L 70 152 L 75 160 L 75 180 L 80 194 L 85 180 L 85 160 L 90 152 L 90 14" fill="none" stroke="var(--ink-800)" strokeWidth="2.5" />

      {/* Stopcock valve knob */}
      <rect x="68" y="162" width="24" height="6" rx="2" fill="var(--azure-600)" stroke="var(--ink-900)" strokeWidth="1" />
      <circle cx="80" cy="165" r="4" fill="var(--paper-0)" stroke="var(--ink-900)" strokeWidth="1.2" />

      {/* Specular sheen */}
      <line x1="74" y1="18" x2="74" y2="148" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
    </g>
  );
}
