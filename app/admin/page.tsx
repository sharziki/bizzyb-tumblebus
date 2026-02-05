'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BizzyBee } from '@/components/icons'
import { 
  ArrowLeft, Users, DollarSign, Calendar, Search, X,
  CheckCircle, Clock, XCircle, Mail, Phone, Baby,
  ChevronRight, Sparkles, Edit2, Save, Loader2, Trash2
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Color palette for customer cards
const cardColors = [
  'from-amber-400 to-orange-500',
  'from-blue-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-pink-400 to-rose-500',
  'from-purple-400 to-violet-500',
  'from-cyan-400 to-blue-500',
  'from-orange-400 to-red-500',
  'from-lime-400 to-green-500',
]

// Helper to calculate next payment date (monthly from last payment)
function getNextPaymentDate(lastPayment: string | null): Date | null {
  if (!lastPayment) return null
  const date = new Date(lastPayment)
  date.setMonth(date.getMonth() + 1)
  return date
}

// Helper to check if payment is overdue
function isOverdue(lastPayment: string | null): boolean {
  if (!lastPayment) return false
  const nextDue = getNextPaymentDate(lastPayment)
  if (!nextDue) return false
  return nextDue < new Date()
}

// Helper to get days until/since due
function getDaysUntilDue(lastPayment: string | null): number | null {
  if (!lastPayment) return null
  const nextDue = getNextPaymentDate(lastPayment)
  if (!nextDue) return null
  const now = new Date()
  const diffTime = nextDue.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

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
  inactive: { 
    label: 'Inactive', 
    color: 'bg-slate-100 text-slate-600 border-slate-200',
    icon: XCircle 
  },
}

type Child = {
  id: string
  name: string
  age: number
  school: string
  shirtSize: string
  gummyBears: boolean
}

type Enrollment = {
  id: string
  email: string
  parentName: string
  phone: string
  package: string
  amount: number
  status: string
  enrolledDate: string
  lastPayment: string | null
  isNew: boolean
  children: Child[]
}

export default function AdminPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'inactive'>('all')
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Enrollment | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Fetch enrollments on mount
  useEffect(() => {
    fetchEnrollments()
  }, [])

  const fetchEnrollments = async () => {
    try {
      const res = await fetch('/api/enrollments')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setEnrollments(data)
    } catch (error) {
      console.error('Failed to fetch enrollments:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get effective status (overdue = inactive)
  const getEffectiveStatus = (enrollment: Enrollment) => {
    if (enrollment.status === 'active' && isOverdue(enrollment.lastPayment)) {
      return 'inactive'
    }
    return enrollment.status
  }

  const filteredEnrollments = enrollments.filter(e => {
    const matchesSearch = 
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.children.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const effectiveStatus = getEffectiveStatus(e)
    const matchesStatus = statusFilter === 'all' || effectiveStatus === statusFilter
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    // Overdue first, then new, then by date
    const aOverdue = isOverdue(a.lastPayment) && a.status === 'active'
    const bOverdue = isOverdue(b.lastPayment) && b.status === 'active'
    if (aOverdue && !bOverdue) return -1
    if (!aOverdue && bOverdue) return 1
    if (a.isNew && !b.isNew) return -1
    if (!a.isNew && b.isNew) return 1
    return new Date(b.enrolledDate).getTime() - new Date(a.enrolledDate).getTime()
  })

  const stats = {
    total: enrollments.length,
    active: enrollments.filter(e => e.status === 'active' && !isOverdue(e.lastPayment)).length,
    pending: enrollments.filter(e => e.status === 'pending').length,
    inactive: enrollments.filter(e => e.status === 'inactive' || (e.status === 'active' && isOverdue(e.lastPayment))).length,
    newToday: enrollments.filter(e => e.isNew).length,
    revenue: enrollments.filter(e => e.status === 'active' && !isOverdue(e.lastPayment)).reduce((sum, e) => sum + e.amount, 0),
  }

  const openModal = (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment)
    setEditForm({ ...enrollment, children: enrollment.children.map(c => ({ ...c })) })
    setIsEditing(false)
  }

  const closeModal = () => {
    setSelectedEnrollment(null)
    setEditForm(null)
    setIsEditing(false)
  }

  const saveChanges = async () => {
    if (!editForm || !selectedEnrollment) return
    
    setSaving(true)
    try {
      const res = await fetch(`/api/enrollments/${selectedEnrollment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      
      if (!res.ok) throw new Error('Failed to save')
      
      const updated = await res.json()
      
      setEnrollments(prev => prev.map(e => 
        e.id === selectedEnrollment.id ? updated : e
      ))
      setSelectedEnrollment(updated)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to save:', error)
      alert('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const deleteEnrollment = async () => {
    if (!selectedEnrollment) return
    if (!confirm(`Are you sure you want to delete ${selectedEnrollment.parentName}? This cannot be undone.`)) return
    
    setDeleting(true)
    try {
      const res = await fetch(`/api/enrollments/${selectedEnrollment.id}`, {
        method: 'DELETE',
      })
      
      if (!res.ok) throw new Error('Failed to delete')
      
      setEnrollments(prev => prev.filter(e => e.id !== selectedEnrollment.id))
      closeModal()
    } catch (error) {
      console.error('Failed to delete:', error)
      alert('Failed to delete enrollment')
    } finally {
      setDeleting(false)
    }
  }

  const generateReminderEmail = (enrollment: Enrollment) => {
    const nextDue = getNextPaymentDate(enrollment.lastPayment)
    const dueDate = nextDue ? nextDue.toLocaleDateString() : 'soon'
    const subject = encodeURIComponent(`Payment Reminder - Bizzy B's Tumblebus`)
    const body = encodeURIComponent(
      `Hi ${enrollment.parentName.split(' ')[0]},\n\n` +
      `This is a friendly reminder that your Tumblebus payment of $${enrollment.amount} is due ${dueDate}.\n\n` +
      `Please visit our website to make a payment or reply to this email if you have any questions.\n\n` +
      `Thank you!\nBizzy B's Tumblebus`
    )
    return `mailto:${enrollment.email}?subject=${subject}&body=${body}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-4" />
          <p className="text-slate-600">Loading enrollments...</p>
        </div>
      </div>
    )
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
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
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

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-600">{stats.inactive}</p>
                  <p className="text-xs text-slate-500">Inactive</p>
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
                  <p className="text-xs text-slate-500">Monthly</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
              <div className="flex gap-2 flex-wrap">
                {(['all', 'active', 'pending', 'inactive'] as const).map((status) => (
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

        {/* Enrollments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEnrollments.map((enrollment, index) => {
            const effectiveStatus = getEffectiveStatus(enrollment)
            const status = statusConfig[effectiveStatus as keyof typeof statusConfig]
            const StatusIcon = status.icon
            const colorClass = cardColors[index % cardColors.length]
            const daysUntil = getDaysUntilDue(enrollment.lastPayment)
            const nextDue = getNextPaymentDate(enrollment.lastPayment)
            const isInactiveDueToPayment = effectiveStatus === 'inactive' && enrollment.status === 'active'
            
            return (
              <motion.div
                key={enrollment.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card 
                  className={cn(
                    "border-0 shadow-md cursor-pointer transition-all hover:shadow-lg overflow-hidden",
                    isInactiveDueToPayment && "ring-2 ring-slate-400"
                  )}
                  onClick={() => openModal(enrollment)}
                >
                  {/* Colored header strip */}
                  <div className={cn("h-2 bg-gradient-to-r", colorClass)} />
                  
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className={cn(
                        "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg shrink-0",
                        colorClass
                      )}>
                        {enrollment.parentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {/* Header row */}
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-slate-900 truncate">{enrollment.parentName}</h3>
                              {enrollment.isNew && (
                                <Badge className="bg-amber-500 text-white text-[10px] px-1.5">NEW</Badge>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 truncate">{enrollment.email}</p>
                          </div>
                        </div>

                        {/* Children count */}
                        <div className="flex items-center gap-2 mb-2">
                          <Baby className="w-4 h-4 text-pink-500" />
                          <span className="text-sm text-slate-600">
                            {enrollment.children.length} {enrollment.children.length === 1 ? 'child' : 'children'}
                          </span>
                        </div>

                        {/* Status & Next Payment */}
                        <div className="flex items-center justify-between">
                          <Badge className={cn("border text-xs", status.color)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                          <span className="font-bold text-emerald-600">${enrollment.amount}</span>
                        </div>

                        {/* Next payment due */}
                        {enrollment.status === 'active' && nextDue && (
                          <div className={cn(
                            "mt-2 text-xs flex items-center gap-1",
                            isInactiveDueToPayment ? "text-slate-600 font-medium" : "text-slate-500"
                          )}>
                            <Calendar className="w-3 h-3" />
                            {isInactiveDueToPayment ? (
                              <span>Payment overdue by {Math.abs(daysUntil!)} days</span>
                            ) : (
                              <span>Due {nextDue.toLocaleDateString()} ({daysUntil} days)</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}

          {filteredEnrollments.length === 0 && (
            <Card className="border-0 shadow-md col-span-full">
              <CardContent className="p-12 text-center">
                <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-1">No results found</h3>
                <p className="text-slate-500">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedEnrollment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
                <h3 className="font-bold text-lg text-slate-900">
                  {isEditing ? 'Edit Customer' : 'Customer Details'}
                </h3>
                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  ) : (
                    <Button 
                      size="sm"
                      onClick={saveChanges}
                      disabled={saving}
                      className="bg-emerald-500 hover:bg-emerald-600"
                    >
                      {saving ? (
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-1" />
                      )}
                      Save
                    </Button>
                  )}
                  <button
                    onClick={closeModal}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Parent Info */}
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase mb-2">Parent/Guardian</p>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editForm?.parentName || ''}
                        onChange={(e) => setEditForm(prev => prev ? { ...prev, parentName: e.target.value } : null)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                        placeholder="Parent Name"
                      />
                      <input
                        type="email"
                        value={editForm?.email || ''}
                        onChange={(e) => setEditForm(prev => prev ? { ...prev, email: e.target.value } : null)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                        placeholder="Email"
                      />
                      <input
                        type="tel"
                        value={editForm?.phone || ''}
                        onChange={(e) => setEditForm(prev => prev ? { ...prev, phone: e.target.value } : null)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                        placeholder="Phone"
                      />
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>

                {/* Children */}
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase mb-2">
                    Children ({selectedEnrollment.children.length})
                  </p>
                  <div className="space-y-2">
                    {(isEditing ? editForm?.children : selectedEnrollment.children)?.map((child, i) => (
                      <div key={child.id || i} className="p-3 bg-slate-50 rounded-xl">
                        {isEditing ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={child.name}
                              onChange={(e) => {
                                if (!editForm) return
                                const newChildren = [...editForm.children]
                                newChildren[i] = { ...newChildren[i], name: e.target.value }
                                setEditForm({ ...editForm, children: newChildren })
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-amber-500 outline-none text-sm"
                              placeholder="Child Name"
                            />
                            <div className="grid grid-cols-3 gap-2">
                              <input
                                type="number"
                                value={child.age}
                                onChange={(e) => {
                                  if (!editForm) return
                                  const newChildren = [...editForm.children]
                                  newChildren[i] = { ...newChildren[i], age: parseInt(e.target.value) || 0 }
                                  setEditForm({ ...editForm, children: newChildren })
                                }}
                                className="px-3 py-2 rounded-lg border border-slate-200 focus:border-amber-500 outline-none text-sm"
                                placeholder="Age"
                              />
                              <input
                                type="text"
                                value={child.school}
                                onChange={(e) => {
                                  if (!editForm) return
                                  const newChildren = [...editForm.children]
                                  newChildren[i] = { ...newChildren[i], school: e.target.value }
                                  setEditForm({ ...editForm, children: newChildren })
                                }}
                                className="px-3 py-2 rounded-lg border border-slate-200 focus:border-amber-500 outline-none text-sm col-span-2"
                                placeholder="School"
                              />
                            </div>
                          </div>
                        ) : (
                          <>
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
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Package & Payment */}
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase mb-2">Package & Payment</p>
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

                {/* Next Payment Due */}
                {selectedEnrollment.status === 'active' && selectedEnrollment.lastPayment && (
                  <div className={cn(
                    "p-3 rounded-xl",
                    isOverdue(selectedEnrollment.lastPayment) ? "bg-red-50" : "bg-blue-50"
                  )}>
                    <p className="text-xs font-medium text-slate-500 uppercase mb-1">Next Payment Due</p>
                    <p className={cn(
                      "font-bold text-lg",
                      isOverdue(selectedEnrollment.lastPayment) ? "text-red-600" : "text-blue-600"
                    )}>
                      {getNextPaymentDate(selectedEnrollment.lastPayment)?.toLocaleDateString()}
                      {isOverdue(selectedEnrollment.lastPayment) && (
                        <span className="text-sm font-normal ml-2">(OVERDUE)</span>
                      )}
                    </p>
                  </div>
                )}

                {/* Actions */}
                {!isEditing && (
                  <div className="pt-4 border-t space-y-2">
                    {selectedEnrollment.status === 'pending' && (
                      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Paid
                      </Button>
                    )}
                    <a href={generateReminderEmail(selectedEnrollment)} className="block">
                      <Button variant="outline" className="w-full rounded-xl">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Payment Reminder
                      </Button>
                    </a>
                    <Button 
                      variant="outline" 
                      className="w-full rounded-xl text-red-600 border-red-200 hover:bg-red-50"
                      onClick={deleteEnrollment}
                      disabled={deleting}
                    >
                      {deleting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 mr-2" />
                      )}
                      Delete Customer
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
