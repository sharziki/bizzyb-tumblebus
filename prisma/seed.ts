import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const dummyEnrollments = [
  {
    studentFirstName: 'Emma',
    studentLastName: 'Johnson',
    dateOfBirth: new Date('2016-03-15'),
    age: 8,
    parentFirstName: 'Sarah',
    parentLastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    address: '123 Oak Street',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
    emergencyContactName: 'Michael Johnson',
    emergencyContactPhone: '(555) 123-4568',
    emergencyRelation: 'Father',
    programType: 'Ballet',
    classLevel: 'Beginner',
    preferredSchedule: 'Saturday Morning',
    referralSource: 'Friend/Family',
    status: 'approved'
  },
  {
    studentFirstName: 'Sophia',
    studentLastName: 'Williams',
    dateOfBirth: new Date('2014-07-22'),
    age: 10,
    parentFirstName: 'Jennifer',
    parentLastName: 'Williams',
    email: 'jwilliams@email.com',
    phone: '(555) 234-5678',
    address: '456 Maple Avenue',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62702',
    emergencyContactName: 'Robert Williams',
    emergencyContactPhone: '(555) 234-5679',
    emergencyRelation: 'Father',
    programType: 'Jazz',
    classLevel: 'Intermediate',
    preferredSchedule: 'Weekday Evening',
    referralSource: 'Social Media',
    status: 'approved'
  },
  {
    studentFirstName: 'Olivia',
    studentLastName: 'Brown',
    dateOfBirth: new Date('2017-11-08'),
    age: 7,
    parentFirstName: 'Amanda',
    parentLastName: 'Brown',
    email: 'amanda.brown@email.com',
    phone: '(555) 345-6789',
    address: '789 Pine Road',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62703',
    programType: 'Combo Class',
    classLevel: 'Beginner',
    preferredSchedule: 'Saturday Afternoon',
    referralSource: 'Recital/Performance',
    status: 'approved'
  },
  {
    studentFirstName: 'Ava',
    studentLastName: 'Davis',
    dateOfBirth: new Date('2015-05-30'),
    age: 9,
    parentFirstName: 'Michelle',
    parentLastName: 'Davis',
    email: 'michelle.davis@email.com',
    phone: '(555) 456-7890',
    address: '321 Elm Street',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    programType: 'Hip Hop',
    classLevel: 'Beginner',
    preferredSchedule: 'Weekday Afternoon',
    referralSource: 'Google Search',
    status: 'approved'
  },
  {
    studentFirstName: 'Isabella',
    studentLastName: 'Martinez',
    dateOfBirth: new Date('2013-09-12'),
    age: 11,
    parentFirstName: 'Maria',
    parentLastName: 'Martinez',
    email: 'maria.martinez@email.com',
    phone: '(555) 567-8901',
    address: '654 Cedar Lane',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62705',
    programType: 'Contemporary',
    classLevel: 'Advanced',
    preferredSchedule: 'Weekday Evening',
    referralSource: 'Friend/Family',
    status: 'approved'
  },
  // Add some more recent pending ones
  {
    studentFirstName: 'Courtni',
    studentLastName: 'Thompson',
    dateOfBirth: new Date('2015-02-14'),
    age: 9,
    parentFirstName: 'Lisa',
    parentLastName: 'Thompson',
    email: 'lisa.thompson@email.com',
    phone: '(555) 678-9012',
    address: '987 Birch Street',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62706',
    programType: 'Ballet',
    classLevel: 'Intermediate',
    preferredSchedule: 'Saturday Morning',
    referralSource: 'School',
    status: 'pending',
    notes: 'Interested in competition team for next year'
  },
  {
    studentFirstName: 'CJ',
    studentLastName: 'Anderson',
    dateOfBirth: new Date('2016-08-25'),
    age: 8,
    parentFirstName: 'Chris',
    parentLastName: 'Anderson',
    email: 'chris.anderson@email.com',
    phone: '(555) 789-0123',
    address: '159 Walnut Drive',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62707',
    programType: 'Hip Hop',
    classLevel: 'Beginner',
    preferredSchedule: 'Weekday Afternoon',
    referralSource: 'Friend/Family',
    status: 'pending'
  },
  // More historical data
  {
    studentFirstName: 'Mia',
    studentLastName: 'Garcia',
    dateOfBirth: new Date('2014-04-03'),
    age: 10,
    parentFirstName: 'Rosa',
    parentLastName: 'Garcia',
    email: 'rosa.garcia@email.com',
    phone: '(555) 890-1234',
    programType: 'Lyrical',
    classLevel: 'Intermediate',
    preferredSchedule: 'Weekday Evening',
    status: 'approved'
  },
  {
    studentFirstName: 'Charlotte',
    studentLastName: 'Lee',
    dateOfBirth: new Date('2012-12-01'),
    age: 12,
    parentFirstName: 'Susan',
    parentLastName: 'Lee',
    email: 'susan.lee@email.com',
    phone: '(555) 901-2345',
    programType: 'Competition Team',
    classLevel: 'Advanced',
    preferredSchedule: 'Weekday Evening',
    status: 'approved'
  },
  {
    studentFirstName: 'Amelia',
    studentLastName: 'White',
    dateOfBirth: new Date('2017-06-18'),
    age: 7,
    parentFirstName: 'Karen',
    parentLastName: 'White',
    email: 'karen.white@email.com',
    phone: '(555) 012-3456',
    programType: 'Tap',
    classLevel: 'Beginner',
    preferredSchedule: 'Saturday Morning',
    status: 'waitlist',
    notes: 'Saturday morning classes are full - on waitlist'
  }
]

async function main() {
  console.log('🌱 Seeding database...')
  
  // Clear existing data
  await prisma.enrollment.deleteMany()
  
  // Create enrollments with dates spread over time
  for (let i = 0; i < dummyEnrollments.length; i++) {
    const enrollment = dummyEnrollments[i]
    const daysAgo = (dummyEnrollments.length - i) * 3 // Spread entries over time
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - daysAgo)
    
    await prisma.enrollment.create({
      data: {
        ...enrollment,
        createdAt
      }
    })
  }
  
  console.log(`✅ Created ${dummyEnrollments.length} enrollments`)
  
  // Create admin user
  const bcrypt = require('bcryptjs')
  const passwordHash = await bcrypt.hash('admin123', 10)
  
  await prisma.tumblebusAdmin.upsert({
    where: { email: 'admin@bizzybtumblebus.com' },
    update: {},
    create: {
      email: 'admin@bizzybtumblebus.com',
      passwordHash,
      name: 'Tumblebus Admin'
    }
  })
  
  console.log('✅ Admin user created (admin@bizzybtumblebus.com / admin123)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
