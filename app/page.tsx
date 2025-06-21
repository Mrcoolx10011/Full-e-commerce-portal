import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Users, Package, TrendingUp, Star, Shield, Truck } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">MarketPlace</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The ultimate platform for companies to showcase and sell their products. Join thousands of businesses already
          growing with us. Discover amazing products from trusted companies worldwide.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/products">Browse 24+ Products</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/register">Join as Company</Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">24+</div>
            <div className="text-gray-600">Products Available</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">8+</div>
            <div className="text-gray-600">Partner Companies</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
            <div className="text-gray-600">Product Categories</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose MarketPlace?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="text-center">
              <ShoppingBag className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Easy Shopping</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Browse products from multiple companies in one place with our intuitive interface and advanced search.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Company Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Companies get their own dashboard to manage products, track performance, and grow their business.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Package className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Product Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Full CRUD operations for products with image uploads, categorization, and inventory management.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track your product performance, customer engagement metrics, and sales analytics.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Companies Worldwide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                Your data and transactions are protected with enterprise-grade security measures.
              </p>
            </div>
            <div className="text-center">
              <Star className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">
                All products are from verified companies with quality assurance and customer reviews.
              </p>
            </div>
            <div className="text-center">
              <Truck className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery options to get your products when you need them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join our platform today and start selling your products to a wider audience.</p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/register">Register Your Company</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
