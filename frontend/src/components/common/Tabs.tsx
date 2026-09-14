import { useState, type ReactNode } from "react";
import "./Tabs.css";

export interface TabDef {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ tabs, defaultTabId }: { tabs: TabDef[]; defaultTabId?: string }) {
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id);
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === active?.id}
            className={`tabs__tab ${tab.id === active?.id ? "tabs__tab--active" : ""}`}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs__panel" role="tabpanel">
        {active?.content}
      </div>
    </div>
  );
}
