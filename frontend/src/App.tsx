import { useEffect, useState } from "react";
import { useLabStore } from "./state/experimentStore";
import { useSettingsStore } from "./state/settingsStore";
import { AppShell } from "./components/layout/AppShell";
import { ChemicalSearch } from "./components/search/ChemicalSearch";
import { EquipmentPanel } from "./components/equipment/EquipmentPanel";
import { ReactionControls } from "./components/controls/ReactionControls";
import { LabBench } from "./components/lab/LabBench";
import { Timeline } from "./components/timeline/Timeline";
import { ReactionResultPanel } from "./components/results/ReactionResultPanel";
import { AIAssistant } from "./components/assistant/AIAssistant";
import { AiSettingsModal } from "./components/settings/AiSettingsModal";
import { Tabs } from "./components/common/Tabs";
import { Spinner } from "./components/common/Badge";
import type { ChemicalSummary } from "./types/chemistry";
import "./App.css";

export default function App() {
  const initExperiment = useLabStore((s) => s.initExperiment);
  const resetExperiment = useLabStore((s) => s.resetExperiment);
  const experimentId = useLabStore((s) => s.experimentId);
  const lastSimulationResult = useLabStore((s) => s.lastSimulationResult);
  const error = useLabStore((s) => s.error);
  const clearError = useLabStore((s) => s.clearError);
  const addEquipment = useLabStore((s) => s.addEquipment);
  const loadSettings = useSettingsStore((s) => s.loadSettings);

  const [pendingChemical, setPendingChemical] = useState<ChemicalSummary | null>(null);
  const [activeTabId, setActiveTabId] = useState("result");

  useEffect(() => {
    initExperiment();
    loadSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When a reaction is simulated, switch to Result tab
  useEffect(() => {
    if (lastSimulationResult) {
      setActiveTabId("result");
    }
  }, [lastSimulationResult]);

  if (!experimentId) {
    return (
      <div className="app-loading">
        <Spinner size={28} />
        <p>{"Starting the laboratory\u2026"}</p>
      </div>
    );
  }

  return (
    <>
      <AppShell
        onReset={() => resetExperiment()}
        left={
          <div className="app-left">
            <section>
              <h4 className="app-panel-title">Search chemicals</h4>
              <ChemicalSearch onSelect={setPendingChemical} />
            </section>
            <section>
              <h4 className="app-panel-title">Equipment</h4>
              <EquipmentPanel onAdd={addEquipment} />
            </section>
            <section>
              <h4 className="app-panel-title">Add &amp; react</h4>
              <ReactionControls pendingChemical={pendingChemical} onAdded={() => setPendingChemical(null)} />
            </section>
          </div>
        }
        center={<LabBench />}
        right={
          <Tabs
            defaultTabId={activeTabId}
            tabs={[
              {
                id: "result",
                label: "Result",
                content: lastSimulationResult ? (
                  <ReactionResultPanel result={lastSimulationResult} />
                ) : (
                  <p className="app-right-placeholder">
                    Select chemicals into a container to run or preview the reaction.
                  </p>
                ),
              },
              { id: "assistant", label: "Assistant", content: <AIAssistant /> },
            ]}
          />
        }
        bottom={<Timeline />}
      />
      <AiSettingsModal />
      {error && (
        <div className="app-error-toast" role="alert">
          {error}
          <button onClick={clearError}>{"\u2715"}</button>
        </div>
      )}
    </>
  );
}
