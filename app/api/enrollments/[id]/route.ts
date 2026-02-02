import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type RouteContext = {
  params: { id: string }
}

// GET - Get single enrollment
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: context.params.id }
    })

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    return NextResponse.json(enrollment)
  } catch (error) {
    console.error('Error fetching enrollment:', error)
    return NextResponse.json({ error: 'Failed to fetch enrollment' }, { status: 500 })
  }
}

// PATCH - Update enrollment
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const body = await request.json()
    
    const enrollment = await prisma.enrollment.update({
      where: { id: context.params.id },
      data: {
        ...body,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(enrollment)
  } catch (error: any) {
    console.error('Error updating enrollment:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to update enrollment' }, { status: 500 })
  }
}

// DELETE - Delete enrollment
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await prisma.enrollment.delete({
      where: { id: context.params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting enrollment:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete enrollment' }, { status: 500 })
  }
}
