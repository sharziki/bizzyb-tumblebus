import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DIRECT_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const enrollments = [
  {
    email: 'sarah.johnson@email.com',
    parentName: 'Sarah Johnson',
    phone: '(903) 555-1234',
    package: '1 Child + Registration',
    amount: 70,
    status: 'active',
    enrolledDate: new Date('2026-02-01'),
    lastPayment: new Date('2026-02-01'),
    isNew: true,
    children: [
      { name: 'Emma Johnson', age: 5, school: 'Bright Start Daycare', shirtSize: 'Youth S', gummyBears: true },
    ],
  },
  {
    email: 'mike.thompson@email.com',
    parentName: 'Mike Thompson',
    phone: '(903) 555-5678',
    package: '2 Children + Registration',
    amount: 115,
    status: 'active',
    enrolledDate: new Date('2026-01-20'),
    lastPayment: new Date('2026-01-05'),
    isNew: false,
    children: [
      { name: 'Liam Thompson', age: 4, school: 'Little Stars Preschool', shirtSize: 'Youth XS', gummyBears: true },
      { name: 'Sophia Thompson', age: 7, school: 'Little Stars Preschool', shirtSize: 'Youth M', gummyBears: false },
    ],
  },
  {
    email: 'jenn.davis@email.com',
    parentName: 'Jennifer Davis',
    phone: '(903) 555-9012',
    package: '1 Child (Returning)',
    amount: 50,
    status: 'pending',
    enrolledDate: new Date('2026-02-04'),
    lastPayment: null,
    isNew: true,
    children: [
      { name: 'Oliver Davis', age: 6, school: 'Sunshine Academy', shirtSize: 'Youth S', gummyBears: false },
    ],
  },
  {
    email: 'amanda.wilson@email.com',
    parentName: 'Amanda Wilson',
    phone: '(903) 555-3456',
    package: '1 Child + Registration',
    amount: 70,
    status: 'active',
    enrolledDate: new Date('2026-02-03'),
    lastPayment: new Date('2026-02-03'),
    isNew: true,
    children: [
      { name: 'Ava Wilson', age: 3, school: 'Tiny Tots Daycare', shirtSize: 'Youth XS', gummyBears: true },
    ],
  },
  {
    email: 'robert.chen@email.com',
    parentName: 'Robert Chen',
    phone: '(903) 555-7890',
    package: '2 Children (Returning)',
    amount: 75,
    status: 'inactive',
    enrolledDate: new Date('2026-01-15'),
    lastPayment: new Date('2026-01-15'),
    isNew: false,
    children: [
      { name: 'Lily Chen', age: 5, school: 'Happy Kids Academy', shirtSize: 'Youth S', gummyBears: true },
      { name: 'Max Chen', age: 8, school: 'Happy Kids Academy', shirtSize: 'Youth M', gummyBears: true },
    ],
  },
]

async function main() {
  console.log('Seeding database...')
  
  // Clear existing data
  await prisma.child.deleteMany()
  await prisma.enrollment.deleteMany()
  
  // Create enrollments with children
  for (const enrollment of enrollments) {
    const { children, ...enrollmentData } = enrollment
    
    await prisma.enrollment.create({
      data: {
        ...enrollmentData,
        children: {
          create: children,
        },
      },
    })
    
    console.log(`Created enrollment for ${enrollment.parentName}`)
  }
  
  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
