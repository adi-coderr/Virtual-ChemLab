/** Renders a chemical formula string as JSX with proper subscript digits, e.g. "Fe2O3" -> Fe<sub>2</sub>O<sub>3</sub>. */
export function formatFormula(formula: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  let buffer = "";
  let bufferIsDigit = false;
  let key = 0;

  const flush = () => {
    if (buffer.length === 0) return;
    if (bufferIsDigit) {
      parts.push(<sub key={key++}>{buffer}</sub>);
    } else {
      parts.push(buffer);
    }
    buffer = "";
  };

  for (const ch of formula) {
    const isDigit = ch >= "0" && ch <= "9";
    if (buffer.length > 0 && isDigit !== bufferIsDigit) flush();
    buffer += ch;
    bufferIsDigit = isDigit;
  }
  flush();
  return parts;
}
