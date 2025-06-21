import { Pool, type PoolClient } from "pg"

// Create a connection pool for better performance in production
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  // Production optimizations
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
  maxUses: 7500, // Close (and replace) a connection after it has been used 7500 times
})

// Enhanced query function with error handling and logging
export async function query(text: string, params?: any[]) {
  const start = Date.now()
  let client: PoolClient | undefined

  try {
    client = await pool.connect()
    const res = await client.query(text, params)
    const duration = Date.now() - start

    // Log slow queries in production
    if (duration > 1000) {
      console.warn(`Slow query detected (${duration}ms):`, { text: text.substring(0, 100), params })
    }

    if (process.env.NODE_ENV === "development") {
      console.log("Executed query", { text: text.substring(0, 100), duration, rows: res.rowCount })
    }

    return res
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  } finally {
    if (client) {
      client.release()
    }
  }
}

// Transaction support for complex operations
export async function transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect()

  try {
    await client.query("BEGIN")
    const result = await callback(client)
    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

// Health check for monitoring
export async function healthCheck(): Promise<boolean> {
  try {
    const result = await query("SELECT 1 as health")
    return result.rows[0]?.health === 1
  } catch (error) {
    console.error("Database health check failed:", error)
    return false
  }
}

// Graceful shutdown
export async function closePool(): Promise<void> {
  await pool.end()
}

export default pool
