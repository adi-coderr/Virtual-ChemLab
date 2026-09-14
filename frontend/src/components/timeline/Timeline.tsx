import { useLabStore } from "../../state/experimentStore";
import "./Timeline.css";

const ACTION_ICON: Record<string, string> = {
  ADD_CHEMICAL: "\u2295",
  MIX: "\u21C6",
  HEAT: "\u{1F525}",
  COOL: "\u2744",
  REMOVE: "\u2296",
  MEASURE: "\u{1F4CF}",
  RUN_REACTION: "\u269B",
  RESET: "\u21BA",
};

export function Timeline() {
  const timeline = useLabStore((s) => s.timeline);
  const undo = useLabStore((s) => s.undo);
  const history = useLabStore((s) => s.history);

  return (
    <div className="timeline">
      <div className="timeline__header">
        <span className="timeline__title">Experiment timeline</span>
        <button className="timeline__undo" onClick={undo} disabled={history.length === 0}>
          Undo
        </button>
      </div>
      <ol className="timeline__list">
        {timeline.length === 0 && <li className="timeline__empty">No actions yet -- add a chemical to begin.</li>}
        {timeline.map((entry) => (
          <li key={entry.id} className="timeline__entry">
            <span className="timeline__time mono">{entry.timeLabel}</span>
            <span className="timeline__icon" aria-hidden="true">
              {ACTION_ICON[entry.actionType] ?? "\u2022"}
            </span>
            <span className="timeline__description">{entry.description}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
