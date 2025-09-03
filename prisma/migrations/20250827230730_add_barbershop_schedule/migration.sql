-- CreateTable
CREATE TABLE "public"."BarbershopSchedule" (
    "id" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "openTime" TEXT,
    "closeTime" TEXT,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "barbershopId" TEXT NOT NULL,

    CONSTRAINT "BarbershopSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."BarbershopSchedule" ADD CONSTRAINT "BarbershopSchedule_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "public"."Barbershop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
