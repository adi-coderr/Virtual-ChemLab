import type { EquipmentDefinition, EquipmentType } from "../../types/experiment";
import "./EquipmentPanel.css";

export const EQUIPMENT_CATALOG: EquipmentDefinition[] = [
  { type: "beaker", label: "Beaker", description: "General-purpose container for mixing and observing reactions.", defaultCapacityMl: 250 },
  { type: "test_tube", label: "Test tube", description: "Small-volume container, good for quick side-by-side comparisons.", defaultCapacityMl: 20 },
  { type: "erlenmeyer_flask", label: "Erlenmeyer flask", description: "Narrow neck reduces splashing -- common for titrations.", defaultCapacityMl: 250 },
  { type: "graduated_cylinder", label: "Graduated cylinder", description: "For precisely measuring liquid volumes before adding them.", defaultCapacityMl: 100 },
  { type: "burette", label: "Burette", description: "Delivers precise, controlled volumes -- classic titration equipment.", defaultCapacityMl: 50 },
];

export function EquipmentPanel({ onAdd }: { onAdd: (type: EquipmentType) => void }) {
  return (
    <div className="equipment-panel">
      {EQUIPMENT_CATALOG.map((item) => (
        <button key={item.type} className="equipment-panel__item" onClick={() => onAdd(item.type)} title={item.description}>
          <EquipmentIcon type={item.type} />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

function EquipmentIcon({ type }: { type: EquipmentType }) {
  switch (type) {
    case "test_tube":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 3h6M10 3v13a2 2 0 0 0 4 0V3" />
          <path d="M10 12h4" />
        </svg>
      );
    case "erlenmeyer_flask":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 3h4v5l5 11a1.5 1.5 0 0 1-1.4 2H6.4A1.5 1.5 0 0 1 5 19l5-11V3z" />
          <path d="M9 3h6" />
        </svg>
      );
    case "graduated_cylinder":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="8" y="3" width="8" height="18" rx="1" />
          <path d="M8 8h8M8 12h8M8 16h8" />
        </svg>
      );
    case "burette":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 2h4v16l-2 4-2-4V2z" />
          <path d="M9 6h6M9 10h6" />
        </svg>
      );
    case "beaker":
    default:
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 3h10M8 3v6l-4 9a1.5 1.5 0 0 0 1.4 2h13.2a1.5 1.5 0 0 0 1.4-2l-4-9V3" />
          <path d="M6 15h12" />
        </svg>
      );
  }
}
