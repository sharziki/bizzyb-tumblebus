'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BizzyBee } from '@/components/icons'
import { 
  ArrowLeft, ArrowRight, Check, Loader2, Baby, Users, Phone, 
  CreditCard, FileText, Home, Sparkles, Shield, UserPlus, X
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Pricing Plans from Stripe
const PRICING_PLANS = [
  {
    id: '1_child_reg',
    name: '1 Child + Registration',
    description: 'Gymnastics lessons for 1 child with registration',
    price: 7000, // cents
    displayPrice: '$70.00',
    popular: true,
  },
  {
    id: '2_children_reg',
    name: '2 Children + Registration',
    description: 'Gymnastics lessons for 2 children with registration',
    price: 11500,
    displayPrice: '$115.00',
    popular: false,
  },
  {
    id: '1_child_no_reg',
    name: '1 Child (w/o Registration)',
    description: 'Gymnastics lessons for 1 child without registration',
    price: 5000,
    displayPrice: '$50.00',
    popular: false,
  },
  {
    id: '2_children_no_reg',
    name: '2 Children (w/o Registration)',
    description: 'Gymnastics lessons for 2 children without registration',
    price: 7500,
    displayPrice: '$75.00',
    popular: false,
  },
  {
    id: 'single_week',
    name: '1 Week of TUMBLEBUS',
    description: 'Single week session on the TUMBLEBUS',
    price: 1250,
    displayPrice: '$12.50',
    popular: false,
  },
]

const SHIRT_SIZES = ['Youth XS', 'Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L', 'Adult XL']

const STEPS = [
  { id: 1, name: 'Plan', icon: Sparkles },
  { id: 2, name: 'Children', icon: Baby },
  { id: 3, name: 'Parent', icon: Users },
  { id: 4, name: 'Review', icon: FileText },
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

const emptyChild: ChildInfo = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  age: '',
  school: '',
  shirtSize: '',
  canHaveGummyBears: true,
}

export default function EnrollmentPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    selectedPlan: '',
    parentFirstName: '',
    parentLastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'AR',
    zipCode: '',
    children: [{ ...emptyChild }] as ChildInfo[],
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyRelation: '',
    medicalConditions: '',
    allergies: '',
    permissionAgreed: false,
    referralSource: '',
    notes: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const selectedPlanData = PRICING_PLANS.find(p => p.id === formData.selectedPlan)
  const needsTwoChildren = formData.selectedPlan.includes('2_children')

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateChild = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      children: prev.children.map((child, i) => 
        i === index ? { ...child, [field]: value } : child
      )
    }))
  }

  const addSecondChild = () => {
    if (formData.children.length < 2) {
      setFormData(prev => ({
        ...prev,
        children: [...prev.children, { ...emptyChild }]
      }))
    }
  }

  const removeSecondChild = () => {
    setFormData(prev => ({
      ...prev,
      children: [prev.children[0]]
    }))
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!formData.selectedPlan
      case 2:
        const requiredChildren = needsTwoChildren ? 2 : 1
        return formData.children.slice(0, requiredChildren).every(c => 
          c.firstName && c.lastName && c.dateOfBirth && c.age && c.school && c.shirtSize
        )
      case 3:
        return formData.parentFirstName && formData.parentLastName && 
               formData.email && formData.phone &&
               formData.emergencyContactName && formData.emergencyContactPhone && 
               formData.emergencyRelation && formData.permissionAgreed
      default:
        return true
    }
  }

  const nextStep = () => {
    if (step < 4 && canProceed()) {
      // Auto-add second child if plan requires it
      if (step === 1 && needsTwoChildren && formData.children.length < 2) {
        addSecondChild()
      }
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (!canProceed()) return
    setSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSubmitted(true)
    setSubmitting(false)
  }

  const enrollmentNumber = `TB-${Date.now().toString().slice(-6)}`

  // Success Screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto"
              >
                <Check className="w-10 h-10 text-emerald-500" />
              </motion.div>
            </div>
            <CardContent className="p-6 text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">You're Enrolled!</h1>
              <p className="text-slate-600 mb-6">Welcome to the Bizzy B's Tumblebus family!</p>
              
              <div className="bg-amber-50 rounded-2xl p-4 mb-6 border border-amber-200">
                <p className="text-sm text-amber-700 mb-1">Reference Number</p>
                <p className="text-3xl font-bold text-amber-600 font-mono">{enrollmentNumber}</p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
                <p className="font-semibold text-slate-900 mb-2">{selectedPlanData?.name}</p>
                <p className="text-2xl font-bold text-emerald-600">{selectedPlanData?.displayPrice}</p>
              </div>
              
              <p className="text-sm text-slate-500 mb-6">
                We'll contact you within 1-2 business days to confirm scheduling. Get ready to tumble! 🤸
              </p>
              
              <Link href="/">
                <Button className="w-full bg-slate-900 hover:bg-slate-800 rounded-full h-12">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BizzyBee className="w-8 h-8" animate={false} />
            <span className="font-bold text-slate-800">Bizzy B's</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className={cn(
                  "flex items-center gap-2",
                  step >= s.id ? "text-amber-600" : "text-slate-400"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    step > s.id ? "bg-amber-500 text-white" :
                    step === s.id ? "bg-amber-100 text-amber-600 ring-2 ring-amber-500" :
                    "bg-slate-100 text-slate-400"
                  )}>
                    {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{s.name}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn(
                    "w-8 sm:w-16 h-0.5 mx-2",
                    step > s.id ? "bg-amber-500" : "bg-slate-200"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Plan */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Choose Your Plan</h1>
                <p className="text-slate-600">Select the best option for your family</p>
              </div>

              <div className="space-y-3">
                {PRICING_PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => updateField('selectedPlan', plan.id)}
                    className={cn(
                      "w-full p-4 rounded-2xl border-2 text-left transition-all relative",
                      formData.selectedPlan === plan.id
                        ? "border-amber-500 bg-amber-50"
                        : "border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/50"
                    )}
                  >
                    {plan.popular && (
                      <span className="absolute -top-2 right-4 px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">{plan.name}</h3>
                        <p className="text-sm text-slate-500">{plan.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-slate-900">{plan.displayPrice}</span>
                      </div>
                    </div>
                    <div className={cn(
                      "absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      formData.selectedPlan === plan.id
                        ? "border-amber-500 bg-amber-500"
                        : "border-slate-300"
                    )}>
                      {formData.selectedPlan === plan.id && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Children Info */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Child Information</h1>
                <p className="text-slate-600">Tell us about your little tumbler(s)</p>
              </div>

              {formData.children.map((child, index) => (
                <Card key={index} className="mb-4 border-0 shadow-lg overflow-hidden">
                  <div className={cn(
                    "px-4 py-3 flex items-center justify-between",
                    index === 0 ? "bg-pink-500" : "bg-purple-500"
                  )}>
                    <div className="flex items-center gap-2 text-white">
                      <Baby className="w-5 h-5" />
                      <span className="font-semibold">
                        {index === 0 ? 'First Child' : 'Second Child'}
                      </span>
                    </div>
                    {index === 1 && !needsTwoChildren && (
                      <button
                        onClick={removeSecondChild}
                        className="text-white/80 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">First Name *</label>
                        <input
                          type="text"
                          value={child.firstName}
                          onChange={(e) => updateChild(index, 'firstName', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Last Name *</label>
                        <input
                          type="text"
                          value={child.lastName}
                          onChange={(e) => updateChild(index, 'lastName', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Date of Birth *</label>
                        <input
                          type="date"
                          value={child.dateOfBirth}
                          onChange={(e) => updateChild(index, 'dateOfBirth', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Age *</label>
                        <input
                          type="number"
                          min="2"
                          max="12"
                          value={child.age}
                          onChange={(e) => updateChild(index, 'age', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                          placeholder="Age"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">School/Daycare *</label>
                      <input
                        type="text"
                        value={child.school}
                        onChange={(e) => updateChild(index, 'school', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                        placeholder="School or daycare name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Shirt Size *</label>
                      <select
                        value={child.shirtSize}
                        onChange={(e) => updateChild(index, 'shirtSize', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-white"
                      >
                        <option value="">Select size...</option>
                        {SHIRT_SIZES.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={child.canHaveGummyBears}
                        onChange={(e) => updateChild(index, 'canHaveGummyBears', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-sm text-slate-700">My child can have gummy bears 🐻</span>
                    </label>
                  </CardContent>
                </Card>
              ))}

              {formData.children.length < 2 && !needsTwoChildren && (
                <button
                  onClick={addSecondChild}
                  className="w-full p-4 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-amber-400 hover:text-amber-600 transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Add Another Child
                </button>
              )}
            </motion.div>
          )}

          {/* Step 3: Parent & Emergency */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Contact Information</h1>
                <p className="text-slate-600">How can we reach you?</p>
              </div>

              <Card className="mb-4 border-0 shadow-lg overflow-hidden">
                <div className="px-4 py-3 bg-blue-500 flex items-center gap-2 text-white">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">Parent/Guardian</span>
                </div>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">First Name *</label>
                      <input
                        type="text"
                        value={formData.parentFirstName}
                        onChange={(e) => updateField('parentFirstName', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Last Name *</label>
                      <input
                        type="text"
                        value={formData.parentLastName}
                        onChange={(e) => updateField('parentLastName', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Phone *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                        placeholder="(479) 555-1234"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-4 border-0 shadow-lg overflow-hidden">
                <div className="px-4 py-3 bg-red-500 flex items-center gap-2 text-white">
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">Emergency Contact</span>
                </div>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Contact Name *</label>
                      <input
                        type="text"
                        value={formData.emergencyContactName}
                        onChange={(e) => updateField('emergencyContactName', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Relationship *</label>
                      <input
                        type="text"
                        value={formData.emergencyRelation}
                        onChange={(e) => updateField('emergencyRelation', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                        placeholder="e.g., Grandmother"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Phone *</label>
                    <input
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => updateField('emergencyContactPhone', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                      placeholder="(479) 555-1234"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="px-4 py-3 bg-amber-500 flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">Permission & Release</span>
                </div>
                <CardContent className="p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissionAgreed}
                      onChange={(e) => updateField('permissionAgreed', e.target.checked)}
                      className="w-5 h-5 mt-0.5 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-sm text-slate-600 leading-relaxed">
                      I give permission for my child to participate in TUMBLEBUS activities and release 
                      TUMBLEBUS, their officers, instructors, and the daycare center from all responsibilities 
                      and claims for injuries. I understand photos may be used in promotional materials 
                      (no names used). *
                    </span>
                  </label>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Review & Pay</h1>
                <p className="text-slate-600">Confirm your enrollment details</p>
              </div>

              <Card className="mb-4 border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Selected Plan</h3>
                    <span className="text-2xl font-bold text-emerald-600">{selectedPlanData?.displayPrice}</span>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl">
                    <p className="font-medium text-amber-900">{selectedPlanData?.name}</p>
                    <p className="text-sm text-amber-700">{selectedPlanData?.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-4 border-0 shadow-lg">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">Enrolled Children</h3>
                  {formData.children.map((child, i) => (
                    child.firstName && (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-2 last:mb-0">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                          <Baby className="w-5 h-5 text-pink-500" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{child.firstName} {child.lastName}</p>
                          <p className="text-sm text-slate-500">Age {child.age} • {child.school}</p>
                        </div>
                      </div>
                    )
                  ))}
                </CardContent>
              </Card>

              <Card className="mb-4 border-0 shadow-lg">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">Contact Info</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-slate-500">Parent:</span> {formData.parentFirstName} {formData.parentLastName}</p>
                    <p><span className="text-slate-500">Email:</span> {formData.email}</p>
                    <p><span className="text-slate-500">Phone:</span> {formData.phone}</p>
                    <p><span className="text-slate-500">Emergency:</span> {formData.emergencyContactName} ({formData.emergencyRelation})</p>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full h-14 text-lg shadow-lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Complete Enrollment • {selectedPlanData?.displayPrice}
                  </>
                )}
              </Button>
              
              <p className="text-center text-xs text-slate-500 mt-3">
                Secure payment powered by Stripe
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {step < 4 && (
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button
                onClick={prevStep}
                variant="outline"
                className="flex-1 h-12 rounded-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex-1 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-white disabled:opacity-50"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
