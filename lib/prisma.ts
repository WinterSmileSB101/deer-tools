import * as Prisma from '@prisma/client';

declare global {
  var prisma: Prisma.PrismaClient;
}

const prisma = global.prisma || new Prisma.PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
