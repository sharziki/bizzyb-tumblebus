'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface Enrollment {
  id: string
  enrollmentNumber: number
  studentFirstName: string
  studentLastName: string
  dateOfBirth: string | null
  age: number | null
  parentFirstName: string
  parentLastName: string
  email: string
  phone: string
  address: string | null
  city: string | null
  programType: string
  classLevel: string | null
  preferredSchedule: string | null
  medicalConditions: string | null
  allergies: string | null
  notes: string | null
  status: string
  createdAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function AdminDashboard() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null)
  const [page, setPage] = useState(1)

  const fetchEnrollments = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        sortBy: 'createdAt',
        sortOrder: 'desc'
      })
      
      if (statusFilter !== 'all') {
        params.set('status', statusFilter)
      }
      if (search) {
        params.set('search', search)
      }

      const res = await fetch(`/api/enrollments?${params}`)
      const data = await res.json()
      
      setEnrollments(data.enrollments || [])
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching enrollments:', error)
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter, search])

  useEffect(() => {
    fetchEnrollments()
  }, [fetchEnrollments])

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/enrollments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      
      if (res.ok) {
        fetchEnrollments()
        if (selectedEnrollment?.id === id) {
          setSelectedEnrollment(prev => prev ? { ...prev, status } : null)
        }
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const deleteEnrollment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enrollment? This cannot be undone.')) return
    
    try {
      const res = await fetch(`/api/enrollments/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchEnrollments()
        setSelectedEnrollment(null)
      }
    } catch (error) {
      console.error('Error deleting enrollment:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    approved: 'bg-green-100 text-green-800 border-green-300',
    waitlist: 'bg-blue-100 text-blue-800 border-blue-300',
    cancelled: 'bg-red-100 text-red-800 border-red-300'
  }

  const newEnrollments = enrollments.filter(e => e.status === 'pending')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚌</span>
              <div>
                <h1 className="text-lg font-bold text-amber-600">Bizzy B's Tumblebus</h1>
                <p className="text-xs text-gray-500">Enrollment Management</p>
              </div>
            </div>
            <Link href="/" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
              ← View Website
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
                <p className="text-2xl font-bold text-gray-900">{pagination?.total || 0}</p>
              </div>
              <span className="text-3xl">📋</span>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-yellow-700 uppercase tracking-wide">New</p>
                <p className="text-2xl font-bold text-yellow-700">{newEnrollments.length}</p>
              </div>
              <span className="text-3xl">🔔</span>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-700 uppercase tracking-wide">Approved</p>
                <p className="text-2xl font-bold text-green-700">
                  {enrollments.filter(e => e.status === 'approved').length}
                </p>
              </div>
              <span className="text-3xl">✅</span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-700 uppercase tracking-wide">Waitlist</p>
                <p className="text-2xl font-bold text-blue-700">
                  {enrollments.filter(e => e.status === 'waitlist').length}
                </p>
              </div>
              <span className="text-3xl">⏳</span>
            </div>
          </div>
        </div>

        {/* New Enrollments Alert */}
        {newEnrollments.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-400 to-amber-400 text-white p-4 mb-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="text-4xl animate-bounce">🎉</div>
              <div>
                <p className="font-bold text-lg">
                  {newEnrollments.length} New Enrollment{newEnrollments.length > 1 ? 's' : ''}!
                </p>
                <p className="text-sm opacity-90">
                  {newEnrollments.slice(0, 3).map(e => `${e.studentFirstName} ${e.studentLastName}`).join(', ')}
                  {newEnrollments.length > 3 && ` and ${newEnrollments.length - 3} more`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'all', label: 'All', color: 'gray' },
                { value: 'pending', label: 'New', color: 'yellow' },
                { value: 'approved', label: 'Approved', color: 'green' },
                { value: 'waitlist', label: 'Waitlist', color: 'blue' },
                { value: 'cancelled', label: 'Cancelled', color: 'red' }
              ].map((status) => (
                <button
                  key={status.value}
                  onClick={() => { setStatusFilter(status.value); setPage(1); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    statusFilter === status.value
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Enrollments List */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="text-6xl mb-4 animate-bounce">🚌</div>
                  <p className="text-gray-500">Loading enrollments...</p>
                </div>
              ) : enrollments.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-500 text-lg">No enrollments found</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {search ? 'Try a different search term' : 'Enrollments will appear here'}
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {enrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      onClick={() => setSelectedEnrollment(enrollment)}
                      className={`p-4 cursor-pointer hover:bg-amber-50 transition-colors ${
                        selectedEnrollment?.id === enrollment.id ? 'bg-amber-50 border-l-4 border-amber-500' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                            #{enrollment.enrollmentNumber}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">
                              {enrollment.studentFirstName} {enrollment.studentLastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {enrollment.programType}
                              {enrollment.classLevel && ` • ${enrollment.classLevel}`}
                            </p>
                            <p className="text-xs text-gray-400">
                              Parent: {enrollment.parentFirstName} {enrollment.parentLastName}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${statusColors[enrollment.status]}`}>
                            {enrollment.status.toUpperCase()}
                          </span>
                          <p className="text-xs text-gray-400 mt-2">
                            {formatDate(enrollment.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing {((page - 1) * pagination.limit) + 1} - {Math.min(page * pagination.limit, pagination.total)} of {pagination.total}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg bg-white border text-gray-600 disabled:opacity-50 hover:bg-gray-50"
                    >
                      ← Prev
                    </button>
                    <span className="px-4 py-2 text-gray-600">
                      {page} / {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                      disabled={page === pagination.totalPages}
                      className="px-4 py-2 rounded-lg bg-white border text-gray-600 disabled:opacity-50 hover:bg-gray-50"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detail Panel */}
          {selectedEnrollment && (
            <div className="w-96 bg-white rounded-xl shadow-sm p-6 sticky top-20 h-fit max-h-[calc(100vh-120px)] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    #{selectedEnrollment.enrollmentNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {selectedEnrollment.studentFirstName}
                    </h3>
                    <p className="text-sm text-gray-500">{selectedEnrollment.studentLastName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEnrollment(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Program</p>
                  <p className="font-medium text-gray-900">{selectedEnrollment.programType}</p>
                  {selectedEnrollment.classLevel && (
                    <p className="text-sm text-gray-600">{selectedEnrollment.classLevel}</p>
                  )}
                  {selectedEnrollment.preferredSchedule && (
                    <p className="text-sm text-gray-600">{selectedEnrollment.preferredSchedule}</p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Parent/Guardian</p>
                  <p className="font-medium text-gray-900">
                    {selectedEnrollment.parentFirstName} {selectedEnrollment.parentLastName}
                  </p>
                  <p className="text-sm text-blue-600">
                    <a href={`mailto:${selectedEnrollment.email}`}>{selectedEnrollment.email}</a>
                  </p>
                  <p className="text-sm text-blue-600">
                    <a href={`tel:${selectedEnrollment.phone}`}>{selectedEnrollment.phone}</a>
                  </p>
                </div>

                {selectedEnrollment.address && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Address</p>
                    <p className="text-sm text-gray-900">{selectedEnrollment.address}</p>
                    {selectedEnrollment.city && (
                      <p className="text-sm text-gray-600">{selectedEnrollment.city}</p>
                    )}
                  </div>
                )}

                {(selectedEnrollment.medicalConditions || selectedEnrollment.allergies) && (
                  <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                    <p className="text-xs text-red-600 uppercase tracking-wide mb-1">⚠️ Medical Info</p>
                    {selectedEnrollment.medicalConditions && (
                      <p className="text-sm text-gray-900">{selectedEnrollment.medicalConditions}</p>
                    )}
                    {selectedEnrollment.allergies && (
                      <p className="text-sm text-gray-900 mt-1">Allergies: {selectedEnrollment.allergies}</p>
                    )}
                  </div>
                )}

                {selectedEnrollment.notes && (
                  <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                    <p className="text-xs text-yellow-700 uppercase tracking-wide mb-1">📝 Notes</p>
                    <p className="text-sm text-gray-900">{selectedEnrollment.notes}</p>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Enrolled</p>
                  <p className="text-sm text-gray-900">{formatDate(selectedEnrollment.createdAt)}</p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Update Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['pending', 'approved', 'waitlist', 'cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedEnrollment.id, status)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedEnrollment.status === status
                            ? `${statusColors[status]} border-2`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={() => deleteEnrollment(selectedEnrollment.id)}
                    className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                  >
                    🗑️ Delete Enrollment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
