-- CreateTable
CREATE TABLE "Panel" (
    "id" TEXT NOT NULL,
    "productNo" TEXT NOT NULL,
    "serialNo" TEXT NOT NULL,
    "productType" TEXT,
    "palletNo" TEXT,
    "labelWatt" INTEGER,
    "pmax" DOUBLE PRECISION,
    "ff" DOUBLE PRECISION,
    "voc" DOUBLE PRECISION,
    "isc" DOUBLE PRECISION,
    "vpm" DOUBLE PRECISION,
    "ipm" DOUBLE PRECISION,
    "sourceFile" TEXT,
    "importedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Panel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Panel_productNo_key" ON "Panel"("productNo");

-- CreateIndex
CREATE INDEX "Panel_serialNo_idx" ON "Panel"("serialNo");
