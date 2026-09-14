import type { ObservableEffect, ObservableEffectType } from "../../types/chemistry";
import "./ObservableEffectsPanel.css";

const EFFECT_ICON: Record<ObservableEffectType, string> = {
  color_change: "\u{1F3A8}",
  precipitation: "\u2744\uFE0F",
  gas_evolution: "\u{1FAE7}",
  temperature_increase: "\u{1F525}",
  temperature_decrease: "\u2744",
  dissolution: "\u{1F4A7}",
  phase_change: "\u267B\uFE0F",
  effervescence: "\u2728",
};

export function ObservableEffectsPanel({ effects }: { effects: ObservableEffect[] }) {
  if (effects.length === 0) {
    return <p className="observable-effects__empty">No specific observable effects are recorded for this reaction.</p>;
  }
  return (
    <ul className="observable-effects">
      {effects.map((effect, i) => (
        <li key={i} className="observable-effects__item">
          <span className="observable-effects__icon" aria-hidden="true">
            {EFFECT_ICON[effect.type] ?? "\u2022"}
          </span>
          <div>
            <p className="observable-effects__type">{effect.type.replace(/_/g, " ")}</p>
            <p className="observable-effects__description">{effect.description}</p>
          </div>
          {(effect.colorFrom || effect.colorTo) && (
            <span className="observable-effects__swatches">
              {effect.colorFrom && <span className="observable-effects__swatch" style={{ background: effect.colorFrom }} />}
              {effect.colorFrom && effect.colorTo && <span className="observable-effects__swatch-arrow">{"\u2192"}</span>}
              {effect.colorTo && <span className="observable-effects__swatch" style={{ background: effect.colorTo }} />}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
