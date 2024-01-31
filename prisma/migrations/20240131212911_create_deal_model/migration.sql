-- CreateTable
CREATE TABLE "deals" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "talking_to" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "responsible_id" TEXT NOT NULL,

    CONSTRAINT "deals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "deals" ADD CONSTRAINT "deals_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
