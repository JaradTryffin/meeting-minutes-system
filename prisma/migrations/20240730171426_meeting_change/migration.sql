/*
  Warnings:

  - You are about to alter the column `meetingNumber` on the `Meeting` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `formattedId` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meeting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meetingNumber" INTEGER NOT NULL,
    "formattedId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "meetingTypeId" TEXT NOT NULL,
    "previousMeetingId" TEXT,
    "minutes" TEXT,
    CONSTRAINT "Meeting_meetingTypeId_fkey" FOREIGN KEY ("meetingTypeId") REFERENCES "MeetingType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Meeting_previousMeetingId_fkey" FOREIGN KEY ("previousMeetingId") REFERENCES "Meeting" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Meeting" ("date", "id", "meetingNumber", "meetingTypeId", "minutes", "previousMeetingId") SELECT "date", "id", "meetingNumber", "meetingTypeId", "minutes", "previousMeetingId" FROM "Meeting";
DROP TABLE "Meeting";
ALTER TABLE "new_Meeting" RENAME TO "Meeting";
CREATE UNIQUE INDEX "Meeting_formattedId_key" ON "Meeting"("formattedId");
CREATE UNIQUE INDEX "Meeting_previousMeetingId_key" ON "Meeting"("previousMeetingId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
