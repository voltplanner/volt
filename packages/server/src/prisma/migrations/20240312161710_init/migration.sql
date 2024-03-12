-- CreateEnum
CREATE TYPE "auth_user_status_enum" AS ENUM ('WAITING_COMPLETE', 'ACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "notification_type_enum" AS ENUM ('EMAIL', 'WEB', 'TELEGRAM');

-- CreateTable
CREATE TABLE "auth_user" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT,
    "completeCode" TEXT,
    "roleId" UUID NOT NULL,
    "status" "auth_user_status_enum" NOT NULL DEFAULT 'WAITING_COMPLETE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "auth_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_refresh_token" (
    "id" UUID NOT NULL,
    "is_revoked" BOOLEAN NOT NULL DEFAULT false,
    "expires_at" TIMESTAMP(6) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "auth_refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_role" (
    "id" UUID NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "superuser" BOOLEAN NOT NULL,
    "editable" BOOLEAN NOT NULL,

    CONSTRAINT "auth_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_role_permission" (
    "role_id" UUID NOT NULL,
    "method_id" UUID NOT NULL,
    "allowed" BOOLEAN NOT NULL,
    "editable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "auth_role_permission_pkey" PRIMARY KEY ("role_id","method_id")
);

-- CreateTable
CREATE TABLE "auth_method" (
    "id" UUID NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "description" TEXT NOT NULL,
    "group" VARCHAR NOT NULL,

    CONSTRAINT "auth_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_settings" (
    "id" INTEGER NOT NULL,
    "defaultRolesInitialized" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "auth_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_settings" (
    "id" UUID NOT NULL,

    CONSTRAINT "system_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationPreferences" (
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
CREATE TABLE "Notification" (
    "id" UUID NOT NULL,
    "topic" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "type" "notification_type_enum" NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "sentAt" TIMESTAMP(3),
    "error" TEXT,
    "preferencesId" UUID,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_user" (
    "id" UUID NOT NULL,
    "externalId" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "task_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_project" (
    "id" UUID NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "description" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "status_id" UUID NOT NULL,
    "created_by_id" UUID NOT NULL,

    CONSTRAINT "task_project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_project_status" (
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

    CONSTRAINT "task_project_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_project_on_user" (
    "project_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "PK__PROJECT_ON_USER" PRIMARY KEY ("project_id","user_id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" UUID NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "number" SERIAL NOT NULL,
    "description" TEXT,
    "estimated_date_start" TIMESTAMP(6),
    "estimated_date_end" TIMESTAMP(6),
    "estimated_duration" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "project_id" UUID NOT NULL,
    "type_id" UUID NOT NULL,
    "status_id" UUID NOT NULL,
    "created_by_id" UUID NOT NULL,
    "assigned_to_id" UUID,
    "parent_id" UUID,
    "lft" INTEGER NOT NULL,
    "rgt" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_type" (
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

    CONSTRAINT "task_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_status" (
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

    CONSTRAINT "task_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_effort" (
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
CREATE TABLE "task_tag" (
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
CREATE TABLE "task_on_task_tag" (
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "task_id" UUID NOT NULL,
    "task_tag_id" UUID NOT NULL,

    CONSTRAINT "PK__TASK_ON_TASK_TAG" PRIMARY KEY ("task_id","task_tag_id")
);

-- CreateTable
CREATE TABLE "task_attachment" (
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
CREATE TABLE "task_comment" (
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
CREATE TABLE "task_change" (
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
CREATE TABLE "task_on_task_relation" (
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
CREATE TABLE "task_relation" (
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
CREATE TABLE "task_custom_field" (
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
CREATE TABLE "task_custom_field_type" (
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
CREATE TABLE "task_custom_field_value_type" (
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
CREATE UNIQUE INDEX "auth_user_email_key" ON "auth_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "auth_role_name_key" ON "auth_role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "auth_method_name_key" ON "auth_method"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationPreferences_externalUserId_key" ON "NotificationPreferences"("externalUserId");

-- CreateIndex
CREATE UNIQUE INDEX "task_user_externalId_is_deleted_key" ON "task_user"("externalId", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_project_status_code_key" ON "task_project_status"("code");

-- CreateIndex
CREATE UNIQUE INDEX "task_project_status_code_is_deleted_key" ON "task_project_status"("code", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_project_status_position_is_deleted_key" ON "task_project_status"("position", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_type_code_key" ON "task_type"("code");

-- CreateIndex
CREATE UNIQUE INDEX "task_type_code_is_deleted_key" ON "task_type"("code", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_type_position_is_deleted_key" ON "task_type"("position", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_status_code_key" ON "task_status"("code");

-- CreateIndex
CREATE UNIQUE INDEX "task_status_code_is_deleted_key" ON "task_status"("code", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_status_position_is_deleted_key" ON "task_status"("position", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_tag_code_key" ON "task_tag"("code");

-- CreateIndex
CREATE UNIQUE INDEX "task_tag_code_is_deleted_key" ON "task_tag"("code", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_tag_position_is_deleted_key" ON "task_tag"("position", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_relation_code_key" ON "task_relation"("code");

-- CreateIndex
CREATE UNIQUE INDEX "task_relation_code_is_deleted_key" ON "task_relation"("code", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_relation_position_is_deleted_key" ON "task_relation"("position", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_custom_field_type_code_key" ON "task_custom_field_type"("code");

-- CreateIndex
CREATE UNIQUE INDEX "task_custom_field_type_code_is_deleted_key" ON "task_custom_field_type"("code", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_custom_field_type_position_is_deleted_key" ON "task_custom_field_type"("position", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_custom_field_value_type_code_key" ON "task_custom_field_value_type"("code");

-- CreateIndex
CREATE UNIQUE INDEX "task_custom_field_value_type_code_is_deleted_key" ON "task_custom_field_value_type"("code", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "task_custom_field_value_type_position_is_deleted_key" ON "task_custom_field_value_type"("position", "is_deleted");

-- AddForeignKey
ALTER TABLE "auth_user" ADD CONSTRAINT "auth_user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "auth_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_refresh_token" ADD CONSTRAINT "FK__AUTH_REFRESH_TOKEN__USER" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_role_permission" ADD CONSTRAINT "FK__AUTH_ROLE_PERMISSION__METHOD" FOREIGN KEY ("method_id") REFERENCES "auth_method"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_role_permission" ADD CONSTRAINT "FK__AUTH_ROLE_PERMISSION__ROLE" FOREIGN KEY ("role_id") REFERENCES "auth_role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_preferencesId_fkey" FOREIGN KEY ("preferencesId") REFERENCES "NotificationPreferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_project" ADD CONSTRAINT "FK__PROJECT__CREATED_BY" FOREIGN KEY ("created_by_id") REFERENCES "task_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_project" ADD CONSTRAINT "FK__PROJECT__STATUS" FOREIGN KEY ("status_id") REFERENCES "task_project_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_project_on_user" ADD CONSTRAINT "FK__PROJECT_ON_USER__PROJECT" FOREIGN KEY ("project_id") REFERENCES "task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_project_on_user" ADD CONSTRAINT "FK__PROJECT_ON_USER__USER" FOREIGN KEY ("user_id") REFERENCES "task_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "FK__TASK__PROJECT" FOREIGN KEY ("project_id") REFERENCES "task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "FK__TASK__TYPE" FOREIGN KEY ("type_id") REFERENCES "task_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "FK__TASK__STATUS" FOREIGN KEY ("status_id") REFERENCES "task_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "FK__TASK__CREATED_BY" FOREIGN KEY ("created_by_id") REFERENCES "task_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "FK__TASK__ASSIGNED_TO" FOREIGN KEY ("assigned_to_id") REFERENCES "task_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_type" ADD CONSTRAINT "FK__TASK_TYPE__PROJECT" FOREIGN KEY ("project_id") REFERENCES "task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_status" ADD CONSTRAINT "FK__TASK_STATUS__PROJECT" FOREIGN KEY ("project_id") REFERENCES "task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_effort" ADD CONSTRAINT "FK__TASK_EFFORT__TASK" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_effort" ADD CONSTRAINT "FK__TASK_EFFORT__USER" FOREIGN KEY ("user_id") REFERENCES "task_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_tag" ADD CONSTRAINT "FK__TASK_TAG__PROJECT" FOREIGN KEY ("project_id") REFERENCES "task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_on_task_tag" ADD CONSTRAINT "FK__TASK_ON_TASK_TAG__TASK" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_on_task_tag" ADD CONSTRAINT "FK__TASK_ON_TASK_TAG__TASK_TAG" FOREIGN KEY ("task_tag_id") REFERENCES "task_tag"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_attachment" ADD CONSTRAINT "FK__TASK_ATTACHMENT__TASK" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_attachment" ADD CONSTRAINT "FK__TASK_ATTACHMENT__USER" FOREIGN KEY ("user_id") REFERENCES "task_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_comment" ADD CONSTRAINT "FK__TASK_COMMENT__TASK" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_comment" ADD CONSTRAINT "FK__TASK_COMMENT__USER" FOREIGN KEY ("user_id") REFERENCES "task_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_change" ADD CONSTRAINT "FK__TASK_CHANGE__TASK" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_change" ADD CONSTRAINT "FK__TASK_CHANGE__USER" FOREIGN KEY ("user_id") REFERENCES "task_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_on_task_relation" ADD CONSTRAINT "FK__TASK_RELATION__TASK_RELATION_TYPE" FOREIGN KEY ("task_relation_id") REFERENCES "task_relation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_on_task_relation" ADD CONSTRAINT "task_on_task_relation_task_foreign_id_fkey" FOREIGN KEY ("task_foreign_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_on_task_relation" ADD CONSTRAINT "task_on_task_relation_task_main_id_fkey" FOREIGN KEY ("task_main_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_relation" ADD CONSTRAINT "FK__TASK_RELATION_TYPE__PROJECT" FOREIGN KEY ("project_id") REFERENCES "task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_custom_field" ADD CONSTRAINT "FK__TASK_CUSTOM_FIELD__TASK_CUSTOM_FIELD_TYPE" FOREIGN KEY ("task_custom_field_type_id") REFERENCES "task_custom_field_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_custom_field" ADD CONSTRAINT "FK__TASK_CUSTOM_FIELD__TASK" FOREIGN KEY ("task_type_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_custom_field_type" ADD CONSTRAINT "FK__TASK_CUSTOM_FIELD_TYPE__VALUE_TYPE" FOREIGN KEY ("value_type_id") REFERENCES "task_custom_field_value_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_custom_field_type" ADD CONSTRAINT "FK__TASK_CUSTOM_FIELD_TYPE__PROJECT" FOREIGN KEY ("project_id") REFERENCES "task_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
