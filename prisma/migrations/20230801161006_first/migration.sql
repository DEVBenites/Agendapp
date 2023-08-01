/*
  Warnings:

  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "phoneVerified" BOOLEAN DEFAULT false,
    "email" TEXT,
    "emailVerified" BOOLEAN DEFAULT false,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" DATETIME,
    "allowNotifications" BOOLEAN NOT NULL DEFAULT true,
    "lastNotificationAt" DATETIME,
    "acceptedTermsAt" DATETIME
);
INSERT INTO "new_users" ("acceptedTermsAt", "allowNotifications", "birthday", "email", "emailVerified", "id", "lastNotificationAt", "name", "phone", "phoneVerified") SELECT "acceptedTermsAt", "allowNotifications", "birthday", "email", "emailVerified", "id", "lastNotificationAt", "name", "phone", "phoneVerified" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
