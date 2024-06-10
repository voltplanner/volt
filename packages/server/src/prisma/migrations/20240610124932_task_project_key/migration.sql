/*
  Warnings:

  - Added the required column `key` to the `task_project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks"."task_project" ADD COLUMN     "key" VARCHAR(6) NOT NULL;
