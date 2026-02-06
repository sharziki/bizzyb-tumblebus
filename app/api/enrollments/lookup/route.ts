import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: { email: email.toLowerCase() },
      include: { children: true },
    })

    if (!enrollment) {
      return NextResponse.json({ found: false })
    }

    // Parse the parent name into first/last
    const nameParts = enrollment.parentName.split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Transform to the format expected by the form
    const customerData = {
      found: true,
      email: enrollment.email,
      parentFirstName: firstName,
      parentLastName: lastName,
      phone: enrollment.phone,
      address: enrollment.address,
      children: enrollment.children.map(child => {
        // Parse child name
        const childNameParts = child.name.split(' ')
        const childFirstName = childNameParts[0] || ''
        const childLastName = childNameParts.slice(1).join(' ') || ''
        
        return {
          firstName: childFirstName,
          lastName: childLastName,
          age: String(child.age),
          dateOfBirth: child.birthday || '',
          school: child.school,
          classroom: child.classroom || '',
          shirtSize: child.shirtSize,
          canHaveGummyBears: child.gummyBears,
          allergies: child.allergies || '',
        }
      }),
    }

    return NextResponse.json(customerData)
  } catch (error) {
    console.error('Lookup error:', error)
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 })
  }
}
