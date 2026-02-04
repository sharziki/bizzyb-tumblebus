'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BizzyBee } from '@/components/icons'
import { 
  ArrowLeft, ArrowRight, Check, Loader2,
  Baby, Users, Phone, CreditCard, FileText,
  Home, DollarSign, Shirt, School, UserPlus
} from 'lucide-react'

const SHIRT_SIZES = ['Youth XS', 'Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L', 'Adult XL']

const PRICING_PLANS = [
  {
    id: 'plan_a',
    name: 'Plan A - Monthly Auto Charge',
    price: '$50/month',
    description: '4 classes per month with automatic monthly billing',
    features: ['4 classes per month', 'Auto-charged monthly', '2nd child half price ($25)'],
    stripePrice: 5000, // cents
  },
  {
    id: 'plan_b',
    name: 'Plan B - Pay in Full',
    price: 'Call for pricing',
    description: 'Pay for the full session upfront',
    features: ['Full session payment', '2nd child half price', 'Call office for amount'],
    stripePrice: null, // Requires call
  },
  {
    id: 'plan_c',
    name: 'Plan C - Monthly Payment',
    price: '$50/month',
    description: '4 classes with flexible payment options',
    features: ['4 classes per month', 'Pay by card, check, or cash', 'Due 1st class of each 4-week period'],
    stripePrice: 5000,
  },
]

interface ChildInfo {
  firstName: string
  lastName: string
  dateOfBirth: string
  age: string
  school: string
  shirtSize: string
  canHaveGummyBears: boolean
}

