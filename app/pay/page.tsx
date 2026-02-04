'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BizzyBee } from '@/components/icons'
import { 
  ArrowLeft, ArrowRight, ShoppingCart, Trash2, Plus, Minus,
  CreditCard, Check, Loader2, Home, Users, Calendar, Package,
  X, ChevronRight
} from 'lucide-react'

interface CartItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  category: string
}

const PRODUCTS = {
  packages: [
    {
      id: 'pkg_1child_reg',
      name: '1 Child + Registration',
      description: 'Gymnastic lessons for 1 child with registration',
      price: 70.00,
      category: 'packages',
      icon: '🤸',
      popular: true,
    },
    {
      id: 'pkg_2children_reg',
      name: '2 Children + Registration',
      description: 'Gymnastic lessons for 2 children with registration',
      price: 115.00,
      category: 'packages',
      icon: '🤸‍♀️',
      badge: 'Best Value',
    },
    {
      id: 'pkg_1child_noreg',
      name: '1 Child (w/o Registration)',
      description: 'Gymnastic lessons for 1 child without registration',
      price: 50.00,
      category: 'packages',
      icon: '👧',
    },
    {
      id: 'pkg_2children_noreg',
      name: '2 Children (w/o Registration)',
      description: 'Gymnastic lessons for 2 children without registration',
      price: 75.00,
      category: 'packages',
      icon: '👧👦',
    },
  ],
  sessions: [
    {
      id: 'session_1week',
      name: '1 Week of TUMBLEBUS',
      description: 'Single week session on the TUMBLEBUS',
      price: 12.50,
      category: 'sessions',
      icon: '🚌',
    },
  ],
  misc: [
    {
      id: 'misc_5',
      name: 'Miscellaneous ($5)',
      description: 'Miscellaneous services and fees',
      price: 5.00,
      category: 'misc',
      icon: '📦',
    },
    {
      id: 'misc_10',
      name: 'Miscellaneous ($10)',
      description: 'Miscellaneous services and fees',
      price: 10.00,
      category: 'misc',
      icon: '📦',
    },
    {
      id: 'misc_15',
      name: 'Miscellaneous ($15)',
      description: 'Miscellaneous services and fees',
      price: 15.00,
      category: 'misc',
      icon: '📦',
    },
    {
      id: 'misc_20',
      name: 'Miscellaneous ($20)',
      description: 'Miscellaneous services and fees',
      price: 20.00,
      category: 'misc',
      icon: '📦',
    },
  ],
}

const STEPS = [
  { id: 1, name: 'Select Items', icon: Package },
  { id: 2, name: 'Review Cart', icon: ShoppingCart },
  { id: 3, name: 'Payment', icon: CreditCard },
]

