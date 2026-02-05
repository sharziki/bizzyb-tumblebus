'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { BizzyBee, Tumblebus, GymnastKid, HoneycombPattern, MonkeyBars, Slide } from '@/components/icons'
import { 
  Menu, Phone, Mail, MapPin, Star, Check, ChevronRight,
  GraduationCap, PartyPopper, Calendar, Shield, Heart, Sparkles,
  Facebook, Instagram, ArrowRight
} from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

// Animated section wrapper
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#equipment', label: 'Equipment' },
    { href: '#contact', label: 'Contact' },
    { href: '/pay', label: 'Pay Online' },
  ]

  const equipment = [
    { icon: <MonkeyBars className="w-12 h-12 mx-auto" />, name: 'Monkey Bars', desc: 'Build upper body strength' },
    { icon: '🎪', name: 'Trampoline', desc: 'Safe bouncing fun' },
    { icon: '🤸', name: 'Tumbling Mats', desc: 'Soft landing zones' },
    { icon: '⚖️', name: 'Balance Beam', desc: 'Coordination skills' },
    { icon: '🏋️', name: 'Mini Vault', desc: 'Confidence building' },
    { icon: '⭕', name: 'Rings', desc: 'Grip strength' },
    { icon: <Slide className="w-12 h-12 mx-auto" />, name: 'Slide', desc: 'Classic fun' },
    { icon: '🧗', name: 'Climbing Wall', desc: 'Adventure awaits' },
  ]

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Daycare Director',
      text: 'My kids LOVE Tumblebus day! They talk about it all week. Best decision we made for our facility!',
      rating: 5
    },
    {
      name: 'Jennifer T.',
      role: 'Parent',
      text: "We had the Tumblebus for my daughter's 5th birthday. The kids had a blast and the staff was amazing!",
      rating: 5
    },
    {
      name: 'Amanda R.',
      role: 'School Administrator',
      text: 'Professional, fun, and the kids get great exercise. Highly recommend for any school or daycare!',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ 
          backgroundColor: `rgba(255, 255, 255, ${headerOpacity})`,
          backdropFilter: 'blur(12px)',
          boxShadow: `0 1px 3px rgba(0,0,0,${headerOpacity.get() * 0.1})`
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <BizzyBee className="w-10 h-10 md:w-12 md:h-12" animate={false} />
              <div className="flex flex-col">
                <span className="font-bold text-lg md:text-xl text-slate-800 group-hover:text-primary transition-colors">
                  Bizzy B's
                </span>
                <span className="text-xs text-muted-foreground -mt-1 hidden sm:block">Tumblebus</span>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <Link href="/enroll" className="ml-4">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full px-6 shadow-lg shadow-primary/25">
                  Enroll Now
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <BizzyBee className="w-10 h-10" animate={false} />
                    <span className="font-bold text-xl">Bizzy B's</span>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-3 text-lg font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                  <Link href="/enroll" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full">
                      Enroll Now
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 opacity-30">
          <HoneycombPattern opacity={0.08} />
        </div>
        
        {/* Floating decorations */}
        <motion.div 
          className="absolute top-32 right-[10%] opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        >
          <BizzyBee className="w-16 h-16" animate={false} />
        </motion.div>
        <motion.div 
          className="absolute bottom-20 left-[5%] opacity-20"
          animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
        >
          <BizzyBee className="w-12 h-12" animate={false} />
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-primary/20 text-slate-800 hover:bg-primary/30 mb-6 py-1.5 px-4 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-1.5" />
                Now Booking for 2026!
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                We Bring the{' '}
                <span className="text-gradient-honey">GYM</span>
                {' '}to{' '}
                <span className="relative">
                  <span className="text-gradient-navy">YOU!</span>
                  <motion.svg 
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 100 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <motion.path
                      d="M0 4 Q25 0 50 4 T100 4"
                      stroke="#F59E0B"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                The Tumblebus is a full-sized school bus converted into a safe, 
                fun, child-sized gym! Perfect for daycares, schools, birthday parties 
                & special events.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/enroll">
                  <Button size="lg" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full px-8 h-14 text-lg shadow-xl shadow-slate-900/20">
                    <PartyPopper className="w-5 h-5 mr-2" />
                    Enroll Now
                  </Button>
                </Link>
                <a href="#services">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-slate-300 hover:border-primary hover:bg-primary/5 rounded-full px-8 h-14 text-lg">
                    Learn More
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                {/* Main card */}
                <div className="bg-white rounded-3xl shadow-2xl shadow-amber-500/10 p-6 md:p-8">
                  <Tumblebus className="w-full h-auto" animate={false} />
                  <div className="flex justify-center gap-6 mt-6">
                    <GymnastKid variant="tumble" className="w-12 h-12" color="#F97316" />
                    <GymnastKid variant="jump" className="w-12 h-12" color="#0EA5E9" />
                    <GymnastKid variant="balance" className="w-12 h-12" color="#10B981" />
                  </div>
                </div>
                
                {/* Floating badges */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-coral text-white rounded-2xl p-3 shadow-lg"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <Star className="w-6 h-6 fill-current" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-slate-900 text-white rounded-2xl py-2 px-4 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <span className="text-sm font-semibold">Ages 2-10</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 bg-white relative">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                About Us
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                Welcome to the <span className="text-gradient-honey">TUMBLEBUS!</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We're excited that you've decided to tumble through and learn about us! 
                We have a unique and fun way to keep your little ones happy and fit.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: GraduationCap, 
                  title: 'Daycares & Schools', 
                  desc: 'We bring physical education right to your facility! Kids get exercise without leaving the premises.',
                  color: 'bg-blue-500'
                },
                { 
                  icon: PartyPopper, 
                  title: 'Birthday Parties', 
                  desc: "Make your child's birthday unforgettable with our mobile gym party experience!",
                  color: 'bg-pink-500'
                },
                { 
                  icon: Calendar, 
                  title: 'Special Events', 
                  desc: 'Festivals, community events, church gatherings - we add fun to any occasion!',
                  color: 'bg-emerald-500'
                },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="h-full border-0 shadow-lg shadow-slate-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                    <CardContent className="p-8">
                      <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <HoneycombPattern opacity={0.03} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                Our Services
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                Choose Your <span className="text-gradient-honey">Program</span>
              </h2>
              <p className="text-lg text-slate-600">Pick the perfect option for your little ones!</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Weekly Programs */}
              <motion.div variants={scaleIn}>
                <Card className="h-full border-0 shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 text-white">
                    <GraduationCap className="w-10 h-10 mb-3" />
                    <h3 className="text-2xl font-bold mb-1">Weekly Programs</h3>
                    <p className="opacity-90">Perfect for daycares and schools</p>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-4 mb-6">
                      {[
                        'Weekly visits to your location',
                        'Age-appropriate classes (2-10 years)',
                        'Certified instructors',
                        'Progress tracking',
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </div>
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/enroll">
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full h-12">
                        Enroll Your Facility
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Party Packages */}
              <motion.div variants={scaleIn}>
                <Card className="h-full border-0 shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-br from-pink-400 to-rose-500 p-6 text-white">
                    <PartyPopper className="w-10 h-10 mb-3" />
                    <h3 className="text-2xl font-bold mb-1">Party Packages</h3>
                    <p className="opacity-90">Make birthdays unforgettable!</p>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-4 mb-6">
                      {[
                        '1-2 hour party sessions',
                        'Up to 15 kids per party',
                        'Party games & activities',
                        'We come to you!',
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </div>
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/enroll">
                      <Button variant="outline" className="w-full border-2 border-pink-500 text-pink-600 hover:bg-pink-50 rounded-full h-12">
                        Book a Party
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Equipment Section */}
      <section id="equipment" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                Inside the Bus
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                Our <span className="text-gradient-honey">Equipment</span>
              </h2>
              <p className="text-lg text-slate-600">The Tumblebus is packed with exciting gear!</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
              {equipment.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 md:p-6 text-center cursor-pointer border border-amber-100"
                >
                  <div className="text-4xl md:text-5xl mb-3">{item.icon}</div>
                  <p className="font-bold text-slate-800 mb-1">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-10 text-white text-center"
            >
              <Shield className="w-12 h-12 mx-auto mb-4 text-amber-400" />
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Safety First!</h3>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                All equipment is child-sized and safety-tested. Our certified instructors 
                supervise all activities. The bus is climate-controlled for year-round comfort!
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                What Parents <span className="text-gradient-honey">Say</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((review, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="h-full border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex gap-1 text-amber-400 mb-4">
                        {[...Array(review.rating)].map((_, j) => (
                          <Star key={j} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-600 italic mb-6 leading-relaxed">"{review.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{review.name}</p>
                          <p className="text-sm text-slate-500">{review.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                Get in Touch
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                Let's <span className="text-gradient-honey">Connect!</span>
              </h2>
              <p className="text-lg text-slate-600">
                Ready to bring the fun to your little ones? We'd love to hear from you!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div variants={fadeInUp} className="space-y-8">
                {[
                  { icon: Phone, label: 'Phone', value: '(903) 504-1644', href: 'tel:9035041644' },
                  { icon: Mail, label: 'Email', value: 'info@bizzybtumblebus.com', href: 'mailto:info@bizzybtumblebus.com' },
                  { icon: MapPin, label: 'Service Area', value: 'Flint, TX 75762 & Surrounding Areas', href: null },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-semibold text-slate-900 hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-slate-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-3 pt-4">
                  <a href="#" className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Contact</h3>
                    <form className="space-y-4">
                      <input type="text" placeholder="Your Name" className="input-field" />
                      <input type="email" placeholder="Your Email" className="input-field" />
                      <input type="tel" placeholder="Phone Number" className="input-field" />
                      <textarea placeholder="How can we help?" rows={3} className="input-field resize-none" />
                      <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full h-12">
                        Send Message
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <HoneycombPattern opacity={0.3} />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BizzyBee className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Buzz the Fun to Your Little Ones?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Enroll today and give your kids the gift of fitness and fun!
            </p>
            <Link href="/enroll">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full px-10 h-16 text-lg shadow-2xl shadow-amber-500/30">
                <Heart className="w-5 h-5 mr-2" />
                Start Enrollment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BizzyBee className="w-10 h-10" animate={false} />
                <span className="font-bold text-xl">Bizzy B's</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Bringing fitness and fun to your children since 2015.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-slate-400">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-primary transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Services</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/enroll" className="hover:text-primary transition-colors">Enroll Now</Link></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Weekly Programs</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Birthday Parties</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Special Events</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Contact</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> (903) 504-1644
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> info@bizzybtumblebus.com
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Mon-Sat: 8am-6pm
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 Bizzy B's Tumblebus. All rights reserved.
            </p>
            <Link href="/admin" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
