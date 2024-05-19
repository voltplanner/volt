-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "files";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "notifications";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "tasks";

-- CreateEnum
CREATE TYPE "auth"."AuthUserStatusEnum" AS ENUM ('WAITING_COMPLETE', 'ACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "notifications"."NotificationTypeEnum" AS ENUM ('EMAIL', 'WEB', 'TELEGRAM');

-- CreateTable
CREATE TABLE "auth"."AuthUser" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT,
    "completeCode" TEXT,
    "roleId" UUID NOT NULL,
    "status" "auth"."AuthUserStatusEnum" NOT NULL DEFAULT 'WAITING_COMPLETE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AuthUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."AuthRefreshToken" (
    "id" UUID NOT NULL,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "AuthRefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."AuthRole" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "superuser" BOOLEAN NOT NULL,
    "editable" BOOLEAN NOT NULL,

    CONSTRAINT "AuthRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."AuthRolePermission" (
    "roleId" UUID NOT NULL,
    "methodId" UUID NOT NULL,
    "allowed" BOOLEAN NOT NULL,
    "editable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AuthRolePermission_pkey" PRIMARY KEY ("roleId","methodId")
);

-- CreateTable
CREATE TABLE "auth"."AuthMethod" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "group" TEXT NOT NULL,

    CONSTRAINT "AuthMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."AuthSettings" (
    "id" INTEGER NOT NULL,
    "defaultRolesInitialized" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AuthSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications"."NotificationPreferences" (
    "id" UUID NOT NULL,
    "externalUserId" UUID NOT NULL,
    "emailEnabled" BOOLEAN NOT NULL,
    "email" TEXT,
    "webEnabled" BOOLEAN NOT NULL,
    "telegramEnabled" BOOLEAN NOT NULL,
    "telegramAccount" INTEGER,

    CONSTRAINT "NotificationPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications"."Notification" (
    "id" UUID NOT NULL,
    "topic" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "type" "notifications"."NotificationTypeEnum" NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "sentAt" TIMESTAMP(3),
    "error" TEXT,
    "preferencesId" UUID,
    "seen" BOOLEAN NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files"."File" (
    "id" UUID NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "eTag" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_user" (
    "id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_user_role" (
    "id" UUID NOT NULL,
    "code" VARCHAR(36) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "position" SMALLINT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "project_id" UUID NOT NULL,

    CONSTRAINT "task_user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_project" (
    "id" UUID NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP(6),
    "budget" INTEGER,
    "version" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "fulltext" TEXT,

    CONSTRAINT "task_project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_project_on_user" (
    "project_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "PK__PROJECT_ON_USER" PRIMARY KEY ("project_id","user_id")
);

-- CreateTable
CREATE TABLE "tasks"."task" (
    "id" UUID NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "number" SERIAL NOT NULL,
    "created_by_id" UUID NOT NULL,
    "description" TEXT,
    "version" INTEGER NOT NULL,
    "estimated_date_start" TIMESTAMP(6),
    "estimated_date_end" TIMESTAMP(6),
    "estimated_duration" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "project_id" UUID NOT NULL,
    "status_id" UUID NOT NULL,
    "assigned_to_id" UUID,
    "parent_id" UUID,
    "lft" INTEGER NOT NULL,
    "rgt" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_status" (
    "id" UUID NOT NULL,
    "code" VARCHAR(36) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "position" SMALLINT NOT NULL,
    "description" TEXT,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "project_id" UUID NOT NULL,

    CONSTRAINT "task_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_effort" (
    "id" UUID NOT NULL,
    "value" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "task_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "task_effort_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_tag" (
    "id" UUID NOT NULL,
    "code" VARCHAR(36) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "position" SMALLINT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "project_id" UUID NOT NULL,

    CONSTRAINT "task_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_on_task_tag" (
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "task_id" UUID NOT NULL,
    "task_tag_id" UUID NOT NULL,

    CONSTRAINT "PK__TASK_ON_TASK_TAG" PRIMARY KEY ("task_id","task_tag_id")
);

-- CreateTable
CREATE TABLE "tasks"."task_attachment" (
    "id" UUID NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "description" TEXT,
    "size_kb" INTEGER NOT NULL,
    "externalId" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "task_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "task_attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_comment" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "task_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "task_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_change" (
    "id" UUID NOT NULL,
    "property_name" VARCHAR(64) NOT NULL,
    "value_new" TEXT,
    "value_old" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "task_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "task_change_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_on_task_relation" (
    "task_main_id" UUID NOT NULL,
    "task_foreign_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "task_relation_id" UUID NOT NULL,

    CONSTRAINT "PK__TASK_RELATION" PRIMARY KEY ("task_main_id","task_foreign_id")
);

-- CreateTable
CREATE TABLE "tasks"."task_relation" (
    "id" UUID NOT NULL,
    "code" VARCHAR(36) NOT NULL,
    "name_main" VARCHAR(64) NOT NULL,
    "name_foreign" VARCHAR(64) NOT NULL,
    "position" SMALLINT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "project_id" UUID NOT NULL,

    CONSTRAINT "task_relation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_custom_field" (
    "id" UUID NOT NULL,
    "value" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "task_custom_field_type_id" UUID NOT NULL,
    "task_type_id" UUID NOT NULL,

    CONSTRAINT "task_custom_field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_custom_field_type" (
    "id" UUID NOT NULL,
    "code" VARCHAR(36) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "position" SMALLINT NOT NULL,
    "is_editable" BOOLEAN NOT NULL DEFAULT true,
    "is_required" BOOLEAN DEFAULT false,
    "is_searchable" BOOLEAN DEFAULT false,
    "is_filterable" BOOLEAN DEFAULT false,
    "possible_values" TEXT,
    "default_value" TEXT,
    "regexp" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "value_type_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,

    CONSTRAINT "task_custom_field_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks"."task_custom_field_value_type" (
    "id" UUID NOT NULL,
    "code" VARCHAR(36) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "position" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "task_custom_field_value_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthUser_email_key" ON "auth"."AuthUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AuthRole_name_key" ON "auth"."AuthRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AuthMethod_name_key" ON "auth"."AuthMethod"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationPreferences_externalUserId_key" ON "notifications"."NotificationPreferences"("externalUserId");

-- CreateIndex
CREATE UNIQUE INDEX "task_user_role_code_project_id_is_deleted_key" ON "tasks"."task_user_role"("code", "project_id", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_status_code_project_id_is_deleted_key" ON "tasks"."task_status"("code", "project_id", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_status_position_project_id_is_deleted_key" ON "tasks"."task_status"("position", "project_id", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_tag_code_project_id_is_deleted_key" ON "tasks"."task_tag"("code", "project_id", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_tag_position_project_id_is_deleted_key" ON "tasks"."task_tag"("position", "project_id", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_relation_code_project_id_is_deleted_key" ON "tasks"."task_relation"("code", "project_id", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_relation_position_project_id_is_deleted_key" ON "tasks"."task_relation"("position", "project_id", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_custom_field_type_code_key" ON "tasks"."task_custom_field_type"("code");

-- CreateIndex
CREATE UNIQUE INDEX "task_custom_field_type_code_is_deleted_key" ON "tasks"."task_custom_field_type"("code", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_custom_field_type_position_is_deleted_key" ON "tasks"."task_custom_field_type"("position", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_custom_field_value_type_code_key" ON "tasks"."task_custom_field_value_type"("code");

-- CreateIndex
CREATE UNIQUE INDEX "task_custom_field_value_type_code_is_deleted_key" ON "tasks"."task_custom_field_value_type"("code", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_custom_field_value_type_position_is_deleted_key" ON "tasks"."task_custom_field_value_type"("position", "is_deleted");

-- AddForeignKey
ALTER TABLE "auth"."AuthUser" ADD CONSTRAINT "AuthUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "auth"."AuthRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."AuthRefreshToken" ADD CONSTRAINT "AuthRefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."AuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."AuthRolePermission" ADD CONSTRAINT "AuthRolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "auth"."AuthRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."AuthRolePermission" ADD CONSTRAINT "AuthRolePermission_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "auth"."AuthMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications"."Notification" ADD CONSTRAINT "Notification_preferencesId_fkey" FOREIGN KEY ("preferencesId") REFERENCES "notifications"."NotificationPreferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_user" ADD CONSTRAINT "FK__USER__ROLE" FOREIGN KEY ("role_id") REFERENCES "tasks"."task_user_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_user_role" ADD CONSTRAINT "FK__TASK_USER_ROLE__PROJECT" FOREIGN KEY ("project_id") REFERENCES "tasks"."task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_project_on_user" ADD CONSTRAINT "FK__PROJECT_ON_USER__PROJECT" FOREIGN KEY ("project_id") REFERENCES "tasks"."task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_project_on_user" ADD CONSTRAINT "FK__PROJECT_ON_USER__USER" FOREIGN KEY ("user_id") REFERENCES "tasks"."task_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task" ADD CONSTRAINT "FK__TASK__PROJECT" FOREIGN KEY ("project_id") REFERENCES "tasks"."task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task" ADD CONSTRAINT "FK__TASK__STATUS" FOREIGN KEY ("status_id") REFERENCES "tasks"."task_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task" ADD CONSTRAINT "FK__TASK__ASSIGNED_TO" FOREIGN KEY ("assigned_to_id") REFERENCES "tasks"."task_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task" ADD CONSTRAINT "task_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "tasks"."task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_status" ADD CONSTRAINT "FK__TASK_STATUS__PROJECT" FOREIGN KEY ("project_id") REFERENCES "tasks"."task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_effort" ADD CONSTRAINT "FK__TASK_EFFORT__TASK" FOREIGN KEY ("task_id") REFERENCES "tasks"."task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_effort" ADD CONSTRAINT "FK__TASK_EFFORT__USER" FOREIGN KEY ("user_id") REFERENCES "tasks"."task_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_tag" ADD CONSTRAINT "FK__TASK_TAG__PROJECT" FOREIGN KEY ("project_id") REFERENCES "tasks"."task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_on_task_tag" ADD CONSTRAINT "FK__TASK_ON_TASK_TAG__TASK" FOREIGN KEY ("task_id") REFERENCES "tasks"."task"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_on_task_tag" ADD CONSTRAINT "FK__TASK_ON_TASK_TAG__TASK_TAG" FOREIGN KEY ("task_tag_id") REFERENCES "tasks"."task_tag"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_attachment" ADD CONSTRAINT "FK__TASK_ATTACHMENT__TASK" FOREIGN KEY ("task_id") REFERENCES "tasks"."task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_attachment" ADD CONSTRAINT "FK__TASK_ATTACHMENT__USER" FOREIGN KEY ("user_id") REFERENCES "tasks"."task_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_comment" ADD CONSTRAINT "FK__TASK_COMMENT__TASK" FOREIGN KEY ("task_id") REFERENCES "tasks"."task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_comment" ADD CONSTRAINT "FK__TASK_COMMENT__USER" FOREIGN KEY ("user_id") REFERENCES "tasks"."task_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_change" ADD CONSTRAINT "FK__TASK_CHANGE__TASK" FOREIGN KEY ("task_id") REFERENCES "tasks"."task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_change" ADD CONSTRAINT "FK__TASK_CHANGE__USER" FOREIGN KEY ("user_id") REFERENCES "tasks"."task_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_on_task_relation" ADD CONSTRAINT "FK__TASK_RELATION__TASK_RELATION_TYPE" FOREIGN KEY ("task_relation_id") REFERENCES "tasks"."task_relation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_on_task_relation" ADD CONSTRAINT "task_on_task_relation_task_foreign_id_fkey" FOREIGN KEY ("task_foreign_id") REFERENCES "tasks"."task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_on_task_relation" ADD CONSTRAINT "task_on_task_relation_task_main_id_fkey" FOREIGN KEY ("task_main_id") REFERENCES "tasks"."task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_relation" ADD CONSTRAINT "FK__TASK_RELATION_TYPE__PROJECT" FOREIGN KEY ("project_id") REFERENCES "tasks"."task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_custom_field" ADD CONSTRAINT "FK__TASK_CUSTOM_FIELD__TASK_CUSTOM_FIELD_TYPE" FOREIGN KEY ("task_custom_field_type_id") REFERENCES "tasks"."task_custom_field_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_custom_field" ADD CONSTRAINT "FK__TASK_CUSTOM_FIELD__TASK" FOREIGN KEY ("task_type_id") REFERENCES "tasks"."task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_custom_field_type" ADD CONSTRAINT "FK__TASK_CUSTOM_FIELD_TYPE__VALUE_TYPE" FOREIGN KEY ("value_type_id") REFERENCES "tasks"."task_custom_field_value_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks"."task_custom_field_type" ADD CONSTRAINT "FK__TASK_CUSTOM_FIELD_TYPE__PROJECT" FOREIGN KEY ("project_id") REFERENCES "tasks"."task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
