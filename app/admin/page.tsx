'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BizzyBee } from '@/components/icons'
import { 
  ArrowLeft, Users, DollarSign, Calendar, BarChart3,
  ClipboardList, Settings, Mail, Phone, Download,
  CheckCircle, Clock, XCircle, Search, Filter
} from 'lucide-react'

// Mock enrollment data for demo
const MOCK_ENROLLMENTS = [
  {
    id: 1,
    refNumber: 'TB-2024-001',
    parentName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(903) 555-1234',
    children: [
      { name: 'Emma Johnson', age: 5, school: 'Bright Start Daycare', shirtSize: 'Youth S' },
    ],
    plan: 'Plan A - Monthly Auto Charge',
    amount: 50,
    status: 'active',
    enrolledDate: '2024-01-15',
    gummyBears: true,
  },
  {
    id: 2,
    refNumber: 'TB-2024-002',
    parentName: 'Mike Thompson',
    email: 'mike.t@email.com',
    phone: '(479) 555-5678',
    children: [
      { name: 'Liam Thompson', age: 4, school: 'Little Stars Preschool', shirtSize: 'Youth XS' },
      { name: 'Sophia Thompson', age: 7, school: 'Little Stars Preschool', shirtSize: 'Youth M' },
    ],
    plan: 'Plan A - Monthly Auto Charge',
    amount: 75, // $50 + $25 (half price)
    status: 'active',
    enrolledDate: '2024-01-20',
    gummyBears: true,
  },
  {
    id: 3,
    refNumber: 'TB-2024-003',
    parentName: 'Jennifer Davis',
    email: 'jenn.d@email.com',
    phone: '(479) 555-9012',
    children: [
      { name: 'Oliver Davis', age: 6, school: 'Sunshine Academy', shirtSize: 'Youth S' },
    ],
    plan: 'Plan C - Monthly Payment',
    amount: 50,
    status: 'pending',
    enrolledDate: '2024-02-01',
    gummyBears: false,
  },
  {
    id: 4,
    refNumber: 'TB-2024-004',
    parentName: 'Amanda Wilson',
    email: 'amanda.w@email.com',
    phone: '(479) 555-3456',
    children: [
      { name: 'Ava Wilson', age: 3, school: 'Tiny Tots Daycare', shirtSize: 'Youth XS' },
    ],
    plan: 'Plan B - Pay in Full',
    amount: 200,
    status: 'active',
    enrolledDate: '2024-02-03',
    gummyBears: true,
  },
]

const statusColors = {
  active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
}

const statusIcons = {
  active: CheckCircle,
  pending: Clock,
  cancelled: XCircle,
}

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedEnrollment, setSelectedEnrollment] = useState<typeof MOCK_ENROLLMENTS[0] | null>(null)

  const filteredEnrollments = MOCK_ENROLLMENTS.filter(enrollment => {
    const matchesSearch = 
      enrollment.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.refNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.children.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || enrollment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: MOCK_ENROLLMENTS.length,
    active: MOCK_ENROLLMENTS.filter(e => e.status === 'active').length,
    pending: MOCK_ENROLLMENTS.filter(e => e.status === 'pending').length,
    revenue: MOCK_ENROLLMENTS.filter(e => e.status === 'active').reduce((sum, e) => sum + e.amount, 0),
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BizzyBee className="w-10 h-10" animate={false} />
              <div>
                <h1 className="text-lg font-bold text-slate-800">Admin Dashboard</h1>
                <p className="text-xs text-slate-500">Bizzy B's Tumblebus</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                View Website
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Total Enrolled</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Active</p>
                  <p className="text-2xl font-bold text-emerald-600">{stats.active}</p>
                </div>
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Pending</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                </div>
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">${stats.revenue}</p>
                </div>
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Enrollments List */}
          <div className="flex-1">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                {/* Search & Filter */}
                <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by name, email, or reference..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    {['all', 'active', 'pending'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          statusFilter === status
                            ? 'bg-primary text-slate-900'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* List */}
                <div className="divide-y">
                  {filteredEnrollments.length === 0 ? (
                    <div className="p-12 text-center">
                      <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">No enrollments found</p>
                    </div>
                  ) : (
                    filteredEnrollments.map((enrollment) => {
                      const StatusIcon = statusIcons[enrollment.status as keyof typeof statusIcons]
                      return (
                        <div
                          key={enrollment.id}
                          onClick={() => setSelectedEnrollment(enrollment)}
                          className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                            selectedEnrollment?.id === enrollment.id ? 'bg-primary/5 border-l-4 border-primary' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-slate-900 truncate">
                                  {enrollment.parentName}
                                </span>
                                <Badge variant="outline" className={statusColors[enrollment.status as keyof typeof statusColors]}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {enrollment.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-500 mb-2">
                                {enrollment.children.map(c => c.name).join(', ')}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-slate-400">
                                <span>{enrollment.refNumber}</span>
                                <span>{enrollment.plan}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-slate-900">${enrollment.amount}/mo</p>
                              <p className="text-xs text-slate-400">{enrollment.enrolledDate}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detail Panel */}
          {selectedEnrollment && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-96"
            >
              <Card className="border-0 shadow-sm sticky top-20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-slate-900">Enrollment Details</h3>
                    <Badge variant="outline" className={statusColors[selectedEnrollment.status as keyof typeof statusColors]}>
                      {selectedEnrollment.status}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Reference</p>
                      <p className="font-mono font-semibold text-slate-900">{selectedEnrollment.refNumber}</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Parent/Guardian</p>
                      <p className="font-semibold text-slate-900">{selectedEnrollment.parentName}</p>
                      <a href={`mailto:${selectedEnrollment.email}`} className="text-sm text-blue-600 hover:underline block">
                        {selectedEnrollment.email}
                      </a>
                      <a href={`tel:${selectedEnrollment.phone}`} className="text-sm text-blue-600 hover:underline block">
                        {selectedEnrollment.phone}
                      </a>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Children</p>
                      {selectedEnrollment.children.map((child, i) => (
                        <div key={i} className={i > 0 ? 'mt-3 pt-3 border-t border-slate-200' : ''}>
                          <p className="font-semibold text-slate-900">{child.name}</p>
                          <p className="text-sm text-slate-600">Age: {child.age} • {child.shirtSize}</p>
                          <p className="text-sm text-slate-600">{child.school}</p>
                        </div>
                      ))}
                      <div className="mt-2 pt-2 border-t border-slate-200">
                        <p className="text-sm text-slate-600">
                          Gummy Bears: {selectedEnrollment.gummyBears ? '✅ Yes' : '❌ No'}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Plan</p>
                      <p className="font-semibold text-slate-900">{selectedEnrollment.plan}</p>
                      <p className="text-2xl font-bold text-primary">${selectedEnrollment.amount}/month</p>
                    </div>

                    <div className="pt-4 border-t space-y-2">
                      <Button className="w-full bg-slate-900 hover:bg-slate-800">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Parent
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Export Data</p>
                <p className="text-xs text-slate-500">Download CSV</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Send Reminder</p>
                <p className="text-xs text-slate-500">Email all parents</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">View Reports</p>
                <p className="text-xs text-slate-500">Analytics & insights</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Settings</p>
                <p className="text-xs text-slate-500">Configure options</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>💡 Tip:</strong> This is a demo admin panel with sample data. 
            To receive real enrollment submissions, connect your email or add a database. 
            Contact us to set up Stripe payments and email notifications.
          </p>
        </div>
      </main>
    </div>
  )
}
