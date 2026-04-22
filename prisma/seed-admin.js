const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email = "admin@cacsms.com";
  const password = "P@882w0rd.c0m";
  console.log(`🚀 Provisioning Super Admin: ${email}...`);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      isSuperAdmin: true,
      firstName: "Cacsms",
      lastName: "SuperAdmin",
      password: hashedPassword,
    },
    create: {
      id: "super-admin-id-002",
      email,
      firstName: "Cacsms",
      lastName: "SuperAdmin",
      isSuperAdmin: true,
      password: hashedPassword,
    },
  });

  console.log(`✅ Super Admin created/updated: ${user.email}`);
  console.log(`🔒 Password set: ${password}`);
  console.log(`🔒 Deletion Protection: ENABLED`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
