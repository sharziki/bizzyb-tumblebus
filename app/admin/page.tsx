'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BizzyBee } from '@/components/icons'
import { 
  ArrowLeft, Lock, Mail, Phone, 
  ClipboardList, Users, Calendar, BarChart3
} from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20 border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
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

      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Coming Soon Card */}
          <Card className="border-0 shadow-xl mb-8">
            <CardContent className="p-8 sm:p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Lock className="w-10 h-10 text-slate-400" />
              </motion.div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Admin Dashboard
              </h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                This is where you'll manage enrollments, view reports, and handle administrative tasks.
              </p>

              {/* Feature Preview */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: ClipboardList, label: 'Manage Enrollments', desc: 'Review and approve applications' },
                  { icon: Users, label: 'Student Directory', desc: 'View all enrolled students' },
                  { icon: Calendar, label: 'Schedule', desc: 'Manage classes and events' },
                  { icon: BarChart3, label: 'Reports', desc: 'Analytics and insights' },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-slate-50 rounded-xl p-4 text-left border border-slate-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{feature.label}</p>
                        <p className="text-sm text-slate-500">{feature.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <p className="text-amber-800 font-medium mb-2">
                  📬 Enrollment notifications are sent to your email
                </p>
                <p className="text-sm text-amber-700">
                  When someone submits an enrollment form, you'll receive the details directly to your inbox.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Need a full admin system?</h3>
              <p className="text-slate-600 text-sm mb-4">
                We can add database integration, user authentication, and a complete enrollment management system.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="mailto:info@bizzybtumblebus.com">
                  <Button variant="outline" className="w-full sm:w-auto rounded-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Us
                  </Button>
                </a>
                <a href="tel:+15551234567">
                  <Button variant="ghost" className="w-full sm:w-auto rounded-full">
                    <Phone className="w-4 h-4 mr-2" />
                    (555) 123-4567
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
