/* "use server"

const {
  PrismaClient
} = require("@prisma/client");

const globalForPrisma = global as unknown as { prisma: typeof PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV != "production") globalForPrisma.prisma;


async function deleteUsers() {
  try {
    await prisma.user.deleteMany()
  } catch (error) {
    console.error('Failed to delete users:', error);
  }
}


async function main() {
  await deleteUsers();
}

main().catch((err) => {
  console.error(
    'An error occurred',
    err,
  );
}); */