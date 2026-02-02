'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function EnrollmentPage() {
  const [formData, setFormData] = useState({
    studentFirstName: '',
    studentLastName: '',
    dateOfBirth: '',
    parentFirstName: '',
    parentLastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyRelation: '',
    programType: '',
    classLevel: '',
    preferredSchedule: '',
    medicalConditions: '',
    allergies: '',
    specialNeeds: '',
    referralSource: '',
    notes: ''
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [enrollmentNumber, setEnrollmentNumber] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enrollment')
      }

      setEnrollmentNumber(data.enrollmentNumber)
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🎉</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">You're Enrolled!</h1>
          <p className="text-gray-600 mb-4">
            Welcome to the Bizzy B's Tumblebus family!
          </p>
          <div className="bg-amber-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-amber-600 mb-1">Your Enrollment Number</p>
            <p className="text-4xl font-bold text-amber-600">#{enrollmentNumber}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            We'll contact you within 1-2 business days to confirm your enrollment and discuss scheduling. Get ready to tumble! 🤸
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <button
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  studentFirstName: '', studentLastName: '', dateOfBirth: '',
                  parentFirstName: '', parentLastName: '', email: '', phone: '',
                  address: '', city: '', state: '', zipCode: '',
                  emergencyContactName: '', emergencyContactPhone: '', emergencyRelation: '',
                  programType: '', classLevel: '', preferredSchedule: '',
                  medicalConditions: '', allergies: '', specialNeeds: '',
                  referralSource: '', notes: ''
                })
              }}
              className="btn-outline"
            >
              Enroll Another Child
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🚌</span>
              <span className="font-bold text-lg text-amber-600">Bizzy B's Tumblebus</span>
            </Link>
            <Link href="/" className="text-gray-500 hover:text-amber-600 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">🤸</span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Enrollment Form</h1>
            <p className="text-gray-600">Let's get your little one tumbling! Fill out the form below.</p>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Child Information */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-200 flex items-center gap-2">
                <span className="text-2xl">👶</span> Child Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Child's First Name *</label>
                  <input
                    type="text"
                    name="studentFirstName"
                    value={formData.studentFirstName}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="label">Child's Last Name *</label>
                  <input
                    type="text"
                    name="studentLastName"
                    value={formData.studentLastName}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Last name"
                  />
                </div>
                <div>
                  <label className="label">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
            </section>

            {/* Parent/Guardian Information */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-200 flex items-center gap-2">
                <span className="text-2xl">👨‍👩‍👧</span> Parent/Guardian Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Parent First Name *</label>
                  <input
                    type="text"
                    name="parentFirstName"
                    value={formData.parentFirstName}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Parent's first name"
                  />
                </div>
                <div>
                  <label className="label">Parent Last Name *</label>
                  <input
                    type="text"
                    name="parentLastName"
                    value={formData.parentLastName}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Parent's last name"
                  />
                </div>
                <div>
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="label">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="label">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="123 Main Street"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="label">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="label">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="label">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="12345"
                  />
                </div>
              </div>
            </section>

            {/* Emergency Contact */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-200 flex items-center gap-2">
                <span className="text-2xl">🚨</span> Emergency Contact
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="label">Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Emergency contact"
                  />
                </div>
                <div>
                  <label className="label">Contact Phone</label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="label">Relationship</label>
                  <input
                    type="text"
                    name="emergencyRelation"
                    value={formData.emergencyRelation}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., Grandmother"
                  />
                </div>
              </div>
            </section>

            {/* Program Selection */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-200 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Program Selection
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Program Type *</label>
                  <select
                    name="programType"
                    value={formData.programType}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select a program...</option>
                    <option value="Weekly Program - Daycare">Weekly Program - Daycare</option>
                    <option value="Weekly Program - School">Weekly Program - School</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Special Event">Special Event</option>
                    <option value="Summer Camp">Summer Camp</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="label">Child's Age Group</label>
                  <select
                    name="classLevel"
                    value={formData.classLevel}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select age group...</option>
                    <option value="Toddler (2-3 years)">Toddler (2-3 years)</option>
                    <option value="Preschool (3-5 years)">Preschool (3-5 years)</option>
                    <option value="School Age (5-8 years)">School Age (5-8 years)</option>
                    <option value="Big Kids (8-10 years)">Big Kids (8-10 years)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="label">Preferred Schedule</label>
                  <select
                    name="preferredSchedule"
                    value={formData.preferredSchedule}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select preferred time...</option>
                    <option value="Morning (8am-12pm)">Morning (8am-12pm)</option>
                    <option value="Afternoon (12pm-4pm)">Afternoon (12pm-4pm)</option>
                    <option value="Weekend">Weekend</option>
                    <option value="Flexible">Flexible / No preference</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Medical Information */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-200 flex items-center gap-2">
                <span className="text-2xl">🏥</span> Medical Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Medical Conditions</label>
                  <textarea
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleChange}
                    rows={2}
                    className="input-field"
                    placeholder="Please list any medical conditions (asthma, seizures, etc.)..."
                  />
                </div>
                <div>
                  <label className="label">Allergies</label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    rows={2}
                    className="input-field"
                    placeholder="Please list any allergies..."
                  />
                </div>
                <div>
                  <label className="label">Special Needs or Accommodations</label>
                  <textarea
                    name="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={handleChange}
                    rows={2}
                    className="input-field"
                    placeholder="Any special needs we should be aware of..."
                  />
                </div>
              </div>
            </section>

            {/* Additional Info */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-200 flex items-center gap-2">
                <span className="text-2xl">📝</span> Additional Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="label">How did you hear about us?</label>
                  <select
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select...</option>
                    <option value="Friend/Family">Friend or Family</option>
                    <option value="Social Media">Social Media (Facebook, Instagram)</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Flyer/Poster">Flyer or Poster</option>
                    <option value="School/Daycare">School or Daycare</option>
                    <option value="Saw the Bus">Saw the Tumblebus!</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="label">Additional Notes or Questions</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="input-field"
                    placeholder="Anything else you'd like us to know..."
                  />
                </div>
              </div>
            </section>

            {/* Submit */}
            <div className="pt-6 border-t-2 border-amber-100">
              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>🚌 Submit Enrollment</>
                )}
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                By submitting, you agree to be contacted about your enrollment.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
