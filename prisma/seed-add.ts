import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DIRECT_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Adding new enrollment...')
  
  try {
    await prisma.enrollment.create({
      data: {
        email: 'pwells@usi.edu',
        parentName: 'Montez & Phoneshia Wells',
        phone: '4344292944',
        address: '1707 Balsam Gap Tyler, Texas 75703',
        package: 'Plan A - AutoPay',
        amount: 50,
        status: 'active',
        enrolledDate: new Date('2026-02-03'),
        lastPayment: new Date('2026-02-03'),
        isNew: true,
        children: {
          create: [{
            name: 'Amir Wells',
            age: 3,
            birthday: '11/10/2022',
            sex: 'Male',
            school: 'Early Steps Bilingual Academy',
            classroom: 'Ms. Yuvi',
            shirtSize: '3T',
            gummyBears: true,
            allergies: null
          }]
        }
      }
    })
    console.log('✓ Added Amir Wells enrollment')
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('Already exists, skipping...')
    } else {
      throw error
    }
  }
  
  const count = await prisma.enrollment.count()
  console.log(`Total enrollments: ${count}`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect(); await pool.end() })
