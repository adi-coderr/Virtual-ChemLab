import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import "./AppShell.css";

export const DEFAULT_RIGHT_WIDTH = 380;
export const MIN_RIGHT_WIDTH = 340;
export const MIN_CENTER_WIDTH = 240;
export const LEFT_PANEL_WIDTH = 300;

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
  const [rightWidth, setRightWidth] = useState<number>(DEFAULT_RIGHT_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startWidth: number }>({ startX: 0, startWidth: DEFAULT_RIGHT_WIDTH });

  const startDragging = useCallback((clientX: number) => {
    setIsDragging(true);
    dragStartRef.current = { startX: clientX, startWidth: rightWidth };
  }, [rightWidth]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    startDragging(e.clientX);
  }, [startDragging]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      startDragging(e.touches[0]!.clientX);
    }
  }, [startDragging]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = dragStartRef.current.startX - e.clientX;
      const maxAllowedWidth = Math.max(
        MIN_RIGHT_WIDTH,
        window.innerWidth - LEFT_PANEL_WIDTH - MIN_CENTER_WIDTH - 20
      );
      const newWidth = Math.min(
        maxAllowedWidth,
        Math.max(MIN_RIGHT_WIDTH, dragStartRef.current.startWidth + deltaX)
      );
      setRightWidth(newWidth);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const deltaX = dragStartRef.current.startX - e.touches[0]!.clientX;
        const maxAllowedWidth = Math.max(
          MIN_RIGHT_WIDTH,
          window.innerWidth - LEFT_PANEL_WIDTH - MIN_CENTER_WIDTH - 20
        );
        const newWidth = Math.min(
          maxAllowedWidth,
          Math.max(MIN_RIGHT_WIDTH, dragStartRef.current.startWidth + deltaX)
        );
        setRightWidth(newWidth);
      }
    };

    const stopDragging = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", stopDragging);

    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopDragging);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isDragging]);

  const handleResetWidth = useCallback(() => {
    setRightWidth(DEFAULT_RIGHT_WIDTH);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = 20;
    const maxAllowedWidth = Math.max(
      MIN_RIGHT_WIDTH,
      window.innerWidth - LEFT_PANEL_WIDTH - MIN_CENTER_WIDTH - 20
    );

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setRightWidth((w) => Math.min(maxAllowedWidth, w + step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setRightWidth((w) => Math.max(MIN_RIGHT_WIDTH, w - step));
    } else if (e.key === "Home" || e.key === "Escape") {
      e.preventDefault();
      handleResetWidth();
    }
  }, [handleResetWidth]);

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
        <div
          className={`app-shell__resizer ${isDragging ? "app-shell__resizer--active" : ""}`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onDoubleClick={handleResetWidth}
          role="separator"
          aria-orientation="vertical"
          aria-label="Drag horizontally to resize Result & Assistant panel"
          aria-valuenow={Math.round(rightWidth)}
          aria-valuemin={MIN_RIGHT_WIDTH}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          title="Hold and drag horizontally to resize Result & Assistant panel (Double-click to reset)"
        >
          <div className="app-shell__resizer-handle" />
        </div>
        <aside
          className="app-shell__right"
          style={{ width: `${rightWidth}px` }}
        >
          {right}
        </aside>
      </div>
      <footer className="app-shell__bottom">{bottom}</footer>
    </div>
  );
}

