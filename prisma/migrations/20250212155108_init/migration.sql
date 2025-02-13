-- CreateTable
CREATE TABLE "featuresImages" (
    "id" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "featuresImages_pkey" PRIMARY KEY ("id")
);
