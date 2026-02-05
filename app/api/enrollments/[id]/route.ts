import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: { children: true },
    })
    
    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(enrollment)
  } catch (error) {
    console.error('Failed to fetch enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enrollment' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    const { children, ...enrollmentData } = data
    
    // Update enrollment
    const enrollment = await prisma.enrollment.update({
      where: { id },
      data: {
        ...enrollmentData,
        updatedAt: new Date(),
      },
    })
    
    // Update children if provided
    if (children && Array.isArray(children)) {
      // Delete existing children
      await prisma.child.deleteMany({
        where: { enrollmentId: id },
      })
      
      // Create new children
      await prisma.child.createMany({
        data: children.map((child: any) => ({
          ...child,
          enrollmentId: id,
          id: undefined, // Let Prisma generate new IDs
        })),
      })
    }
    
    // Fetch updated enrollment with children
    const updated = await prisma.enrollment.findUnique({
      where: { id },
      include: { children: true },
    })
    
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Failed to update enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to update enrollment' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.enrollment.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to delete enrollment' },
      { status: 500 }
    )
  }
}
