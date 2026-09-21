import type { Container } from "../../types/experiment";
import { formatFormula } from "../../utils/formatFormula";
import { GlasswareVessel } from "./GlasswareVessel";
import "./ContainerView.css";

function mixLiquidColor(container: Container): string {
  const colored = container.contents.filter((c) => c.substanceColor && c.substanceColor.toLowerCase() !== "#ffffff");
  return colored[colored.length - 1]?.substanceColor ?? (container.contents.length > 0 ? "#70bce8" : "transparent");
}

function computeFillPercent(container: Container): number {
  if (container.contents.length === 0) return 0;

  const totalMl = container.contents.reduce((sum, item) => {
    if (item.unit === "mL") return sum + item.amount;
    if (item.unit === "L") return sum + item.amount * 1000;
    if (item.unit === "g" || item.unit === "mg") return sum + (item.unit === "g" ? item.amount : item.amount / 1000);
    return sum + 20;
  }, 0);

  const capacityMap: Record<string, number> = {
    beaker: 250,
    test_tube: 20,
    erlenmeyer_flask: 250,
    graduated_cylinder: 100,
    burette: 50,
  };

  const capacity = capacityMap[container.equipmentType] ?? 250;
  return Math.min(88, Math.max(16, (totalMl / capacity) * 75 + 10));
}

export function ContainerView({
  container,
  isActive,
  isDropTarget,
  sizeTier = "hero",
  containerCount = 1,
  onSelect,
  onDrop,
  onRemove,
}: {
  container: Container;
  isActive: boolean;
  isDropTarget: boolean;
  sizeTier?: "hero" | "duo" | "trio" | "compact";
  containerCount?: number;
  onSelect: () => void;
  onDrop: (chemicalId: string) => void;
  onRemove?: () => void;
}) {
  const liquidColor = mixLiquidColor(container);
  const fillPercent = computeFillPercent(container);
  const hasContents = container.contents.length > 0;

  return (
    <div
      className={`container-view container-view--${sizeTier} ${isActive ? "container-view--active" : ""} ${
        isDropTarget ? "container-view--drop-target" : ""
      }`}
      onClick={onSelect}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const chemicalId = e.dataTransfer.getData("text/chemical-id");
        if (chemicalId) onDrop(chemicalId);
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
    >
      {/* Top Header with Status, Name, and Quick Actions */}
      <div className="container-view__header">
        <div className="container-view__meta">
          {isActive && <span className="container-view__active-badge">Active</span>}
          <span className="container-view__name">{container.name}</span>
        </div>

        <div className="container-view__actions">
          <span
            className={`container-view__temp ${
              container.temperatureC <= 18
                ? "container-view__temp--cold"
                : container.temperatureC >= 45
                  ? "container-view__temp--warm"
                  : ""
            }`}
            title={`Current temperature: ${container.temperatureC}°C`}
          >
            {container.temperatureC <= 18 ? "❄️ " : container.temperatureC >= 45 ? "🔥 " : ""}
            {container.temperatureC}{"\u00b0C"}
          </span>

          {onRemove && containerCount > 1 && (
            <button
              className="container-view__remove-btn"
              title="Remove this container from bench"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              aria-label={`Remove ${container.name}`}
            >
              {"\u2715"}
            </button>
          )}
        </div>
      </div>

      {/* Glassware Vessel Graphic */}
      <div className="container-view__vessel-wrapper">
        <GlasswareVessel
          equipmentType={container.equipmentType}
          fillPercent={fillPercent}
          liquidColor={liquidColor}
          temperatureC={container.temperatureC}
          hasContents={hasContents}
        />
      </div>

      {/* Chemical Contents & Volume Readout */}
      <div className="container-view__details">
        <ul className="container-view__contents">
          {container.contents.map((c, i) => (
            <li key={`${c.chemicalId}-${i}`} className="container-view__content-item">
              <div className="container-view__content-chem">
                {c.substanceColor && c.substanceColor.toLowerCase() !== "#ffffff" && (
                  <span className="container-view__color-dot" style={{ background: c.substanceColor }} />
                )}
                <span className="formula">{formatFormula(c.formula)}</span>
              </div>
              <span className="container-view__amount">
                {c.amount} {c.unit}
                {c.concentrationMolar ? ` @ ${c.concentrationMolar}M` : ""}
              </span>
            </li>
          ))}
          {!hasContents && (
            <li className="container-view__empty">
              <span>Empty container</span>
              {sizeTier === "hero" && <span className="container-view__empty-hint">Drop chemicals or pick from catalog</span>}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
