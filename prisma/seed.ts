import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';
import { PrismaClient } from '../generated/prisma/client';

const adminEmail = 'admin@example.com';
const adminPassword = 'admin';

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is required');
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const user = await prisma.user.upsert({
      where: {
        email: adminEmail,
      },
      update: {
        passwordHash,
        role: 'ADMIN',
      },
      create: {
        email: adminEmail,
        passwordHash,
        role: 'ADMIN',
      },
    });

    console.log(`Seed user read: ${user.email}`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

void main();
