-- CreateEnum
CREATE TYPE "AuthUserStatusEnum" AS ENUM ('WAITING_COMPLETE', 'ACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "NotificationTypeEnum" AS ENUM ('EMAIL', 'WEB');

-- CreateTable
CREATE TABLE "AuthUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT,
    "completeCode" TEXT,
    "roleId" TEXT NOT NULL,
    "status" "AuthUserStatusEnum" NOT NULL DEFAULT 'WAITING_COMPLETE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AuthUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthRefreshToken" (
    "id" TEXT NOT NULL,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AuthRefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "superuser" BOOLEAN NOT NULL,
    "editable" BOOLEAN NOT NULL,

    CONSTRAINT "AuthRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthRolePermission" (
    "roleId" TEXT NOT NULL,
    "methodId" TEXT NOT NULL,
    "allowed" BOOLEAN NOT NULL,
    "editable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AuthRolePermission_pkey" PRIMARY KEY ("roleId","methodId")
);

-- CreateTable
CREATE TABLE "AuthMethod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "group" TEXT NOT NULL,

    CONSTRAINT "AuthMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthSettings" (
    "id" INTEGER NOT NULL,
    "defaultRolesInitialized" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AuthSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemSettings" (
    "id" TEXT NOT NULL,

    CONSTRAINT "SystemSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "type" "NotificationTypeEnum" NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "sentAt" TIMESTAMP(3),
    "error" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthUser_email_key" ON "AuthUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AuthRole_name_key" ON "AuthRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AuthMethod_name_key" ON "AuthMethod"("name");

-- AddForeignKey
ALTER TABLE "AuthUser" ADD CONSTRAINT "AuthUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "AuthRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthRefreshToken" ADD CONSTRAINT "AuthRefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthRolePermission" ADD CONSTRAINT "AuthRolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "AuthRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthRolePermission" ADD CONSTRAINT "AuthRolePermission_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "AuthMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
