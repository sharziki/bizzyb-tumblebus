# 🚌 Bizzy B's Tumblebus - Website & Enrollment System

A modern, mobile-friendly website and enrollment system for Bizzy B's Tumblebus - a mobile gymnastics and tumbling service for kids.

## ✨ Features

### 🌐 Public Website
- **Modern landing page** with hero, services, equipment showcase
- **Mobile-responsive** design
- **Fast loading** with Next.js
- **SEO optimized**

### 📝 Enrollment System
- **Clean enrollment form** replacing unreliable Google Forms
- **Automatic enrollment numbers** (#1, #2, #3...)
- **Confirmation page** with enrollment number
- **No more disappearing entries!**

### 👩‍💼 Admin Dashboard
- **New enrollment alerts** - see new signups immediately
- **Search** by name, email, or phone
- **Filter** by status (pending/approved/waitlist/cancelled)
- **One-click status updates**
- **Pagination** - no more clicking through 67 entries!
- **Full enrollment details** in side panel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (Vercel Postgres, Supabase, etc.)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/bizzyb-tumblebus.git
cd bizzyb-tumblebus
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment:
\`\`\`bash
cp .env.example .env
# Add your DATABASE_URL
\`\`\`

4. Set up database:
\`\`\`bash
npx prisma db push
\`\`\`

5. Run development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open:
   - Website: http://localhost:3000
   - Enrollment: http://localhost:3000/enroll
   - Admin: http://localhost:3000/admin

## 📁 Project Structure

\`\`\`
bizzyb-tumblebus/
├── app/
│   ├── page.tsx          # Landing page
│   ├── enroll/
│   │   └── page.tsx      # Enrollment form
│   ├── admin/
│   │   └── page.tsx      # Admin dashboard
│   ├── api/
│   │   └── enrollments/  # API routes
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
└── README.md
\`\`\`

## 🎯 Key Improvements Over Google Forms

| Google Forms Problem | Our Solution |
|---------------------|--------------|
| Entries disappearing | Reliable PostgreSQL database |
| Clicking 67 times to find new student | New entries at top with alerts |
| No search | Full-text search |
| Confusing interface | Clean, intuitive admin panel |
| Not professional looking | Modern, branded design |

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy!

### Database Options
- **Vercel Postgres** - Easy Vercel integration
- **Supabase** - Free tier available
- **PlanetScale** - MySQL alternative
- **Railway** - Simple hosting

## 📞 Support

For customization requests or support, contact the development team.

---

Built with ❤️ using Next.js, Tailwind CSS, and Prisma
