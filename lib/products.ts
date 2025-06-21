import { query } from "./db"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  companyId: string
  companyName: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateProductData {
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  companyId: string
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: "newest" | "oldest" | "price_low" | "price_high" | "name_asc" | "name_desc"
  limit?: number
  offset?: number
}

export async function getAllProducts(filters: ProductFilters = {}): Promise<{
  products: Product[]
  total: number
  hasMore: boolean
}> {
  const { category, minPrice, maxPrice, search, sortBy = "newest", limit = 20, offset = 0 } = filters

  const whereConditions: string[] = []
  const queryParams: any[] = []
  let paramCount = 1

  // Build WHERE conditions
  if (category && category !== "all") {
    whereConditions.push(`p.category = $${paramCount}`)
    queryParams.push(category)
    paramCount++
  }

  if (minPrice !== undefined && minPrice >= 0) {
    whereConditions.push(`p.price >= $${paramCount}`)
    queryParams.push(minPrice)
    paramCount++
  }

  if (maxPrice !== undefined && maxPrice >= 0) {
    whereConditions.push(`p.price <= $${paramCount}`)
    queryParams.push(maxPrice)
    paramCount++
  }

  if (search && search.trim()) {
    whereConditions.push(`(
      p.name ILIKE $${paramCount} OR 
      p.description ILIKE $${paramCount} OR 
      c.company_name ILIKE $${paramCount}
    )`)
    queryParams.push(`%${search.trim()}%`)
    paramCount++
  }

  // Build ORDER BY clause
  let orderBy = ""
  switch (sortBy) {
    case "newest":
      orderBy = "ORDER BY p.created_at DESC"
      break
    case "oldest":
      orderBy = "ORDER BY p.created_at ASC"
      break
    case "price_low":
      orderBy = "ORDER BY p.price ASC"
      break
    case "price_high":
      orderBy = "ORDER BY p.price DESC"
      break
    case "name_asc":
      orderBy = "ORDER BY p.name ASC"
      break
    case "name_desc":
      orderBy = "ORDER BY p.name DESC"
      break
    default:
      orderBy = "ORDER BY p.created_at DESC"
  }

  const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : ""

  // Get total count for pagination
  const countQuery = `
    SELECT COUNT(*) as total
    FROM products p
    JOIN companies c ON p.company_id = c.id
    ${whereClause}
  `

  const countResult = await query(countQuery, queryParams)
  const total = Number.parseInt(countResult.rows[0].total)

  // Get products with pagination
  const productsQuery = `
    SELECT p.id, p.name, p.description, p.price, p.category, p.image_url, 
           p.company_id, c.company_name, p.created_at, p.updated_at
    FROM products p
    JOIN companies c ON p.company_id = c.id
    ${whereClause}
    ${orderBy}
    LIMIT $${paramCount} OFFSET $${paramCount + 1}
  `

  queryParams.push(limit, offset)

  const result = await query(productsQuery, queryParams)

  const products = result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number.parseFloat(row.price),
    category: row.category,
    imageUrl: row.image_url,
    companyId: row.company_id,
    companyName: row.company_name,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }))

  return {
    products,
    total,
    hasMore: offset + limit < total,
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const result = await query(
    `
    SELECT p.id, p.name, p.description, p.price, p.category, p.image_url, 
           p.company_id, c.company_name, p.created_at, p.updated_at
    FROM products p
    JOIN companies c ON p.company_id = c.id
    WHERE p.id = $1
  `,
    [id],
  )

  if (result.rows.length === 0) return null

  const row = result.rows[0]
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number.parseFloat(row.price),
    category: row.category,
    imageUrl: row.image_url,
    companyId: row.company_id,
    companyName: row.company_name,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }
}

export async function getProductsByCompany(companyId: string): Promise<Product[]> {
  const result = await query(
    `
    SELECT p.id, p.name, p.description, p.price, p.category, p.image_url, 
           p.company_id, c.company_name, p.created_at, p.updated_at
    FROM products p
    JOIN companies c ON p.company_id = c.id
    WHERE p.company_id = $1
    ORDER BY p.created_at DESC
  `,
    [companyId],
  )

  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number.parseFloat(row.price),
    category: row.category,
    imageUrl: row.image_url,
    companyId: row.company_id,
    companyName: row.company_name,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }))
}

export async function createProduct(productData: CreateProductData): Promise<Product> {
  const result = await query(
    `
    INSERT INTO products (name, description, price, category, image_url, company_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, name, description, price, category, image_url, company_id, created_at, updated_at
  `,
    [
      productData.name,
      productData.description,
      productData.price,
      productData.category,
      productData.imageUrl,
      productData.companyId,
    ],
  )

  const product = result.rows[0]

  // Get company name
  const companyResult = await query("SELECT company_name FROM companies WHERE id = $1", [productData.companyId])

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number.parseFloat(product.price),
    category: product.category,
    imageUrl: product.image_url,
    companyId: product.company_id,
    companyName: companyResult.rows[0].company_name,
    createdAt: new Date(product.created_at),
    updatedAt: new Date(product.updated_at),
  }
}

export async function updateProduct(id: string, productData: Partial<CreateProductData>): Promise<Product | null> {
  const fields = []
  const values = []
  let paramCount = 1

  if (productData.name !== undefined) {
    fields.push(`name = $${paramCount}`)
    values.push(productData.name)
    paramCount++
  }
  if (productData.description !== undefined) {
    fields.push(`description = $${paramCount}`)
    values.push(productData.description)
    paramCount++
  }
  if (productData.price !== undefined) {
    fields.push(`price = $${paramCount}`)
    values.push(productData.price)
    paramCount++
  }
  if (productData.category !== undefined) {
    fields.push(`category = $${paramCount}`)
    values.push(productData.category)
    paramCount++
  }
  if (productData.imageUrl !== undefined) {
    fields.push(`image_url = $${paramCount}`)
    values.push(productData.imageUrl)
    paramCount++
  }

  if (fields.length === 0) return null

  fields.push(`updated_at = NOW()`)
  values.push(id)

  const result = await query(
    `
    UPDATE products 
    SET ${fields.join(", ")}
    WHERE id = $${paramCount}
    RETURNING id, name, description, price, category, image_url, company_id, created_at, updated_at
  `,
    values,
  )

  if (result.rows.length === 0) return null

  const product = result.rows[0]

  // Get company name
  const companyResult = await query("SELECT company_name FROM companies WHERE id = $1", [product.company_id])

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number.parseFloat(product.price),
    category: product.category,
    imageUrl: product.image_url,
    companyId: product.company_id,
    companyName: companyResult.rows[0].company_name,
    createdAt: new Date(product.created_at),
    updatedAt: new Date(product.updated_at),
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  const result = await query("DELETE FROM products WHERE id = $1", [id])
  return result.rowCount > 0
}

// Get price range for filters
export async function getPriceRange(): Promise<{ min: number; max: number }> {
  const result = await query("SELECT MIN(price) as min_price, MAX(price) as max_price FROM products")
  const row = result.rows[0]

  return {
    min: Number.parseFloat(row.min_price) || 0,
    max: Number.parseFloat(row.max_price) || 1000,
  }
}

// Get all categories
export async function getCategories(): Promise<string[]> {
  const result = await query("SELECT DISTINCT category FROM products ORDER BY category")
  return result.rows.map((row) => row.category)
}
