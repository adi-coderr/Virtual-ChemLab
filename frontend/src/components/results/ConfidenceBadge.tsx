import type { ConfidenceTier } from "../../types/chemistry";
import "./ConfidenceBadge.css";

const TIER_COPY: Record<ConfidenceTier, { label: string; description: string }> = {
  SUPPORTED: { label: "Supported", description: "Curated, experimentally-grounded reaction from verified database." },
  PREDICTED: { label: "Predicted", description: "Derived from chemistry rules (solubility, activity series, combustion, acid-base)." },
  APPROXIMATE: { label: "Approximate", description: "Molecular identity is right, but equilibrium/precision is not fully modeled." },
  UNKNOWN: { label: "Unknown", description: "No curated data or rule applies -- not confidently determined." },
};

export function ConfidenceBadge({
  tier,
  score,
  aiProvider,
  isAiPredicted,
}: {
  tier: ConfidenceTier;
  score?: number;
  aiProvider?: string;
  isAiPredicted?: boolean;
}) {
  const copy = TIER_COPY[tier];

  if (isAiPredicted) {
    return (
      <span
        className="confidence-badge confidence-badge--ai"
        title={`Dynamically predicted by ${aiProvider || "AI Chemistry Engine"}`}
      >
        <span className="confidence-badge__dot confidence-badge__dot--ai" aria-hidden="true" />
        ✨ AI ({aiProvider || "AI Predicted"})
        {score !== undefined && <span className="confidence-badge__score">{Math.round(score * 100)}%</span>}
      </span>
    );
  }

  return (
    <span className={`confidence-badge confidence-badge--${tier.toLowerCase()}`} title={copy.description}>
      <span className="confidence-badge__dot" aria-hidden="true" />
      {copy.label}
      {score !== undefined && <span className="confidence-badge__score">{Math.round(score * 100)}%</span>}
    </span>
  );
}
