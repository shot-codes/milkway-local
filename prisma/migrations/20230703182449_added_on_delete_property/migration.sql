-- DropForeignKey
ALTER TABLE "Moon" DROP CONSTRAINT "Moon_planetId_fkey";

-- DropForeignKey
ALTER TABLE "Planet" DROP CONSTRAINT "Planet_systemId_fkey";

-- AddForeignKey
ALTER TABLE "Moon" ADD CONSTRAINT "Moon_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "Planet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planet" ADD CONSTRAINT "Planet_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System"("id") ON DELETE CASCADE ON UPDATE CASCADE;
