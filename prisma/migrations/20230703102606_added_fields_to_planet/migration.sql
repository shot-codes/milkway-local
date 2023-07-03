/*
  Warnings:

  - Added the required column `color` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTitle` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Planet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Planet" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "subTitle" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
