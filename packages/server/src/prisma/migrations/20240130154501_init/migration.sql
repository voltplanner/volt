-- DropForeignKey
ALTER TABLE "AuthRolePermission" DROP CONSTRAINT "AuthRolePermission_methodId_fkey";

-- DropForeignKey
ALTER TABLE "AuthRolePermission" DROP CONSTRAINT "AuthRolePermission_roleId_fkey";

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

-- AddForeignKey
ALTER TABLE "AuthRolePermission" ADD CONSTRAINT "AuthRolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "AuthRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthRolePermission" ADD CONSTRAINT "AuthRolePermission_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "AuthMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;
