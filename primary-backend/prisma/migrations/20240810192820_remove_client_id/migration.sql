-- CreateTable
CREATE TABLE "ExternalApp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ExternalApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalAppUser" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "externalAppId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalAppUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExternalAppUser" ADD CONSTRAINT "ExternalAppUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalAppUser" ADD CONSTRAINT "ExternalAppUser_externalAppId_fkey" FOREIGN KEY ("externalAppId") REFERENCES "ExternalApp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
