import type Database from "better-sqlite3";
import { nanoid } from "nanoid";
import type { ExperimentActionDTO, ExperimentActionType, ExperimentDTO } from "../../types/api.js";

interface ExperimentRow {
  id: string;
  name: string | null;
  created_at: string;
  updated_at: string;
  status: string;
}

interface ActionRow {
  id: number;
  experiment_id: string;
  sequence: number;
  action_type: string;
  payload_json: string;
  result_json: string | null;
  created_at: string;
}

function rowToAction(row: ActionRow): ExperimentActionDTO {
  return {
    id: row.id,
    sequence: row.sequence,
    actionType: row.action_type as ExperimentActionType,
    payload: JSON.parse(row.payload_json),
    result: row.result_json ? JSON.parse(row.result_json) : undefined,
    createdAt: row.created_at,
  };
}

export class ExperimentRepository {
  constructor(private readonly db: Database.Database) {}

  create(name?: string): ExperimentDTO {
    const id = nanoid(10);
    const now = new Date().toISOString();
    this.db
      .prepare("INSERT INTO experiments (id, name, created_at, updated_at, status) VALUES (?, ?, ?, ?, 'in_progress')")
      .run(id, name ?? null, now, now);
    return { id, name: name ?? null, createdAt: now, updatedAt: now, status: "in_progress", actions: [] };
  }

  getById(id: string): ExperimentDTO | undefined {
    const row = this.db.prepare("SELECT * FROM experiments WHERE id = ?").get(id) as ExperimentRow | undefined;
    if (!row) return undefined;
    const actionRows = this.db
      .prepare("SELECT * FROM experiment_actions WHERE experiment_id = ? ORDER BY sequence ASC")
      .all(id) as ActionRow[];
    return {
      id: row.id,
      name: row.name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      status: row.status as ExperimentDTO["status"],
      actions: actionRows.map(rowToAction),
    };
  }

  list(limit = 20, offset = 0): { items: ExperimentDTO[]; total: number } {
    const rows = this.db
      .prepare("SELECT * FROM experiments ORDER BY updated_at DESC LIMIT ? OFFSET ?")
      .all(limit, offset) as ExperimentRow[];
    const total = (this.db.prepare("SELECT COUNT(*) as n FROM experiments").get() as { n: number }).n;
    return {
      items: rows.map((row) => this.getById(row.id)!).filter(Boolean),
      total,
    };
  }

  appendAction(
    experimentId: string,
    actionType: ExperimentActionType,
    payload: Record<string, unknown>,
    result?: Record<string, unknown>
  ): ExperimentActionDTO {
    const experiment = this.db.prepare("SELECT * FROM experiments WHERE id = ?").get(experimentId) as ExperimentRow | undefined;
    if (!experiment) {
      throw new Error(`Experiment "${experimentId}" not found`);
    }
    const nextSeq =
      ((this.db.prepare("SELECT MAX(sequence) as maxSeq FROM experiment_actions WHERE experiment_id = ?").get(experimentId) as {
        maxSeq: number | null;
      }).maxSeq ?? 0) + 1;
    const now = new Date().toISOString();

    const info = this.db
      .prepare(
        "INSERT INTO experiment_actions (experiment_id, sequence, action_type, payload_json, result_json, created_at) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .run(experimentId, nextSeq, actionType, JSON.stringify(payload), result ? JSON.stringify(result) : null, now);

    this.db.prepare("UPDATE experiments SET updated_at = ? WHERE id = ?").run(now, experimentId);

    return {
      id: Number(info.lastInsertRowid),
      sequence: nextSeq,
      actionType,
      payload,
      result,
      createdAt: now,
    };
  }

  reset(experimentId: string): void {
    const now = new Date().toISOString();
    const tx = this.db.transaction(() => {
      this.db.prepare("DELETE FROM experiment_actions WHERE experiment_id = ?").run(experimentId);
      this.db.prepare("UPDATE experiments SET updated_at = ?, status = 'in_progress' WHERE id = ?").run(now, experimentId);
    });
    tx();
  }
}
