import { useState } from "react";
import { useLabStore } from "../../state/experimentStore";
import { ContainerView } from "./ContainerView";
import "./LabBench.css";

export function LabBench() {
  const containers = useLabStore((s) => s.containers);
  const activeContainerId = useLabStore((s) => s.activeContainerId);
  const setActiveContainer = useLabStore((s) => s.setActiveContainer);
  const pourInto = useLabStore((s) => s.pourInto);
  const removeContainer = useLabStore((s) => s.removeContainer);
  const [pourSourceId, setPourSourceId] = useState<string | null>(null);

  const count = containers.length;
  const sizeTier: "hero" | "duo" | "trio" | "compact" =
    count <= 1 ? "hero" : count === 2 ? "duo" : count <= 4 ? "trio" : "compact";

  const isPouring = pourSourceId !== null;

  return (
    <div className={`lab-bench lab-bench--${sizeTier}`}>
      {/* Workbench Status Bar */}
      <div className="lab-bench__header">
        <div className="lab-bench__title-area">
          <span className="lab-bench__dot" />
          <span className="lab-bench__title">
            {isPouring ? "Transferring contents" : "Reaction Workbench"}
          </span>
          <span className="lab-bench__count-pill">
            {count} {count === 1 ? "vessel" : "vessels"}
          </span>
        </div>

        {isPouring && (
          <div className="lab-bench__pour-instruction">
            <span>Click any target vessel to pour into it</span>
            <button className="lab-bench__cancel-pour" onClick={() => setPourSourceId(null)}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Main Workbench Surface - Centered in middle */}
      <div
        className={`lab-bench__surface lab-bench__surface--${sizeTier} ${
          count >= 5 ? "lab-bench__surface--multi" : ""
        }`}
      >
        {containers.map((container) => {
          const isPourSource = pourSourceId === container.id;
          const isPourTargetCandidate = isPouring && !isPourSource;

          return (
            <div
              key={container.id}
              className={`lab-bench__slot ${isPourSource ? "lab-bench__slot--pour-source" : ""} ${
                isPourTargetCandidate ? "lab-bench__slot--pour-target" : ""
              }`}
            >
              <ContainerView
                container={container}
                sizeTier={sizeTier}
                containerCount={count}
                isActive={container.id === activeContainerId}
                isDropTarget={isPourTargetCandidate}
                onSelect={() => {
                  if (pourSourceId && pourSourceId !== container.id) {
                    pourInto(pourSourceId, container.id);
                    setPourSourceId(null);
                  } else {
                    setActiveContainer(container.id);
                  }
                }}
                onDrop={() => setActiveContainer(container.id)}
                onRemove={() => removeContainer(container.id)}
              />

              {/* Action Controls for Utensil */}
              {container.contents.length > 0 && count > 1 && (
                <button
                  className={`lab-bench__pour-btn ${isPourSource ? "is-armed" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPourSourceId(isPourSource ? null : container.id);
                  }}
                  title={isPourSource ? "Click target vessel or cancel" : "Pour contents into another vessel"}
                >
                  <span className="pour-icon">{"\u2935"}</span>
                  {isPourSource ? "Select target\u2026" : "Pour into\u2026"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {count === 0 && (
        <div className="lab-bench__empty-state">
          <p className="lab-bench__empty-title">Workbench is clear</p>
          <p className="lab-bench__empty-sub">Add a beaker, flask, or test tube from the equipment panel on the left.</p>
        </div>
      )}
    </div>
  );
}
