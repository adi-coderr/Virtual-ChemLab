-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reactantKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "equation" TEXT NOT NULL,
    "netIonicEquation" TEXT,
    "reactionType" TEXT NOT NULL,
    "reactants" JSONB NOT NULL,
    "products" JSONB NOT NULL,
    "conditions" JSONB NOT NULL,
    "observations" JSONB NOT NULL,
    "hazards" JSONB NOT NULL,
    "source" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    "confidenceScore" REAL NOT NULL DEFAULT 0.99,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_reactantKey_key" ON "Reaction"("reactantKey");

-- CreateIndex
CREATE INDEX "Reaction_reactantKey_idx" ON "Reaction"("reactantKey");
