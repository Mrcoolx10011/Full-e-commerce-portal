import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { query } from "./db"

export interface User {
  id: string
  companyName: string
  email: string
  description?: string
  website?: string
}

export interface RegisterData {
  companyName: string
  email: string
  password: string
  description?: string
  website?: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
  } catch {
    return null
  }
}

export async function createUser(userData: RegisterData): Promise<User> {
  const hashedPassword = await hashPassword(userData.password)

  const result = await query(
    `INSERT INTO companies (company_name, email, password_hash, description, website)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, company_name, email, description, website`,
    [userData.companyName, userData.email, hashedPassword, userData.description, userData.website],
  )

  const user = result.rows[0]
  return {
    id: user.id,
    companyName: user.company_name,
    email: user.email,
    description: user.description,
    website: user.website,
  }
}

export async function findUserByEmail(email: string): Promise<(User & { passwordHash: string }) | null> {
  const result = await query(
    "SELECT id, company_name, email, password_hash, description, website FROM companies WHERE email = $1",
    [email],
  )

  if (result.rows.length === 0) return null

  const user = result.rows[0]
  return {
    id: user.id,
    companyName: user.company_name,
    email: user.email,
    passwordHash: user.password_hash,
    description: user.description,
    website: user.website,
  }
}

export async function findUserById(id: string): Promise<User | null> {
  const result = await query("SELECT id, company_name, email, description, website FROM companies WHERE id = $1", [id])

  if (result.rows.length === 0) return null

  const user = result.rows[0]
  return {
    id: user.id,
    companyName: user.company_name,
    email: user.email,
    description: user.description,
    website: user.website,
  }
}
