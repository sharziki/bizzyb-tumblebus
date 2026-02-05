'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BizzyBee } from '@/components/icons'
import { 
  ArrowLeft, Users, DollarSign, Calendar, Search, X,
  CheckCircle, Clock, XCircle, Mail, Phone, Baby,
  ChevronRight, Sparkles, RefreshCw, Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock enrollment data - organized by email (primary key)
const ENROLLMENTS = [
  {
    email: 'sarah.johnson@email.com',
    parentName: 'Sarah Johnson',
    phone: '(903) 555-1234',
    children: [
      { name: 'Emma Johnson', age: 5, school: 'Bright Start Daycare', shirtSize: 'Youth S', gummyBears: true },
    ],
    package: '1 Child + Registration',
    amount: 70,
    status: 'active',
    enrolledDate: '2026-02-01',
    lastPayment: '2026-02-01',
    isNew: true,
  },
  {
    email: 'mike.thompson@email.com',
    parentName: 'Mike Thompson',
    phone: '(903) 555-5678',
    children: [
      { name: 'Liam Thompson', age: 4, school: 'Little Stars Preschool', shirtSize: 'Youth XS', gummyBears: true },
      { name: 'Sophia Thompson', age: 7, school: 'Little Stars Preschool', shirtSize: 'Youth M', gummyBears: false },
    ],
    package: '2 Children + Registration',
    amount: 115,
    status: 'active',
    enrolledDate: '2026-01-20',
    lastPayment: '2026-02-01',
    isNew: false,
  },
  {
    email: 'jenn.davis@email.com',
    parentName: 'Jennifer Davis',
    phone: '(903) 555-9012',
    children: [
      { name: 'Oliver Davis', age: 6, school: 'Sunshine Academy', shirtSize: 'Youth S', gummyBears: false },
    ],
    package: '1 Child (Returning)',
    amount: 50,
    status: 'pending',
    enrolledDate: '2026-02-04',
    lastPayment: null,
    isNew: true,
  },
  {
    email: 'amanda.wilson@email.com',
    parentName: 'Amanda Wilson',
    phone: '(903) 555-3456',
    children: [
      { name: 'Ava Wilson', age: 3, school: 'Tiny Tots Daycare', shirtSize: 'Youth XS', gummyBears: true },
    ],
    package: '1 Child + Registration',
    amount: 70,
    status: 'active',
    enrolledDate: '2026-02-03',
    lastPayment: '2026-02-03',
    isNew: true,
  },
  {
    email: 'robert.chen@email.com',
    parentName: 'Robert Chen',
    phone: '(903) 555-7890',
    children: [
      { name: 'Lily Chen', age: 5, school: 'Happy Kids Academy', shirtSize: 'Youth S', gummyBears: true },
      { name: 'Max Chen', age: 8, school: 'Happy Kids Academy', shirtSize: 'Youth M', gummyBears: true },
    ],
    package: '2 Children (Returning)',
    amount: 75,
    status: 'cancelled',
    enrolledDate: '2026-01-15',
    lastPayment: '2026-01-15',
    isNew: false,
  },
]

const statusConfig = {
  active: { 
    label: 'Active', 
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: CheckCircle 
  },
  pending: { 
    label: 'Pending Payment', 
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: Clock 
  },
  cancelled: { 
    label: 'Cancelled', 
    color: 'bg-red-100 text-red-700 border-red-200',
    icon: XCircle 
  },
}

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'cancelled'>('all')
  const [selectedEnrollment, setSelectedEnrollment] = useState<typeof ENROLLMENTS[0] | null>(null)

  const filteredEnrollments = ENROLLMENTS.filter(e => {
    const matchesSearch = 
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.children.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    // New enrollments first, then by date
    if (a.isNew && !b.isNew) return -1
    if (!a.isNew && b.isNew) return 1
    return new Date(b.enrolledDate).getTime() - new Date(a.enrolledDate).getTime()
  })

  const stats = {
    total: ENROLLMENTS.length,
    active: ENROLLMENTS.filter(e => e.status === 'active').length,
    pending: ENROLLMENTS.filter(e => e.status === 'pending').length,
    newToday: ENROLLMENTS.filter(e => e.isNew).length,
    revenue: ENROLLMENTS.filter(e => e.status === 'active').reduce((sum, e) => sum + e.amount, 0),
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <BizzyBee className="w-10 h-10" animate={false} />
                <div>
                  <span className="font-bold text-lg text-slate-800">Bizzy B's</span>
                  <span className="text-xs text-slate-500 block -mt-1">Admin Dashboard</span>
                </div>
              </Link>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                  <p className="text-xs text-slate-500">Total Families</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stats.active}</p>
                  <p className="text-xs text-slate-500">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stats.pending}</p>
                  <p className="text-xs text-slate-500">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-amber-400 to-orange-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.newToday}</p>
                  <p className="text-xs text-white/80">New Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">${stats.revenue}</p>
                  <p className="text-xs text-slate-500">Active Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Enrollment List */}
          <div className="flex-1">
            {/* Search & Filters */}
            <Card className="border-0 shadow-md mb-4">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by email, name, or child..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {(['all', 'active', 'pending', 'cancelled'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={cn(
                          "px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                          statusFilter === status
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enrollments */}
            <div className="space-y-3">
              {filteredEnrollments.map((enrollment) => {
                const status = statusConfig[enrollment.status as keyof typeof statusConfig]
                const StatusIcon = status.icon
                
                return (
                  <motion.div
                    key={enrollment.email}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card 
                      className={cn(
                        "border-0 shadow-md cursor-pointer transition-all hover:shadow-lg",
                        selectedEnrollment?.email === enrollment.email && "ring-2 ring-amber-500"
                      )}
                      onClick={() => setSelectedEnrollment(enrollment)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                            {enrollment.parentName.split(' ').map(n => n[0]).join('')}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            {/* Header row */}
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-slate-900">{enrollment.parentName}</h3>
                                  {enrollment.isNew && (
                                    <Badge className="bg-amber-500 text-white text-[10px] px-1.5">NEW</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-slate-500">{enrollment.email}</p>
                              </div>
                              <Badge className={cn("border", status.color)}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {status.label}
                              </Badge>
                            </div>

                            {/* Children - Intuitive Display */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {enrollment.children.map((child, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full"
                                >
                                  <Baby className="w-4 h-4 text-pink-500" />
                                  <span className="text-sm font-medium text-slate-700">{child.name}</span>
                                  <span className="text-xs text-slate-500">({child.age})</span>
                                  {!child.gummyBears && (
                                    <span className="text-xs text-red-500">🚫🐻</span>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-4 text-slate-500">
                                <span>{enrollment.package}</span>
                              </div>
                              <span className="font-bold text-emerald-600">${enrollment.amount}</span>
                            </div>
                          </div>

                          <ChevronRight className="w-5 h-5 text-slate-300 shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}

              {filteredEnrollments.length === 0 && (
                <Card className="border-0 shadow-md">
                  <CardContent className="p-12 text-center">
                    <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <h3 className="font-semibold text-slate-900 mb-1">No results found</h3>
                    <p className="text-slate-500">Try adjusting your search or filters</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Detail Panel */}
          <AnimatePresence>
            {selectedEnrollment && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lg:w-96"
              >
                <Card className="border-0 shadow-lg sticky top-24">
                  <CardContent className="p-0">
                    {/* Header */}
                    <div className="p-4 border-b flex items-center justify-between">
                      <h3 className="font-bold text-slate-900">Enrollment Details</h3>
                      <button
                        onClick={() => setSelectedEnrollment(null)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-4 space-y-4">
                      {/* Parent Info */}
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase mb-2">Parent/Guardian</p>
                        <p className="font-semibold text-slate-900">{selectedEnrollment.parentName}</p>
                        <a 
                          href={`mailto:${selectedEnrollment.email}`} 
                          className="flex items-center gap-2 text-sm text-blue-600 hover:underline mt-1"
                        >
                          <Mail className="w-4 h-4" />
                          {selectedEnrollment.email}
                        </a>
                        <a 
                          href={`tel:${selectedEnrollment.phone}`} 
                          className="flex items-center gap-2 text-sm text-blue-600 hover:underline mt-1"
                        >
                          <Phone className="w-4 h-4" />
                          {selectedEnrollment.phone}
                        </a>
                      </div>

                      {/* Children */}
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase mb-2">
                          Children ({selectedEnrollment.children.length})
                        </p>
                        <div className="space-y-2">
                          {selectedEnrollment.children.map((child, i) => (
                            <div key={i} className="p-3 bg-slate-50 rounded-xl">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                                  <Baby className="w-4 h-4 text-pink-500" />
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900">{child.name}</p>
                                  <p className="text-xs text-slate-500">Age {child.age}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p className="text-slate-500">School</p>
                                  <p className="font-medium text-slate-900">{child.school}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Shirt</p>
                                  <p className="font-medium text-slate-900">{child.shirtSize}</p>
                                </div>
                              </div>
                              <div className="mt-2 flex items-center gap-1 text-sm">
                                <span>Gummy Bears:</span>
                                {child.gummyBears ? (
                                  <span className="text-emerald-600">✓ Yes</span>
                                ) : (
                                  <span className="text-red-600">✗ No</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Package & Payment */}
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase mb-2">Package</p>
                        <div className="p-3 bg-amber-50 rounded-xl">
                          <div className="flex justify-between items-center">
                            <p className="font-semibold text-amber-900">{selectedEnrollment.package}</p>
                            <p className="font-bold text-xl text-amber-600">${selectedEnrollment.amount}</p>
                          </div>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Enrolled</p>
                          <p className="font-medium text-slate-900">
                            {new Date(selectedEnrollment.enrolledDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">Last Payment</p>
                          <p className="font-medium text-slate-900">
                            {selectedEnrollment.lastPayment 
                              ? new Date(selectedEnrollment.lastPayment).toLocaleDateString()
                              : '—'
                            }
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t space-y-2">
                        {selectedEnrollment.status === 'pending' && (
                          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Paid
                          </Button>
                        )}
                        <Button variant="outline" className="w-full rounded-xl">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Send Payment Reminder
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
