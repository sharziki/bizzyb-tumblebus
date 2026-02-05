'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BizzyBee } from '@/components/icons'
import { 
  ArrowLeft, ArrowRight, Check, Loader2, Baby, Users, Phone, 
  CreditCard, Home, Shield, Mail, Search, ShoppingCart, Plus, Minus,
  Sparkles, UserCheck, X, Package
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Products from Stripe
const PRODUCTS = {
  packages: [
    {
      id: 'pkg_1child_reg',
      name: '1 Child + Registration',
      description: 'Gymnastic lessons for 1 child with registration',
      price: 70.00,
      childCount: 1,
      includesRegistration: true,
      popular: true,
    },
    {
      id: 'pkg_2children_reg',
      name: '2 Children + Registration',
      description: 'Gymnastic lessons for 2 children with registration',
      price: 115.00,
      childCount: 2,
      includesRegistration: true,
      badge: 'Best Value',
    },
    {
      id: 'pkg_1child_noreg',
      name: '1 Child (Returning)',
      description: 'Gymnastic lessons for 1 child - already registered',
      price: 50.00,
      childCount: 1,
      includesRegistration: false,
    },
    {
      id: 'pkg_2children_noreg',
      name: '2 Children (Returning)',
      description: 'Gymnastic lessons for 2 children - already registered',
      price: 75.00,
      childCount: 2,
      includesRegistration: false,
    },
  ],
  addons: [
    {
      id: 'session_1week',
      name: '1 Week of TUMBLEBUS',
      description: 'Single week session',
      price: 12.50,
    },
    {
      id: 'misc_5',
      name: 'Miscellaneous Fee ($5)',
      description: 'Additional services',
      price: 5.00,
    },
    {
      id: 'misc_10',
      name: 'Miscellaneous Fee ($10)',
      description: 'Additional services',
      price: 10.00,
    },
    {
      id: 'misc_15',
      name: 'Miscellaneous Fee ($15)',
      description: 'Additional services',
      price: 15.00,
    },
    {
      id: 'misc_20',
      name: 'Miscellaneous Fee ($20)',
      description: 'Additional services',
      price: 20.00,
    },
  ],
}

const SHIRT_SIZES = ['Youth XS', 'Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L', 'Adult XL']

// Mock database of existing customers
const MOCK_CUSTOMERS: Record<string, CustomerData> = {
  'sarah@email.com': {
    email: 'sarah@email.com',
    parentFirstName: 'Sarah',
    parentLastName: 'Johnson',
    phone: '(903) 555-1234',
    children: [
      { firstName: 'Emma', lastName: 'Johnson', age: '5', school: 'Bright Start Daycare', shirtSize: 'Youth S', canHaveGummyBears: true }
    ],
    emergencyContactName: 'Mike Johnson',
    emergencyContactPhone: '(903) 555-5678',
    emergencyRelation: 'Father',
  },
  'mike@email.com': {
    email: 'mike@email.com',
    parentFirstName: 'Mike',
    parentLastName: 'Thompson',
    phone: '(903) 555-9999',
    children: [
      { firstName: 'Liam', lastName: 'Thompson', age: '4', school: 'Little Stars', shirtSize: 'Youth XS', canHaveGummyBears: true },
      { firstName: 'Sophia', lastName: 'Thompson', age: '7', school: 'Little Stars', shirtSize: 'Youth M', canHaveGummyBears: false }
    ],
    emergencyContactName: 'Lisa Thompson',
    emergencyContactPhone: '(903) 555-8888',
    emergencyRelation: 'Mother',
  },
}

interface ChildInfo {
  firstName: string
  lastName: string
  dateOfBirth?: string
  age: string
  school: string
  shirtSize: string
  canHaveGummyBears: boolean
}

interface CustomerData {
  email: string
  parentFirstName: string
  parentLastName: string
  phone: string
  children: ChildInfo[]
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyRelation: string
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  childCount?: number
  includesRegistration?: boolean
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

const STEPS = [
  { id: 1, name: 'Email', icon: Mail },
  { id: 2, name: 'Package', icon: Package },
  { id: 3, name: 'Children', icon: Baby },
  { id: 4, name: 'Details', icon: Users },
  { id: 5, name: 'Pay', icon: CreditCard },
]

export default function EnrollmentPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [existingCustomer, setExistingCustomer] = useState<CustomerData | null>(null)
  const [isReturning, setIsReturning] = useState(false)
  
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedPackage, setSelectedPackage] = useState<typeof PRODUCTS.packages[0] | null>(null)
  
  const [formData, setFormData] = useState({
    parentFirstName: '',
    parentLastName: '',
    phone: '',
    children: [{ ...emptyChild }] as ChildInfo[],
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyRelation: '',
    permissionAgreed: false,
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Search for existing customer
  const searchCustomer = async () => {
    if (!email) return
    setIsSearching(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const found = MOCK_CUSTOMERS[email.toLowerCase()]
    if (found) {
      setExistingCustomer(found)
      setIsReturning(true)
      // Pre-fill form
      setFormData({
        parentFirstName: found.parentFirstName,
        parentLastName: found.parentLastName,
        phone: found.phone,
        children: found.children.map(c => ({ ...c })),
        emergencyContactName: found.emergencyContactName,
        emergencyContactPhone: found.emergencyContactPhone,
        emergencyRelation: found.emergencyRelation,
        permissionAgreed: false,
      })
    } else {
      setExistingCustomer(null)
      setIsReturning(false)
    }
    
    setIsSearching(false)
  }

  // Calculate required children based on selected package
  const requiredChildren = selectedPackage?.childCount || 1

  // Ensure we have enough child slots
  useEffect(() => {
    if (selectedPackage && formData.children.length < requiredChildren) {
      const newChildren = [...formData.children]
      while (newChildren.length < requiredChildren) {
        newChildren.push({ ...emptyChild })
      }
      setFormData(prev => ({ ...prev, children: newChildren }))
    }
  }, [selectedPackage, requiredChildren])

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

  const selectPackage = (pkg: typeof PRODUCTS.packages[0]) => {
    setSelectedPackage(pkg)
    setCart([{
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      quantity: 1,
      childCount: pkg.childCount,
      includesRegistration: pkg.includesRegistration,
    }])
  }

  const addAddon = (addon: typeof PRODUCTS.addons[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === addon.id)
      if (existing) {
        return prev.map(item =>
          item.id === addon.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { id: addon.id, name: addon.name, price: addon.price, quantity: 1 }]
    })
  }

  const removeAddon = (addonId: string) => {
    setCart(prev => prev.filter(item => item.id !== addonId || item.id === selectedPackage?.id))
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const canProceed = () => {
    switch (step) {
      case 1: return email.includes('@')
      case 2: return selectedPackage !== null
      case 3: 
        return formData.children.slice(0, requiredChildren).every(c => 
          c.firstName && c.lastName && c.age && c.school && c.shirtSize
        )
      case 4:
        return formData.parentFirstName && formData.parentLastName && 
               formData.phone && formData.emergencyContactName && 
               formData.emergencyContactPhone && formData.permissionAgreed
      default: return true
    }
  }

  const nextStep = () => {
    if (step < 5 && canProceed()) {
      if (step === 1) searchCustomer()
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
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
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Complete!</h1>
              <p className="text-slate-600 mb-6">Welcome to the Bizzy B's family!</p>
              
              <div className="bg-amber-50 rounded-2xl p-4 mb-4 border border-amber-200">
                <p className="text-sm text-amber-700 mb-1">Reference</p>
                <p className="text-2xl font-bold text-amber-600 font-mono">{enrollmentNumber}</p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-4 text-left">
                <p className="font-semibold text-slate-900">{selectedPackage?.name}</p>
                <p className="text-2xl font-bold text-emerald-600">${cartTotal.toFixed(2)}</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
                <p className="text-sm text-slate-500 mb-2">Enrolled Children</p>
                {formData.children.slice(0, requiredChildren).map((child, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1">
                    <Baby className="w-4 h-4 text-pink-500" />
                    <span className="font-medium">{child.firstName} {child.lastName}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-slate-500 mb-6">
                Confirmation sent to {email}
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
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
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
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className={cn(
                  "flex items-center gap-1.5",
                  step >= s.id ? "text-amber-600" : "text-slate-400"
                )}>
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                    step > s.id ? "bg-amber-500 text-white" :
                    step === s.id ? "bg-amber-100 text-amber-600 ring-2 ring-amber-500" :
                    "bg-slate-100 text-slate-400"
                  )}>
                    {step > s.id ? <Check className="w-3.5 h-3.5" /> : <s.icon className="w-3.5 h-3.5" />}
                  </div>
                  <span className="hidden sm:block text-xs font-medium">{s.name}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn(
                    "w-6 sm:w-10 h-0.5 mx-1.5",
                    step > s.id ? "bg-amber-500" : "bg-slate-200"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          
          {/* Step 1: Email */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md mx-auto"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-amber-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Let's Get Started!</h1>
                <p className="text-slate-600">Enter your email to begin enrollment</p>
              </div>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && canProceed() && nextStep()}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-lg"
                        placeholder="your@email.com"
                        autoFocus
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-500 text-center">
                    If you're a returning customer, we'll find your info automatically! ✨
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Package Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Returning Customer Banner */}
              {existingCustomer && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-900">Welcome back, {existingCustomer.parentFirstName}!</p>
                      <p className="text-sm text-emerald-700">We found your account. Your info is pre-filled.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Choose Your Package</h1>
                <p className="text-slate-600">
                  {isReturning ? 'Select a returning student package' : 'Select a package for your family'}
                </p>
              </div>

              {/* Main Packages */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {PRODUCTS.packages
                  .filter(pkg => isReturning ? !pkg.includesRegistration : pkg.includesRegistration)
                  .map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => selectPackage(pkg)}
                    className={cn(
                      "p-5 rounded-2xl border-2 text-left transition-all relative",
                      selectedPackage?.id === pkg.id
                        ? "border-amber-500 bg-amber-50 shadow-lg"
                        : "border-slate-200 bg-white hover:border-amber-300 hover:shadow"
                    )}
                  >
                    {pkg.popular && (
                      <Badge className="absolute -top-2 right-3 bg-amber-500 text-white">Popular</Badge>
                    )}
                    {'badge' in pkg && pkg.badge && (
                      <Badge className="absolute -top-2 right-3 bg-emerald-500 text-white">{pkg.badge}</Badge>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-900">{pkg.name}</h3>
                      <span className="text-2xl font-bold text-amber-600">${pkg.price}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{pkg.description}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Baby className="w-4 h-4" />
                      <span>{pkg.childCount} {pkg.childCount === 1 ? 'child' : 'children'}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Show other packages option */}
              {!isReturning && (
                <button
                  onClick={() => setIsReturning(true)}
                  className="w-full text-center text-sm text-amber-600 hover:text-amber-700 mb-6"
                >
                  Already registered? View returning student packages →
                </button>
              )}
              {isReturning && !existingCustomer && (
                <button
                  onClick={() => setIsReturning(false)}
                  className="w-full text-center text-sm text-amber-600 hover:text-amber-700 mb-6"
                >
                  ← New student? View packages with registration
                </button>
              )}

              {/* Add-ons */}
              {selectedPackage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="font-semibold text-slate-900 mb-3">Add-ons (Optional)</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PRODUCTS.addons.map((addon) => {
                      const inCart = cart.find(item => item.id === addon.id)
                      return (
                        <button
                          key={addon.id}
                          onClick={() => inCart ? removeAddon(addon.id) : addAddon(addon)}
                          className={cn(
                            "p-3 rounded-xl border text-left transition-all",
                            inCart
                              ? "border-amber-500 bg-amber-50"
                              : "border-slate-200 bg-white hover:border-amber-300"
                          )}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-900">{addon.name}</span>
                            {inCart && <Check className="w-4 h-4 text-amber-600" />}
                          </div>
                          <span className="text-amber-600 font-bold">${addon.price}</span>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Cart Summary */}
              {cart.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-slate-900 text-white rounded-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span className="font-medium">{cart.length} item{cart.length > 1 ? 's' : ''}</span>
                    </div>
                    <span className="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 3: Children Info */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Child Information</h1>
                <p className="text-slate-600">Tell us about your little tumbler{requiredChildren > 1 ? 's' : ''}</p>
              </div>

              {formData.children.slice(0, requiredChildren).map((child, index) => (
                <Card key={index} className="mb-4 border-0 shadow-lg overflow-hidden">
                  <div className={cn(
                    "px-4 py-3 flex items-center gap-2 text-white",
                    index === 0 ? "bg-pink-500" : "bg-purple-500"
                  )}>
                    <Baby className="w-5 h-5" />
                    <span className="font-semibold">
                      {requiredChildren === 1 ? 'Child' : index === 0 ? 'First Child' : 'Second Child'}
                    </span>
                    {existingCustomer && child.firstName && (
                      <Badge className="bg-white/20 text-white ml-auto">Pre-filled</Badge>
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
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Last Name *</label>
                        <input
                          type="text"
                          value={child.lastName}
                          onChange={(e) => updateChild(index, 'lastName', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Age *</label>
                        <input
                          type="number"
                          min="2"
                          max="12"
                          value={child.age}
                          onChange={(e) => updateChild(index, 'age', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                          placeholder="Age"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Shirt Size *</label>
                        <select
                          value={child.shirtSize}
                          onChange={(e) => updateChild(index, 'shirtSize', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-white"
                        >
                          <option value="">Select...</option>
                          {SHIRT_SIZES.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">School/Daycare *</label>
                      <input
                        type="text"
                        value={child.school}
                        onChange={(e) => updateChild(index, 'school', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                        placeholder="School or daycare name"
                      />
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
            </motion.div>
          )}

          {/* Step 4: Parent/Emergency Info */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Contact Details</h1>
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
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Last Name *</label>
                      <input
                        type="text"
                        value={formData.parentLastName}
                        onChange={(e) => updateField('parentLastName', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                      placeholder="(903) 555-1234"
                    />
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
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Name *</label>
                      <input
                        type="text"
                        value={formData.emergencyContactName}
                        onChange={(e) => updateField('emergencyContactName', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Relationship *</label>
                      <input
                        type="text"
                        value={formData.emergencyRelation}
                        onChange={(e) => updateField('emergencyRelation', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
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
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                      placeholder="(903) 555-1234"
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
                      TUMBLEBUS from all responsibilities and claims for injuries. Photos may be used 
                      in promotional materials (no names used). *
                    </span>
                  </label>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 5: Payment */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md mx-auto"
            >
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Complete Payment</h1>
                <p className="text-slate-600">Review and pay to finalize enrollment</p>
              </div>

              <Card className="border-0 shadow-lg mb-6">
                <CardContent className="p-5">
                  {/* Order Summary */}
                  <h3 className="font-semibold text-slate-900 mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <div>
                          <p className="font-medium text-slate-900">{item.name}</p>
                          <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-2xl text-emerald-600">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Children Summary */}
                  <div className="p-3 bg-amber-50 rounded-xl mb-4">
                    <p className="text-sm font-medium text-amber-900 mb-2">Enrolling:</p>
                    {formData.children.slice(0, requiredChildren).map((child, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-amber-800">
                        <Baby className="w-4 h-4" />
                        <span>{child.firstName} {child.lastName} (Age {child.age})</span>
                      </div>
                    ))}
                  </div>

                  {/* Parent Info */}
                  <div className="text-sm text-slate-600 mb-6">
                    <p><strong>Parent:</strong> {formData.parentFirstName} {formData.parentLastName}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                  </div>

                  {/* Pay Button */}
                  <Button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full bg-[#635bff] hover:bg-[#5851db] text-white font-bold rounded-full h-14 text-lg shadow-lg"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Pay ${cartTotal.toFixed(2)}
                      </>
                    )}
                  </Button>
                  
                  <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" /> Secure payment powered by Stripe
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {step < 5 && (
          <div className="flex gap-3 mt-8 max-w-md mx-auto">
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
              disabled={!canProceed() || isSearching}
              className="flex-1 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-white disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
