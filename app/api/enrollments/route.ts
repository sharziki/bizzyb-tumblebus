import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - Create new enrollment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      studentFirstName,
      studentLastName,
      dateOfBirth,
      parentFirstName,
      parentLastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      emergencyContactName,
      emergencyContactPhone,
      emergencyRelation,
      programType,
      classLevel,
      preferredSchedule,
      medicalConditions,
      allergies,
      specialNeeds,
      referralSource,
      notes
    } = body

    // Validate required fields
    if (!studentFirstName || !studentLastName || !parentFirstName || !parentLastName || !email || !phone || !programType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate age if date of birth provided
    let age: number | undefined
    if (dateOfBirth) {
      const dob = new Date(dateOfBirth)
      const today = new Date()
      age = today.getFullYear() - dob.getFullYear()
      const monthDiff = today.getMonth() - dob.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--
      }
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        studentFirstName,
        studentLastName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        age,
        parentFirstName,
        parentLastName,
        email,
        phone,
        address: address || null,
        city: city || null,
        state: state || null,
        zipCode: zipCode || null,
        emergencyContactName: emergencyContactName || null,
        emergencyContactPhone: emergencyContactPhone || null,
        emergencyRelation: emergencyRelation || null,
        programType,
        classLevel: classLevel || null,
        preferredSchedule: preferredSchedule || null,
        medicalConditions: medicalConditions || null,
        allergies: allergies || null,
        specialNeeds: specialNeeds || null,
        referralSource: referralSource || null,
        notes: notes || null,
        status: 'pending'
      }
    })

    return NextResponse.json({
      success: true,
      enrollmentNumber: enrollment.enrollmentNumber,
      id: enrollment.id
    }, { status: 201 })

  } catch (error: any) {
    console.error('Error creating enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    )
  }
}

// GET - List enrollments (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const where: any = {}
    
    if (status && status !== 'all') {
      where.status = status
    }

    if (search) {
      where.OR = [
        { studentFirstName: { contains: search, mode: 'insensitive' } },
        { studentLastName: { contains: search, mode: 'insensitive' } },
        { parentFirstName: { contains: search, mode: 'insensitive' } },
        { parentLastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } }
      ]
    }

    const [enrollments, total] = await Promise.all([
      prisma.enrollment.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.enrollment.count({ where })
    ])

    return NextResponse.json({
      enrollments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error: any) {
    console.error('Error fetching enrollments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    )
  }
}
