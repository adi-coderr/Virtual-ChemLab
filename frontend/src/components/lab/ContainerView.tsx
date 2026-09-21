import type { Container } from "../../types/experiment";
import { formatFormula } from "../../utils/formatFormula";
import "./ContainerView.css";

function mixLiquidColor(container: Container): string {
  const colored = container.contents.filter((c) => c.substanceColor && c.substanceColor.toLowerCase() !== "#ffffff");
  return colored[colored.length - 1]?.substanceColor ?? (container.contents.length > 0 ? "#cfe8f3" : "transparent");
}

export function ContainerView({
  container,
  isActive,
  isDropTarget,
  onSelect,
  onDrop,
}: {
  container: Container;
  isActive: boolean;
  isDropTarget: boolean;
  onSelect: () => void;
  onDrop: (chemicalId: string) => void;
}) {
  const liquidColor = mixLiquidColor(container);
  const fillLevel = Math.min(90, container.contents.length * 22 + (container.contents.length > 0 ? 14 : 0));

  return (
    <div
      className={`container-view ${isActive ? "container-view--active" : ""} ${isDropTarget ? "container-view--drop-target" : ""}`}
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
      <div className="container-view__vessel">
        <div className="container-view__liquid" style={{ height: `${fillLevel}%`, background: liquidColor }} />
        {container.temperatureC >= 60 && <div className="container-view__heat-shimmer" aria-hidden="true" />}
        {container.temperatureC <= 18 && <div className="container-view__cold-frost" aria-hidden="true" />}
      </div>
      <div className="container-view__label">
        <span className="container-view__name">{container.name}</span>
        <span
          className={`container-view__temp ${
            container.temperatureC <= 18
              ? "container-view__temp--cold"
              : container.temperatureC >= 45
                ? "container-view__temp--warm"
                : ""
          }`}
        >
          {container.temperatureC <= 18 ? "❄️ " : container.temperatureC >= 45 ? "🔥 " : ""}
          {container.temperatureC}{"\u00b0C"}
        </span>
      </div>
      <ul className="container-view__contents">
        {container.contents.map((c, i) => (
          <li key={`${c.chemicalId}-${i}`}>
            <span className="formula">{formatFormula(c.formula)}</span>
            <span className="container-view__amount">
              {c.amount} {c.unit}
              {c.concentrationMolar ? ` @ ${c.concentrationMolar} M` : ""}
            </span>
          </li>
        ))}
        {container.contents.length === 0 && <li className="container-view__empty">Empty</li>}
      </ul>
    </div>
  );
}
