export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  companyId: string
  companyName: string
}

// Sample data for demonstration - More comprehensive product catalog
const sampleProducts: Product[] = [
  // TechCorp Products
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones",
    description:
      "Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality. Perfect for music lovers and professionals.",
    price: 299.99,
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample1",
    companyName: "TechCorp",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description:
      "Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 50+ workout modes. Water-resistant up to 50 meters.",
    price: 249.99,
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample1",
    companyName: "TechCorp",
  },
  {
    id: "3",
    name: "Wireless Charging Pad",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.",
    price: 39.99,
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample1",
    companyName: "TechCorp",
  },

  // EcoWear Products
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    description:
      "100% organic cotton t-shirt made from sustainably sourced materials. Soft, comfortable, and available in multiple colors.",
    price: 29.99,
    category: "Clothing",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample2",
    companyName: "EcoWear",
  },
  {
    id: "5",
    name: "Recycled Denim Jeans",
    description:
      "Stylish jeans made from 80% recycled denim. Comfortable fit with modern styling and eco-friendly production process.",
    price: 89.99,
    category: "Clothing",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample2",
    companyName: "EcoWear",
  },
  {
    id: "6",
    name: "Bamboo Fiber Hoodie",
    description:
      "Ultra-soft hoodie made from bamboo fiber. Naturally antibacterial, moisture-wicking, and incredibly comfortable.",
    price: 69.99,
    category: "Clothing",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample2",
    companyName: "EcoWear",
  },

  // HomeStyle Products
  {
    id: "7",
    name: "Smart Home Security Camera",
    description:
      "1080p HD security camera with night vision, two-way audio, and smartphone app control. Easy installation and cloud storage.",
    price: 129.99,
    category: "Home & Garden",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample3",
    companyName: "HomeStyle",
  },
  {
    id: "8",
    name: "LED Smart Bulb Set",
    description:
      "Set of 4 color-changing LED smart bulbs. Control brightness and color via smartphone app. Energy-efficient and long-lasting.",
    price: 59.99,
    category: "Home & Garden",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample3",
    companyName: "HomeStyle",
  },
  {
    id: "9",
    name: "Ceramic Plant Pot Set",
    description:
      "Beautiful set of 3 ceramic plant pots with drainage holes and saucers. Perfect for indoor plants and home decoration.",
    price: 34.99,
    category: "Home & Garden",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample3",
    companyName: "HomeStyle",
  },

  // FitLife Products
  {
    id: "10",
    name: "Adjustable Dumbbells Set",
    description:
      "Space-saving adjustable dumbbells with weight range from 5-50 lbs each. Perfect for home workouts and strength training.",
    price: 299.99,
    category: "Sports",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample4",
    companyName: "FitLife",
  },
  {
    id: "11",
    name: "Yoga Mat Premium",
    description:
      "Non-slip yoga mat made from eco-friendly TPE material. Extra thick for comfort with alignment lines for proper positioning.",
    price: 49.99,
    category: "Sports",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample4",
    companyName: "FitLife",
  },
  {
    id: "12",
    name: "Resistance Bands Set",
    description:
      "Complete resistance bands set with 5 different resistance levels, door anchor, handles, and ankle straps. Perfect for full-body workouts.",
    price: 24.99,
    category: "Sports",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample4",
    companyName: "FitLife",
  },

  // BookHaven Products
  {
    id: "13",
    name: "The Art of Programming",
    description:
      "Comprehensive guide to modern programming practices. Covers algorithms, data structures, and best practices for software development.",
    price: 45.99,
    category: "Books",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample5",
    companyName: "BookHaven",
  },
  {
    id: "14",
    name: "Mindfulness and Meditation",
    description:
      "A practical guide to mindfulness and meditation techniques for stress reduction and mental well-being. Includes guided exercises.",
    price: 19.99,
    category: "Books",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample5",
    companyName: "BookHaven",
  },
  {
    id: "15",
    name: "Cooking Masterclass",
    description:
      "Professional cooking techniques and recipes from world-renowned chefs. Step-by-step instructions with beautiful photography.",
    price: 39.99,
    category: "Books",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample5",
    companyName: "BookHaven",
  },

  // ToyWorld Products
  {
    id: "16",
    name: "Educational Building Blocks",
    description:
      "STEM-focused building blocks set that promotes creativity and problem-solving skills. Safe, non-toxic materials for ages 3+.",
    price: 34.99,
    category: "Toys",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample6",
    companyName: "ToyWorld",
  },
  {
    id: "17",
    name: "Remote Control Drone",
    description:
      "Easy-to-fly drone with HD camera, altitude hold, and one-key return function. Perfect for beginners and aerial photography.",
    price: 89.99,
    category: "Toys",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample6",
    companyName: "ToyWorld",
  },
  {
    id: "18",
    name: "Interactive Robot Pet",
    description:
      "AI-powered robot pet that responds to voice commands and touch. Teaches kids about technology while providing companionship.",
    price: 149.99,
    category: "Toys",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample6",
    companyName: "ToyWorld",
  },

  // GourmetBites Products
  {
    id: "19",
    name: "Artisan Coffee Blend",
    description:
      "Premium coffee blend sourced from single-origin farms. Medium roast with notes of chocolate and caramel. Freshly roasted to order.",
    price: 24.99,
    category: "Food & Beverage",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample7",
    companyName: "GourmetBites",
  },
  {
    id: "20",
    name: "Organic Honey Set",
    description:
      "Collection of 3 organic honey varieties: wildflower, clover, and orange blossom. Raw, unfiltered, and locally sourced.",
    price: 32.99,
    category: "Food & Beverage",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample7",
    companyName: "GourmetBites",
  },
  {
    id: "21",
    name: "Gourmet Spice Collection",
    description:
      "Curated collection of 12 premium spices from around the world. Includes recipe cards and storage containers.",
    price: 49.99,
    category: "Food & Beverage",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample7",
    companyName: "GourmetBites",
  },

  // BeautyEssentials Products
  {
    id: "22",
    name: "Natural Face Serum",
    description:
      "Anti-aging face serum with vitamin C, hyaluronic acid, and natural botanicals. Suitable for all skin types, cruelty-free.",
    price: 39.99,
    category: "Health & Beauty",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample8",
    companyName: "BeautyEssentials",
  },
  {
    id: "23",
    name: "Organic Skincare Set",
    description:
      "Complete skincare routine with cleanser, toner, moisturizer, and face mask. Made with organic ingredients and essential oils.",
    price: 79.99,
    category: "Health & Beauty",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample8",
    companyName: "BeautyEssentials",
  },
  {
    id: "24",
    name: "Aromatherapy Diffuser",
    description:
      "Ultrasonic essential oil diffuser with LED lights and timer settings. Creates a relaxing atmosphere while purifying the air.",
    price: 45.99,
    category: "Health & Beauty",
    image: "/placeholder.svg?height=400&width=400",
    companyId: "sample8",
    companyName: "BeautyEssentials",
  },
]

