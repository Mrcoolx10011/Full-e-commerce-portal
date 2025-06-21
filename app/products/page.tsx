"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Search, ShoppingCart, Filter, X, Loader2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  companyId: string
  companyName: string
  createdAt: string
  updatedAt: string
}

interface ProductsResponse {
  products: Product[]
  total: number
  hasMore: boolean
  metadata: {
    priceRange: { min: number; max: number }
    categories: string[]
  }
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()

  // State
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [metadata, setMetadata] = useState<ProductsResponse["metadata"] | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [total, setTotal] = useState(0)

  // Filters
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Pagination
  const [offset, setOffset] = useState(0)
  const limit = 20

  // Debounced search
  const [searchDebounce, setSearchDebounce] = useState<NodeJS.Timeout | null>(null)

  const fetchProducts = useCallback(
    async (resetOffset = false) => {
      try {
        if (resetOffset) {
          setLoading(true)
          setOffset(0)
        } else {
          setLoadingMore(true)
        }

        const currentOffset = resetOffset ? 0 : offset
        const params = new URLSearchParams({
          limit: limit.toString(),
          offset: currentOffset.toString(),
        })

        if (searchTerm) params.set("search", searchTerm)
        if (selectedCategory !== "all") params.set("category", selectedCategory)
        if (sortBy) params.set("sortBy", sortBy)
        if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString())
        if (priceRange[1] < 10000) params.set("maxPrice", priceRange[1].toString())

        const response = await fetch(`/api/products?${params}`)
        const data: ProductsResponse = await response.json()

        if (resetOffset) {
          setProducts(data.products)
        } else {
          setProducts((prev) => [...prev, ...data.products])
        }

        setHasMore(data.hasMore)
        setTotal(data.total)
        setMetadata(data.metadata)

        if (!resetOffset) {
          setOffset(currentOffset + limit)
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [searchTerm, selectedCategory, sortBy, priceRange, offset, limit, toast],
  )

  // Update URL params
  const updateURL = useCallback(() => {
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (selectedCategory !== "all") params.set("category", selectedCategory)
    if (sortBy !== "newest") params.set("sortBy", sortBy)
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString())
    if (priceRange[1] < 10000) params.set("maxPrice", priceRange[1].toString())

    const newURL = params.toString() ? `?${params.toString()}` : ""
    router.replace(`/products${newURL}`, { scroll: false })
  }, [searchTerm, selectedCategory, sortBy, priceRange, router])

  // Initial load and metadata
  useEffect(() => {
    fetchProducts(true)
  }, [])

  // Update URL when filters change
  useEffect(() => {
    updateURL()
  }, [updateURL])

  // Debounced search
  useEffect(() => {
    if (searchDebounce) {
      clearTimeout(searchDebounce)
    }

    const timeout = setTimeout(() => {
      fetchProducts(true)
    }, 500)

    setSearchDebounce(timeout)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [searchTerm])

  // Refetch when filters change (except search)
  useEffect(() => {
    fetchProducts(true)
  }, [selectedCategory, sortBy, priceRange])

  // Initialize price range from metadata
  useEffect(() => {
    if (metadata && priceRange[0] === 0 && priceRange[1] === 1000) {
      const minPrice = searchParams.get("minPrice")
      const maxPrice = searchParams.get("maxPrice")
      setPriceRange([
        minPrice ? Number.parseFloat(minPrice) : metadata.priceRange.min,
        maxPrice ? Number.parseFloat(maxPrice) : metadata.priceRange.max,
      ])
    }
  }, [metadata, searchParams])

  const handleAddToCart = (product: Product) => {
    addItem(product as any)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSortBy("newest")
    if (metadata) {
      setPriceRange([metadata.priceRange.min, metadata.priceRange.max])
    }
  }

  const loadMore = () => {
    fetchProducts(false)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600 mb-6">Discover amazing products from our partner companies</p>

        {/* Search and Quick Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products, companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {metadata?.categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="name_asc">Name: A to Z</SelectItem>
                <SelectItem value="name_desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => setFiltersOpen(!filtersOpen)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
          <CollapsibleContent>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Advanced Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div className="space-y-3">
                  <Label>
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  {metadata && (
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={metadata.priceRange.max}
                      min={metadata.priceRange.min}
                      step={1}
                      className="w-full"
                    />
                  )}
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${metadata?.priceRange.min || 0}</span>
                    <span>${metadata?.priceRange.max || 1000}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">
            Showing {products.length} of {total} products
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
          {(searchTerm ||
            selectedCategory !== "all" ||
            priceRange[0] > (metadata?.priceRange.min || 0) ||
            priceRange[1] < (metadata?.priceRange.max || 1000)) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all filters
            </Button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-100 relative">
              <img
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2">{product.category}</Badge>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
              <CardDescription className="line-clamp-2">{product.description}</CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-green-600">${product.price}</span>
                <span className="text-sm text-gray-500">by {product.companyName}</span>
              </div>

              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
                <Button onClick={() => handleAddToCart(product)} size="sm" className="px-3">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-8">
          <Button onClick={loadMore} disabled={loadingMore} variant="outline" size="lg">
            {loadingMore ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Products"
            )}
          </Button>
        </div>
      )}

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No products found matching your criteria.</p>
          <Button onClick={clearFilters} variant="outline">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
