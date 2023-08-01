-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "phoneVerified" BOOLEAN DEFAULT false,
    "email" TEXT,
    "emailVerified" BOOLEAN DEFAULT false,
    "name" TEXT,
    "birthday" DATETIME,
    "allowNotifications" BOOLEAN NOT NULL DEFAULT true,
    "lastNotificationAt" DATETIME,
    "acceptedTermsAt" DATETIME
);