// Initialize localStorage with sample data if empty
if (typeof window !== "undefined") {
  const existingProducts = localStorage.getItem("products")
  if (!existingProducts) {
    localStorage.setItem("products", JSON.stringify(sampleProducts))
  }
}

export function getProducts(): Product[] {
  if (typeof window === "undefined") return sampleProducts
  const products = localStorage.getItem("products")
  return products ? JSON.parse(products) : sampleProducts
}

export function getProductById(id: string): Product | null {
  const products = getProducts()
  return products.find((product) => product.id === id) || null
}

export function getProductsByCompany(companyId: string): Product[] {
  const products = getProducts()
  return products.filter((product) => product.companyId === companyId)
}

export function addProduct(productData: Omit<Product, "id">): Product {
  const products = getProducts()
  const newProduct: Product = {
    ...productData,
    id: Date.now().toString(),
  }

  products.push(newProduct)
  localStorage.setItem("products", JSON.stringify(products))
  return newProduct
}

export function updateProduct(id: string, productData: Partial<Omit<Product, "id">>): Product | null {
  const products = getProducts()
  const index = products.findIndex((product) => product.id === id)

  if (index === -1) return null

  products[index] = { ...products[index], ...productData }
  localStorage.setItem("products", JSON.stringify(products))
  return products[index]
}

export function deleteProduct(id: string): boolean {
  const products = getProducts()
  const filteredProducts = products.filter((product) => product.id !== id)

  if (filteredProducts.length === products.length) return false

  localStorage.setItem("products", JSON.stringify(filteredProducts))
  return true
}
