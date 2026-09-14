import { describe, it, expect } from "vitest";
import { RuleBasedNluProvider } from "./ruleBasedNlu.js";

const provider = new RuleBasedNluProvider();

describe("RuleBasedNluProvider", () => {
  it('parses "Add 20 ml of hydrochloric acid."', async () => {
    const [intent] = await provider.parse("Add 20 ml of hydrochloric acid.");
    expect(intent).toEqual({
      kind: "operation",
      actionType: "ADD_CHEMICAL",
      chemicalQuery: "hydrochloric acid",
      amount: 20,
      unit: "mL",
    });
  });

  it('parses "Mix it with sodium hydroxide." as an ADD_CHEMICAL proposal with an assumed default amount', async () => {
    const [intent] = await provider.parse("Mix it with sodium hydroxide.");
    expect(intent?.kind).toBe("operation");
    if (intent?.kind === "operation") {
      expect(intent.actionType).toBe("ADD_CHEMICAL");
      expect(intent.chemicalQuery).toBe("sodium hydroxide");
      expect(intent.assumedDefaults?.length).toBeGreaterThan(0);
    }
  });

  it('parses "Heat the solution." with a default target temperature', async () => {
    const [intent] = await provider.parse("Heat the solution.");
    expect(intent?.kind).toBe("operation");
    if (intent?.kind === "operation") {
      expect(intent.actionType).toBe("HEAT");
      expect(intent.targetTemperatureC).toBeGreaterThan(0);
      expect(intent.assumedDefaults?.length).toBeGreaterThan(0);
    }
  });

  it('parses "Heat to 80 degrees" with the explicit temperature', async () => {
    const [intent] = await provider.parse("Heat to 80 degrees");
    expect(intent).toMatchObject({ kind: "operation", actionType: "HEAT", targetTemperatureC: 80 });
  });

  it('parses "What did I produce?" as a query', async () => {
    const [intent] = await provider.parse("What did I produce?");
    expect(intent).toEqual({ kind: "query", question: "WHAT_PRODUCED" });
  });

  it('parses "Why did this precipitate form?" as a query', async () => {
    const [intent] = await provider.parse("Why did this precipitate form?");
    expect(intent).toEqual({ kind: "query", question: "WHY_PRECIPITATE" });
  });

  it('parses "Show me the ionic equation." as a query', async () => {
    const [intent] = await provider.parse("Show me the ionic equation.");
    expect(intent).toEqual({ kind: "query", question: "SHOW_IONIC_EQUATION" });
  });

  it("parses a run-reaction command", async () => {
    const [intent] = await provider.parse("Run the reaction");
    expect(intent).toEqual({ kind: "operation", actionType: "RUN_REACTION" });
  });

  it("returns unrecognized for gibberish", async () => {
    const [intent] = await provider.parse("purple elephant migration patterns");
    expect(intent?.kind).toBe("unrecognized");
  });
});
