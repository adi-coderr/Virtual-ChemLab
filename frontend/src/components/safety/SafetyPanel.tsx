import type { Hazard } from "../../types/chemistry";
import "./SafetyPanel.css";

const SEVERITY_TONE: Record<Hazard["severity"], string> = {
  low: "safety-panel__hazard--low",
  medium: "safety-panel__hazard--medium",
  high: "safety-panel__hazard--high",
  extreme: "safety-panel__hazard--extreme",
};

export function SafetyPanel({ hazards, safetyNotes }: { hazards: Hazard[]; safetyNotes?: string }) {
  if (hazards.length === 0 && !safetyNotes) {
    return <p className="safety-panel__empty">No specific hazards are on file. Always follow standard lab safety practices.</p>;
  }
  return (
    <div className="safety-panel">
      {hazards.length > 0 && (
        <ul className="safety-panel__hazards">
          {hazards.map((hazard) => (
            <li key={hazard.code} className={`safety-panel__hazard ${SEVERITY_TONE[hazard.severity]}`}>
              <span className="safety-panel__hazard-label">{hazard.label}</span>
              <span className="safety-panel__hazard-description">{hazard.description}</span>
            </li>
          ))}
        </ul>
      )}
      {safetyNotes && <p className="safety-panel__notes">{safetyNotes}</p>}
      <p className="safety-panel__disclaimer">
        This is a virtual educational simulator, not a real-world procedural instruction manual for hazardous chemistry.
      </p>
    </div>
  );
}
