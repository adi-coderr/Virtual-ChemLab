import { useState } from "react";
import { useLabStore } from "../../state/experimentStore";
import { ContainerView } from "./ContainerView";
import "./LabBench.css";

export function LabBench() {
  const containers = useLabStore((s) => s.containers);
  const activeContainerId = useLabStore((s) => s.activeContainerId);
  const setActiveContainer = useLabStore((s) => s.setActiveContainer);
  const pourInto = useLabStore((s) => s.pourInto);
  const [pourSourceId, setPourSourceId] = useState<string | null>(null);

  return (
    <div className="lab-bench">
      <div className="lab-bench__surface">
        {containers.map((container) => (
          <div key={container.id} className="lab-bench__slot">
            <ContainerView
              container={container}
              isActive={container.id === activeContainerId}
              isDropTarget={false}
              onSelect={() => {
                if (pourSourceId && pourSourceId !== container.id) {
                  pourInto(pourSourceId, container.id);
                  setPourSourceId(null);
                } else {
                  setActiveContainer(container.id);
                }
              }}
              onDrop={() => setActiveContainer(container.id)}
            />
            {container.contents.length > 0 && containers.length > 1 && (
              <button
                className={`lab-bench__pour-btn ${pourSourceId === container.id ? "is-armed" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPourSourceId(pourSourceId === container.id ? null : container.id);
                }}
              >
                {pourSourceId === container.id ? "Pouring\u2026 pick a target" : "Pour into\u2026"}
              </button>
            )}
          </div>
        ))}
      </div>
      {containers.length === 0 && <p className="lab-bench__empty">Add a container from the equipment panel to get started.</p>}
    </div>
  );
}
