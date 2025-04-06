/*
  Warnings:

  - Added the required column `password` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Job" ("company", "createdAt", "id", "link", "position") SELECT "company", "createdAt", "id", "link", "position" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