export default function EnrollmentPage() {
  const [formData, setFormData] = useState({
    // Parent Info
    parentFirstName: '',
    parentLastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'AR',
    zipCode: '',
    
    // Primary Child
    child1: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      age: '',
      school: '',
      shirtSize: '',
      canHaveGummyBears: true,
    } as ChildInfo,
    
    // Second Child (optional)
    hasSecondChild: false,
    child2: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      age: '',
      school: '',
      shirtSize: '',
      canHaveGummyBears: true,
    } as ChildInfo,
    
    // Plan Selection
    selectedPlan: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyRelation: '',
    
    // Medical Info
    medicalConditions: '',
    allergies: '',
    
    // Permissions
    permissionAgreed: false,
    
    // Notes
    notes: '',
    referralSource: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    if (name.startsWith('child1.') || name.startsWith('child2.')) {
      const [child, field] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [child]: {
          ...prev[child as 'child1' | 'child2'],
          [field]: type === 'checkbox' ? checked : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const calculateTotal = () => {
    const plan = PRICING_PLANS.find(p => p.id === formData.selectedPlan)
    if (!plan || !plan.stripePrice) return null
    
    let total = plan.stripePrice
    if (formData.hasSecondChild) {
      total += plan.stripePrice / 2 // 2nd child half price
    }
    return total
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.permissionAgreed) {
      alert('Please agree to the permission and release statement to continue.')
      return
    }
    
    setSubmitting(true)
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const plan = PRICING_PLANS.find(p => p.id === formData.selectedPlan)
    
    // If plan has stripe price and isn't "call for pricing", show payment
    if (plan?.stripePrice) {
      setShowPayment(true)
      setSubmitting(false)
    } else {
      // Plan B - call for pricing
      setSubmitted(true)
      setSubmitting(false)
    }
  }

  const handlePayment = async () => {
    setSubmitting(true)
    // In production, this would create a Stripe checkout session
    // For now, simulate successful payment
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSubmitted(true)
    setSubmitting(false)
  }

  const enrollmentNumber = Math.floor(Math.random() * 9000) + 1000

  // Success Screen
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
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Payment Screen
  if (showPayment) {
    const total = calculateTotal()
    const plan = PRICING_PLANS.find(p => p.id === formData.selectedPlan)
    
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Complete Payment</h2>
                <p className="text-slate-600">{plan?.name}</p>
              </div>
              
              <div className="bg-slate-100 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">First Child</span>
                  <span className="font-semibold">${(plan?.stripePrice || 0) / 100}</span>
                </div>
                {formData.hasSecondChild && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Second Child (50% off)</span>
                    <span className="font-semibold">${((plan?.stripePrice || 0) / 100) / 2}</span>
                  </div>
                )}
                <div className="border-t border-slate-300 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="font-bold text-2xl text-primary">${(total || 0) / 100}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button
                  onClick={handlePayment}
                  disabled={submitting}
                  className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold rounded-full h-14 text-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pay with Card
                    </>
                  )}
                </Button>
                
                <p className="text-center text-xs text-slate-500">
                  Secure payment powered by Stripe
                </p>
                
                <Button
                  variant="ghost"
                  onClick={() => setShowPayment(false)}
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Form
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Payment Policy:</strong> Payments are due the 1st class of each 4-week period. 
                  A $5 late fee will be added after the first week. $25 fee for returned checks.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Main Form
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
                
                {/* Pricing Plans */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Select Your Plan *</h3>
                  </div>
                  
                  <div className="grid gap-4">
                    {PRICING_PLANS.map((plan) => (
                      <label
                        key={plan.id}
                        className={`relative flex cursor-pointer rounded-xl border-2 p-4 transition-all ${
                          formData.selectedPlan === plan.id
                            ? 'border-primary bg-primary/5'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="selectedPlan"
                          value={plan.id}
                          checked={formData.selectedPlan === plan.id}
                          onChange={handleChange}
                          className="sr-only"
                          required
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-slate-900">{plan.name}</span>
                            <span className="font-bold text-primary">{plan.price}</span>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{plan.description}</p>
                          <ul className="text-xs text-slate-500 space-y-1">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Check className="w-3 h-3 text-emerald-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className={`ml-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.selectedPlan === plan.id
                            ? 'border-primary bg-primary'
                            : 'border-slate-300'
                        }`}>
                          {formData.selectedPlan === plan.id && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-4 bg-slate-100 rounded-xl text-sm text-slate-600">
                    <strong>Payment Options:</strong> Credit card, debit card, personal check, or cash. 
                    Payments due the 1st class of each 4-week period. $5 late fee after the first week. 
                    $25 fee for returned checks.
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
                      <label className="label">First Name *</label>
                      <input
                        type="text"
                        name="parentFirstName"
                        value={formData.parentFirstName}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="label">Last Name *</label>
                      <input
                        type="text"
                        name="parentLastName"
                        value={formData.parentLastName}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Last name"
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
                        placeholder="(479) 555-1234"
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
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
                        placeholder="AR"
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
                        placeholder="72712"
                      />
                    </div>
                  </div>
                </section>

                {/* Child 1 Information */}
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
                        name="child1.firstName"
                        value={formData.child1.firstName}
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
                        name="child1.lastName"
                        value={formData.child1.lastName}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Last name"
                      />
                    </div>
                    <div>
                      <label className="label">Date of Birth *</label>
                      <input
                        type="date"
                        name="child1.dateOfBirth"
                        value={formData.child1.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label">Age *</label>
                      <input
                        type="number"
                        name="child1.age"
                        value={formData.child1.age}
                        onChange={handleChange}
                        required
                        min="2"
                        max="12"
                        className="input-field"
                        placeholder="Age"
                      />
                    </div>
                    <div>
                      <label className="label">School/Daycare *</label>
                      <input
                        type="text"
                        name="child1.school"
                        value={formData.child1.school}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="School or daycare name"
                      />
                    </div>
                    <div>
                      <label className="label">Shirt Size *</label>
                      <select
                        name="child1.shirtSize"
                        value={formData.child1.shirtSize}
                        onChange={handleChange}
                        required
                        className="input-field"
                      >
                        <option value="">Select size...</option>
                        {SHIRT_SIZES.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="child1.canHaveGummyBears"
                        checked={formData.child1.canHaveGummyBears}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      <span className="text-slate-700">My child can have gummy bears 🐻</span>
                    </label>
                  </div>
                </section>

                {/* Second Child Toggle */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Second Child (Half Price)</h3>
                  </div>
                  
                  <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-100 rounded-xl">
                    <input
                      type="checkbox"
                      name="hasSecondChild"
                      checked={formData.hasSecondChild}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <span className="text-slate-700 font-medium">I want to enroll a second child (50% discount)</span>
                  </label>
                  
                  {formData.hasSecondChild && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="label">Child's First Name *</label>
                          <input
                            type="text"
                            name="child2.firstName"
                            value={formData.child2.firstName}
                            onChange={handleChange}
                            required={formData.hasSecondChild}
                            className="input-field"
                            placeholder="First name"
                          />
                        </div>
                        <div>
                          <label className="label">Child's Last Name *</label>
                          <input
                            type="text"
                            name="child2.lastName"
                            value={formData.child2.lastName}
                            onChange={handleChange}
                            required={formData.hasSecondChild}
                            className="input-field"
                            placeholder="Last name"
                          />
                        </div>
                        <div>
                          <label className="label">Date of Birth *</label>
                          <input
                            type="date"
                            name="child2.dateOfBirth"
                            value={formData.child2.dateOfBirth}
                            onChange={handleChange}
                            required={formData.hasSecondChild}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="label">Age *</label>
                          <input
                            type="number"
                            name="child2.age"
                            value={formData.child2.age}
                            onChange={handleChange}
                            required={formData.hasSecondChild}
                            min="2"
                            max="12"
                            className="input-field"
                            placeholder="Age"
                          />
                        </div>
                        <div>
                          <label className="label">School/Daycare *</label>
                          <input
                            type="text"
                            name="child2.school"
                            value={formData.child2.school}
                            onChange={handleChange}
                            required={formData.hasSecondChild}
                            className="input-field"
                            placeholder="School or daycare name"
                          />
                        </div>
                        <div>
                          <label className="label">Shirt Size *</label>
                          <select
                            name="child2.shirtSize"
                            value={formData.child2.shirtSize}
                            onChange={handleChange}
                            required={formData.hasSecondChild}
                            className="input-field"
                          >
                            <option value="">Select size...</option>
                            {SHIRT_SIZES.map(size => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="child2.canHaveGummyBears"
                            checked={formData.child2.canHaveGummyBears}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                          />
                          <span className="text-slate-700">My child can have gummy bears 🐻</span>
                        </label>
                      </div>
                    </motion.div>
                  )}
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
                      <label className="label">Contact Name *</label>
                      <input
                        type="text"
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Emergency contact"
                      />
                    </div>
                    <div>
                      <label className="label">Contact Phone *</label>
                      <input
                        type="tel"
                        name="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="(479) 555-1234"
                      />
                    </div>
                    <div>
                      <label className="label">Relationship *</label>
                      <input
                        type="text"
                        name="emergencyRelation"
                        value={formData.emergencyRelation}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="e.g., Grandmother"
                      />
                    </div>
                  </div>
                </section>

                {/* Medical Info */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Medical Information</h3>
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
                        placeholder="Please list any medical conditions..."
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
                  </div>
                </section>

                {/* Permission & Release */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Permission & Release *</h3>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="permissionAgreed"
                        checked={formData.permissionAgreed}
                        onChange={handleChange}
                        required
                        className="w-5 h-5 mt-1 rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-slate-700 leading-relaxed">
                        By checking this box, I give my permission for my child to leave the daycare center, 
                        without an employee of the daycare center, in the hands of the TUMBLEBUS employee. 
                        I release TUMBLEBUS, their officers, instructors, and the daycare center from all 
                        responsibilities and all claims for injuries while participating in gymnastics and 
                        its related activities. I understand that my child's picture may be used in 
                        promotional materials. <strong>No names will be used.</strong>
                      </span>
                    </label>
                  </div>
                </section>

                {/* Additional Info */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-slate-500 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Additional Information</h3>
                  </div>
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
                    disabled={submitting || !formData.permissionAgreed}
                    className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold rounded-full h-14 text-lg shadow-lg shadow-primary/25 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Continue to Payment
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-sm text-slate-500 mt-4">
                    You'll be able to review your order before payment.
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
