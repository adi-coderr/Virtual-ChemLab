import { useState } from "react";
import { assistantApi, type AssistantResponseItem } from "../../api/assistant";
import { useLabStore } from "../../state/experimentStore";
import { chemicalsApi } from "../../api/chemicals";
import type { Unit } from "../../types/chemistry";
import "./AIAssistant.css";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  proposal?: AssistantResponseItem;
  resolved?: boolean;
}

export function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "intro", role: "assistant", text: "Try: \u201cadd 20 ml of hydrochloric acid\u201d, \u201cheat to 80 degrees\u201d, or \u201cwhat did I produce?\u201d" },
  ]);
  const [input, setInput] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const experimentId = useLabStore((s) => s.experimentId);
  const addChemical = useLabStore((s) => s.addChemical);
  const heat = useLabStore((s) => s.heat);
  const cool = useLabStore((s) => s.cool);
  const runReaction = useLabStore((s) => s.runReaction);

  async function send() {
    const text = input.trim();
    if (!text || isBusy) return;
    setInput("");
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setIsBusy(true);
    try {
      const responses = await assistantApi.parse(text, experimentId ?? undefined);
      setMessages((m) => [
        ...m,
        ...responses.map((r) => ({ id: crypto.randomUUID(), role: "assistant" as const, text: r.text, proposal: r.kind === "proposed_action" ? r : undefined })),
      ]);
    } finally {
      setIsBusy(false);
    }
  }

  async function confirmProposal(messageId: string, proposal: AssistantResponseItem) {
    setMessages((m) => m.map((msg) => (msg.id === messageId ? { ...msg, resolved: true } : msg)));
    if (proposal.actionType === "ADD_CHEMICAL" && proposal.matchedChemical) {
      const amount = (proposal.payload?.amount as number) ?? 20;
      const unit = ((proposal.payload?.unit as Unit) ?? "mL") as Unit;
      const summary = await chemicalsApi.getById(proposal.matchedChemical.id);
      await addChemical(summary, amount, unit, unit === "mL" || unit === "L" ? 0.1 : undefined);
    } else if (proposal.actionType === "HEAT") {
      await heat((proposal.payload?.targetTemperatureC as number) ?? 80);
    } else if (proposal.actionType === "COOL") {
      await cool((proposal.payload?.targetTemperatureC as number) ?? 5);
    } else if (proposal.actionType === "RUN_REACTION") {
      await runReaction();
    }
  }

  return (
    <div className="ai-assistant">
      <div className="ai-assistant__messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`ai-assistant__message ai-assistant__message--${msg.role}`}>
            <p>{msg.text}</p>
            {msg.proposal && !msg.resolved && (
              <button className="ai-assistant__confirm" onClick={() => confirmProposal(msg.id, msg.proposal!)}>
                Confirm
              </button>
            )}
            {msg.resolved && <span className="ai-assistant__done">{"Done \u2713"}</span>}
          </div>
        ))}
        {isBusy && <div className="ai-assistant__message ai-assistant__message--assistant ai-assistant__message--thinking">{"Thinking\u2026"}</div>}
      </div>
      <form
        className="ai-assistant__input-row"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"Ask the assistant\u2026"}
          aria-label="Message the lab assistant"
        />
        <button type="submit" disabled={isBusy || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
