-- DropForeignKey
ALTER TABLE "deals" DROP CONSTRAINT "deals_responsible_id_fkey";

-- AddForeignKey
ALTER TABLE "deals" ADD CONSTRAINT "deals_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
