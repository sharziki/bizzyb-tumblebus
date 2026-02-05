-- AlterTable
ALTER TABLE "children" ADD COLUMN     "allergies" TEXT,
ADD COLUMN     "birthday" TEXT,
ADD COLUMN     "classroom" TEXT,
ADD COLUMN     "sex" TEXT;

-- AlterTable
ALTER TABLE "enrollments" ADD COLUMN     "address" TEXT,
ADD COLUMN     "consent" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "status" SET DEFAULT 'active',
ALTER COLUMN "isNew" SET DEFAULT false;
