-- CreateTable
CREATE TABLE "MeetingType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meetingNumber" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "meetingTypeId" TEXT NOT NULL,
    "previousMeetingId" TEXT,
    "minutes" TEXT,
    CONSTRAINT "Meeting_meetingTypeId_fkey" FOREIGN KEY ("meetingTypeId") REFERENCES "MeetingType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Meeting_previousMeetingId_fkey" FOREIGN KEY ("previousMeetingId") REFERENCES "Meeting" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MeetingItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "dueDate" DATETIME,
    "completedDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MeetingItemStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "actionRequired" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "meetingItemId" TEXT NOT NULL,
    "responsiblePersonId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MeetingItemStatus_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeetingItemStatus_meetingItemId_fkey" FOREIGN KEY ("meetingItemId") REFERENCES "MeetingItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeetingItemStatus_responsiblePersonId_fkey" FOREIGN KEY ("responsiblePersonId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "StatusType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MeetingType_name_key" ON "MeetingType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_meetingNumber_key" ON "Meeting"("meetingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_previousMeetingId_key" ON "Meeting"("previousMeetingId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StatusType_name_key" ON "StatusType"("name");
