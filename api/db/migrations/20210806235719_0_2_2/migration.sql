-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "application" TEXT NOT NULL,
    "namespace" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permission.application_namespace_object_relation_unique" ON "Permission"("application", "namespace", "object", "relation");
