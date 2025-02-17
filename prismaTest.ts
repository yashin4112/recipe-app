import { PrismaClient, UserType } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateData() {
  try {
    const users = await prisma.user.findMany();

    // Update each user with the userType field
    for (const user of users) {
      if (user.email) {
        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            userType: user.email.includes('@admin.com') ? UserType.EDITOR : UserType.VIEWER, // Use Prisma Enum values
          },
        });
        console.log(`Updated user: ${updatedUser.email}`);
      }
    }

    console.log('Migration completed.');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateData();
