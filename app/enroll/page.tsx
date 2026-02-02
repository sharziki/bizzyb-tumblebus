'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BizzyBee } from '@/components/icons'
import { 
  ArrowLeft, ArrowRight, Check, Loader2,
  Baby, Users, Phone, AlertCircle, Target, FileText,
  PartyPopper, Home
} from 'lucide-react'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In production, you could:
    // 1. Send to an email service (SendGrid, Resend, etc.)
    // 2. Send to a form service (Formspree, Basin, etc.)
    // 3. Post to a Google Form/Sheet
    // 4. Send to a webhook
    
    setSubmitted(true)
    setSubmitting(false)
  }

  const enrollmentNumber = Math.floor(Math.random() * 9000) + 1000

  if (submitted) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8 text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-12 h-12 text-emerald-600" />
              </motion.div>
              
              <h1 className="text-2xl font-bold text-slate-900 mb-2">You're Enrolled!</h1>
              <p className="text-slate-600 mb-6">
                Welcome to the Bizzy B's Tumblebus family!
              </p>
              
              <div className="bg-amber-50 rounded-2xl p-4 mb-6 border border-amber-200">
                <p className="text-sm text-amber-700 mb-1">Your Reference Number</p>
                <p className="text-4xl font-bold text-amber-600">#{enrollmentNumber}</p>
              </div>
              
              <p className="text-sm text-slate-500 mb-8">
                We'll contact you within 1-2 business days to confirm your enrollment and discuss scheduling. Get ready to tumble! 🤸
              </p>
              
              <div className="flex flex-col gap-3">
                <Link href="/">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 rounded-full h-12">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Button
                  variant="outline"
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
                  className="w-full rounded-full h-12 border-2"
                >
                  <PartyPopper className="w-4 h-4 mr-2" />
                  Enroll Another Child
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const sections = [
    { icon: Baby, title: 'Child Information', color: 'bg-pink-500' },
    { icon: Users, title: 'Parent/Guardian', color: 'bg-blue-500' },
    { icon: AlertCircle, title: 'Emergency Contact', color: 'bg-red-500' },
    { icon: Target, title: 'Program Selection', color: 'bg-emerald-500' },
    { icon: FileText, title: 'Medical & Notes', color: 'bg-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <BizzyBee className="w-10 h-10" animate={false} />
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-slate-800 group-hover:text-primary transition-colors">
                  Bizzy B's
                </span>
                <span className="text-xs text-slate-500 block -mt-1">Tumblebus</span>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-slate-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-0 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 sm:p-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl">🤸</span>
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Enrollment Form</h1>
                    <p className="text-white/80 mt-1">Let's get your little one tumbling!</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
                {/* Child Information */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center">
                      <Baby className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Child Information</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
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
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Parent/Guardian Information</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    <div className="col-span-2 sm:col-span-1">
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
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Emergency Contact</h3>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
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
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Program Selection</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
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
                    <div className="sm:col-span-2">
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

                {/* Medical Information & Notes */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Medical Information & Notes</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="label">Medical Conditions</label>
                      <textarea
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleChange}
                        rows={2}
                        className="input-field resize-none"
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
                        className="input-field resize-none"
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
                        className="input-field resize-none"
                        placeholder="Any special needs we should be aware of..."
                      />
                    </div>
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
                        className="input-field resize-none"
                        placeholder="Anything else you'd like us to know..."
                      />
                    </div>
                  </div>
                </section>

                {/* Submit */}
                <div className="pt-6 border-t border-slate-200">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold rounded-full h-14 text-lg shadow-lg shadow-primary/25"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Enrollment
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-sm text-slate-500 mt-4">
                    By submitting, you agree to be contacted about your enrollment.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
