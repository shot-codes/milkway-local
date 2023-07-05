/*
  Warnings:

  - Added the required column `content` to the `Moon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Moon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Moon" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
