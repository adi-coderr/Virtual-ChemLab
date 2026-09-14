import { type ReactNode } from "react";
import "./AppShell.css";

export function AppShell({
  left,
  center,
  right,
  bottom,
  onReset,
}: {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  bottom: ReactNode;
  onReset: () => void;
}) {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__brand">
          <span className="app-shell__logo" aria-hidden="true">
            {"\u2697"}
          </span>
          <span className="app-shell__title">Virtual Chemistry Laboratory</span>
          <span className="app-shell__version mono">engine v0.1</span>
        </div>
        <button className="app-shell__reset" onClick={onReset}>
          Reset experiment
        </button>
      </header>
      <div className="app-shell__body">
        <aside className="app-shell__left">{left}</aside>
        <main className="app-shell__center">{center}</main>
        <aside className="app-shell__right">{right}</aside>
      </div>
      <footer className="app-shell__bottom">{bottom}</footer>
    </div>
  );
}
