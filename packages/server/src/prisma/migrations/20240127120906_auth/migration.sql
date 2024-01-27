CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('MEMBER', 'ADMIN', 'OWNER');

-- CreateTable
CREATE TABLE "AuthUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleEnum" NOT NULL DEFAULT 'MEMBER',
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

-- CreateIndex
CREATE UNIQUE INDEX "AuthUser_email_key" ON "AuthUser"("email");

-- AddForeignKey
ALTER TABLE "AuthRefreshToken" ADD CONSTRAINT "AuthRefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