export default function PayOnlinePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [activeCategory, setActiveCategory] = useState<'packages' | 'sessions' | 'misc'>('packages')

  // Customer info for checkout
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const addToCart = (product: typeof PRODUCTS.packages[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = async () => {
    setIsProcessing(true)
    // Simulate Stripe checkout
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsComplete(true)
    setIsProcessing(false)
  }

  // Success Screen
  if (isComplete) {
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
              
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
              <p className="text-slate-600 mb-6">
                Thank you for your payment. A receipt has been sent to your email.
              </p>
              
              <div className="bg-slate-100 rounded-xl p-4 mb-6 text-left">
                <p className="text-sm text-slate-600 mb-2">Amount Paid</p>
                <p className="text-3xl font-bold text-slate-900">${cartTotal.toFixed(2)}</p>
              </div>
              
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20 border-b">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <BizzyBee className="w-10 h-10" animate={false} />
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-slate-800">Bizzy B's</span>
                <span className="text-xs text-slate-500 block -mt-1">Pay Online</span>
              </div>
            </Link>
            
            {/* Cart Badge */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentStep(2)}
                className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-slate-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-xs font-bold rounded-full flex items-center justify-center text-slate-900">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    currentStep === step.id
                      ? 'bg-primary text-slate-900 font-semibold'
                      : currentStep > step.id
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <step.icon className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">{step.name}</span>
                </button>
                {index < STEPS.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 mx-1 sm:mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Items */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Products */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Select Your Items</h2>
                  
                  {/* Category Tabs */}
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                      { id: 'packages', label: 'Lesson Packages', icon: Users },
                      { id: 'sessions', label: 'Single Sessions', icon: Calendar },
                      { id: 'misc', label: 'Miscellaneous', icon: Package },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                          activeCategory === cat.id
                            ? 'bg-primary text-slate-900 font-semibold shadow-md'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border'
                        }`}
                      >
                        <cat.icon className="w-4 h-4" />
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Products Grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {PRODUCTS[activeCategory].map((product) => {
                      const inCart = cart.find(item => item.id === product.id)
                      return (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <Card className={`border-2 transition-all hover:shadow-lg ${
                            inCart ? 'border-primary bg-primary/5' : 'border-transparent'
                          }`}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-3xl">{product.icon}</span>
                                  <div>
                                    <h3 className="font-semibold text-slate-900">{product.name}</h3>
                                    {'badge' in product && product.badge && (
                                      <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                                        {product.badge}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <span className="text-xl font-bold text-primary">
                                  ${product.price.toFixed(2)}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600 mb-4">{product.description}</p>
                              
                              {inCart ? (
                                <div className="flex items-center justify-between bg-slate-100 rounded-lg p-2">
                                  <button
                                    onClick={() => updateQuantity(product.id, -1)}
                                    className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-slate-50"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="font-bold text-lg">{inCart.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(product.id, 1)}
                                    className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-slate-50"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <Button
                                  onClick={() => addToCart(product)}
                                  className="w-full bg-slate-900 hover:bg-slate-800 rounded-lg"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add to Cart
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Mini Cart Sidebar */}
                <div className="lg:w-80">
                  <Card className="border-0 shadow-lg sticky top-32">
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Your Cart
                      </h3>
                      
                      {cart.length === 0 ? (
                        <div className="text-center py-8">
                          <ShoppingCart className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                          <p className="text-slate-500">Your cart is empty</p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                            {cart.map((item) => (
                              <div key={item.id} className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-slate-900 text-sm truncate">{item.name}</p>
                                  <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-slate-400 hover:text-red-500"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-4">
                              <span className="font-semibold text-slate-600">Total</span>
                              <span className="text-2xl font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
                            </div>
                            <Button
                              onClick={() => setCurrentStep(2)}
                              className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-semibold rounded-full h-12"
                            >
                              Review Cart
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Review Cart */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Review Your Order</h2>
              
              <Card className="border-0 shadow-lg mb-6">
                <CardContent className="p-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-500 mb-4">Your cart is empty</p>
                      <Button onClick={() => setCurrentStep(1)} variant="outline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-l-lg"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-r-lg"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900">{item.name}</p>
                                <p className="text-sm text-slate-500">${item.price.toFixed(2)} each</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-slate-400 hover:text-red-500 p-2"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-6">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-lg font-semibold text-slate-600">Order Total</span>
                          <span className="text-3xl font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex gap-4">
                          <Button
                            onClick={() => setCurrentStep(1)}
                            variant="outline"
                            className="flex-1 rounded-full h-12"
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                          </Button>
                          <Button
                            onClick={() => setCurrentStep(3)}
                            className="flex-1 bg-primary hover:bg-primary/90 text-slate-900 font-semibold rounded-full h-12"
                          >
                            Proceed to Payment
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md mx-auto"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Payment Details</h2>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  {/* Order Summary */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-slate-900 mb-3">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span className="text-slate-600">{item.name} × {item.quantity}</span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t mt-3 pt-3 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Stripe Payment Button */}
                  <Button
                    onClick={handleCheckout}
                    disabled={isProcessing || !customerInfo.name || !customerInfo.email}
                    className="w-full bg-[#635bff] hover:bg-[#5851db] text-white font-semibold rounded-full h-14 text-lg shadow-lg disabled:opacity-50"
                  >
                    {isProcessing ? (
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
                  
                  <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    Secure payment powered by Stripe
                  </p>

                  <Button
                    onClick={() => setCurrentStep(2)}
                    variant="ghost"
                    className="w-full mt-4"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Cart
                  </Button>
                </CardContent>
              </Card>

              {/* Business Info */}
              <div className="mt-6 text-center text-sm text-slate-500">
                <BizzyBee className="w-8 h-8 mx-auto mb-2" animate={false} />
                <p className="font-semibold text-slate-700">TUMBLEBUS</p>
                <p>P.O. Box 47</p>
                <p>Flint, TX 75762</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
