import { useEffect, useState } from "react";
import { chemicalsApi } from "../../api/chemicals";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import type { ChemicalSummary } from "../../types/chemistry";
import { formatFormula } from "../../utils/formatFormula";
import { Spinner } from "../common/Badge";
import "./ChemicalSearch.css";

export function ChemicalSearch({ onSelect }: { onSelect: (chemical: ChemicalSummary) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ChemicalSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 220);

  useEffect(() => {
    if (debouncedQuery.trim().length === 0) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    chemicalsApi
      .search(debouncedQuery)
      .then((res) => {
        if (!cancelled) setResults(res.items);
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  return (
    <div className="chemical-search">
      <div className="chemical-search__input-row">
        <input
          type="search"
          placeholder="Search by name, formula, or CAS number..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search chemicals"
        />
        {isLoading && <Spinner />}
      </div>
      {results.length > 0 && (
        <ul className="chemical-search__results">
          {results.map((chemical) => (
            <li key={chemical.id}>
              <button className="chemical-search__result" onClick={() => onSelect(chemical)}>
                <span
                  className="chemical-search__swatch"
                  style={{ background: chemical.substanceColor ?? "var(--paper-200)" }}
                  aria-hidden="true"
                />
                <span className="chemical-search__result-text">
                  <span className="chemical-search__name">{chemical.commonName}</span>
                  <span className="chemical-search__meta">
                    <span className="formula">{formatFormula(chemical.formula)}</span>
                    <span className="chemical-search__dot">&middot;</span>
                    {chemical.molarMass.toFixed(2)} g/mol
                    <span className="chemical-search__dot">&middot;</span>
                    {chemical.chemicalClass.replace(/_/g, " ")}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {debouncedQuery.trim().length > 0 && !isLoading && results.length === 0 && (
        <p className="chemical-search__empty">No match in the database yet for &ldquo;{debouncedQuery}&rdquo;.</p>
      )}
    </div>
  );
}
