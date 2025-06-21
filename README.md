# MarketPlace E-commerce Portal

A full-stack e-commerce platform built with Next.js, PostgreSQL, and TypeScript.

## Features

- **Company Registration & Authentication**: JWT-based auth with secure password hashing
- **Product Management**: Full CRUD operations for products
- **Shopping Cart**: Add, remove, and manage cart items
- **Database Integration**: PostgreSQL with proper schema design
- **API Routes**: RESTful API endpoints for all operations
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Setup Instructions

### 1. Database Setup

First, set up a PostgreSQL database. You can use:
- Local PostgreSQL installation
- Docker: `docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`
- Cloud services like Neon, Supabase, or AWS RDS

### 2. Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
DATABASE_URL=postgresql://username:password@localhost:5432/marketplace_db
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000
\`\`\`

### 3. Database Schema

Run the SQL scripts to create tables and seed data:

1. Execute `scripts/01-create-tables.sql` to create the database schema
2. Execute `scripts/02-seed-sample-data.sql` to add sample data

### 4. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 5. Run the Application

\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new company
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product (authenticated)
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product (authenticated, owner only)
- `DELETE /api/products/[id]` - Delete product (authenticated, owner only)
- `GET /api/products/company/[companyId]` - Get products by company

## Default Login Credentials

For testing, you can use these sample accounts:
- Email: `contact@techcorp.com`, Password: `password123`
- Email: `hello@ecowear.com`, Password: `password123`
- Email: `info@homestyle.com`, Password: `password123`
- Email: `support@fitlife.com`, Password: `password123`

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL
- **Authentication**: JWT, bcryptjs
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
