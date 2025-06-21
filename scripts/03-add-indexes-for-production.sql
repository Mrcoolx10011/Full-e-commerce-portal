-- Add indexes for better performance in production

-- Index for product filtering and sorting
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

-- Composite indexes for common filter combinations
CREATE INDEX IF NOT EXISTS idx_products_category_price ON products(category, price);
CREATE INDEX IF NOT EXISTS idx_products_category_created_at ON products(category, created_at DESC);

-- Full-text search index for product names and descriptions
CREATE INDEX IF NOT EXISTS idx_products_search ON products USING gin(to_tsvector('english', name || ' ' || description));

-- Index for company lookups
CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(company_name);

-- Partial indexes for active products (if you add status field later)
-- CREATE INDEX IF NOT EXISTS idx_products_active ON products(created_at DESC) WHERE status = 'active';

-- Update table statistics for better query planning
ANALYZE products;
ANALYZE companies;

-- Display index information
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename IN ('products', 'companies')
ORDER BY tablename, indexname;
