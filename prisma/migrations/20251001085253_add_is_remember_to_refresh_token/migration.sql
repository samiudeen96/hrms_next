/*
  Warnings:

  - You are about to drop the column `isRemember` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."RefreshToken" ADD COLUMN     "isRemember" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "isRemember";
