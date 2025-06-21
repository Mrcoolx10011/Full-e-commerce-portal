-- Insert sample companies (using ON CONFLICT to handle duplicates)
INSERT INTO companies (id, company_name, email, password_hash, description, website) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'TechCorp', 'contact@techcorp.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg9S6O', 'Leading technology solutions provider', 'https://techcorp.com'),
('550e8400-e29b-41d4-a716-446655440002', 'EcoWear', 'hello@ecowear.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg9S6O', 'Sustainable fashion for the modern world', 'https://ecowear.com'),
('550e8400-e29b-41d4-a716-446655440003', 'HomeStyle', 'info@homestyle.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg9S6O', 'Transform your home with our products', 'https://homestyle.com'),
('550e8400-e29b-41d4-a716-446655440004', 'FitLife', 'support@fitlife.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg9S6O', 'Your fitness journey starts here', 'https://fitlife.com'),
('550e8400-e29b-41d4-a716-446655440005', 'BookHaven', 'books@bookhaven.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg9S6O', 'Your gateway to knowledge and imagination', 'https://bookhaven.com'),
('550e8400-e29b-41d4-a716-446655440006', 'ToyWorld', 'play@toyworld.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg9S6O', 'Where imagination comes to play', 'https://toyworld.com'),
('550e8400-e29b-41d4-a716-446655440007', 'GourmetBites', 'taste@gourmetbites.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg9S6O', 'Artisanal foods for the discerning palate', 'https://gourmetbites.com'),
('550e8400-e29b-41d4-a716-446655440008', 'BeautyEssentials', 'glow@beautyessentials.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg9S6O', 'Natural beauty products for radiant skin', 'https://beautyessentials.com')
ON CONFLICT (email) DO NOTHING;

-- Insert sample products (delete existing first to avoid duplicates)
DELETE FROM products WHERE company_id IN (
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440004',
  '550e8400-e29b-41d4-a716-446655440005',
  '550e8400-e29b-41d4-a716-446655440006',
  '550e8400-e29b-41d4-a716-446655440007',
  '550e8400-e29b-41d4-a716-446655440008'
);

-- TechCorp Products
INSERT INTO products (name, description, price, category, image_url, company_id) VALUES
('Wireless Noise-Canceling Headphones', 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality. Perfect for music lovers and professionals.', 299.99, 'Electronics', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440001'),
('Smart Fitness Watch', 'Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 50+ workout modes. Water-resistant up to 50 meters.', 249.99, 'Electronics', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440001'),
('Wireless Charging Pad', 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.', 39.99, 'Electronics', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440001'),

-- EcoWear Products
('Organic Cotton T-Shirt', '100% organic cotton t-shirt made from sustainably sourced materials. Soft, comfortable, and available in multiple colors.', 29.99, 'Clothing', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440002'),
('Recycled Denim Jeans', 'Stylish jeans made from 80% recycled denim. Comfortable fit with modern styling and eco-friendly production process.', 89.99, 'Clothing', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440002'),
('Bamboo Fiber Hoodie', 'Ultra-soft hoodie made from bamboo fiber. Naturally antibacterial, moisture-wicking, and incredibly comfortable.', 69.99, 'Clothing', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440002'),

-- HomeStyle Products
('Smart Home Security Camera', '1080p HD security camera with night vision, two-way audio, and smartphone app control. Easy installation and cloud storage.', 129.99, 'Home & Garden', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440003'),
('LED Smart Bulb Set', 'Set of 4 color-changing LED smart bulbs. Control brightness and color via smartphone app. Energy-efficient and long-lasting.', 59.99, 'Home & Garden', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440003'),
('Ceramic Plant Pot Set', 'Beautiful set of 3 ceramic plant pots with drainage holes and saucers. Perfect for indoor plants and home decoration.', 34.99, 'Home & Garden', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440003'),

-- FitLife Products
('Adjustable Dumbbells Set', 'Space-saving adjustable dumbbells with weight range from 5-50 lbs each. Perfect for home workouts and strength training.', 299.99, 'Sports', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440004'),
('Yoga Mat Premium', 'Non-slip yoga mat made from eco-friendly TPE material. Extra thick for comfort with alignment lines for proper positioning.', 49.99, 'Sports', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440004'),
('Resistance Bands Set', 'Complete resistance bands set with 5 different resistance levels, door anchor, handles, and ankle straps. Perfect for full-body workouts.', 24.99, 'Sports', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440004'),

-- BookHaven Products
('The Art of Programming', 'Comprehensive guide to modern programming practices. Covers algorithms, data structures, and best practices for software development.', 45.99, 'Books', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440005'),
('Mindfulness and Meditation', 'A practical guide to mindfulness and meditation techniques for stress reduction and mental well-being. Includes guided exercises.', 19.99, 'Books', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440005'),
('Cooking Masterclass', 'Professional cooking techniques and recipes from world-renowned chefs. Step-by-step instructions with beautiful photography.', 39.99, 'Books', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440005'),

-- ToyWorld Products
('Educational Building Blocks', 'STEM-focused building blocks set that promotes creativity and problem-solving skills. Safe, non-toxic materials for ages 3+.', 34.99, 'Toys', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440006'),
('Remote Control Drone', 'Easy-to-fly drone with HD camera, altitude hold, and one-key return function. Perfect for beginners and aerial photography.', 89.99, 'Toys', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440006'),
('Interactive Robot Pet', 'AI-powered robot pet that responds to voice commands and touch. Teaches kids about technology while providing companionship.', 149.99, 'Toys', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440006'),

-- GourmetBites Products
('Artisan Coffee Blend', 'Premium coffee blend sourced from single-origin farms. Medium roast with notes of chocolate and caramel. Freshly roasted to order.', 24.99, 'Food & Beverage', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440007'),
('Organic Honey Set', 'Collection of 3 organic honey varieties: wildflower, clover, and orange blossom. Raw, unfiltered, and locally sourced.', 32.99, 'Food & Beverage', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440007'),
('Gourmet Spice Collection', 'Curated collection of 12 premium spices from around the world. Includes recipe cards and storage containers.', 49.99, 'Food & Beverage', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440007'),

-- BeautyEssentials Products
('Natural Face Serum', 'Anti-aging face serum with vitamin C, hyaluronic acid, and natural botanicals. Suitable for all skin types, cruelty-free.', 39.99, 'Health & Beauty', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440008'),
('Organic Skincare Set', 'Complete skincare routine with cleanser, toner, moisturizer, and face mask. Made with organic ingredients and essential oils.', 79.99, 'Health & Beauty', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440008'),
('Aromatherapy Diffuser', 'Ultrasonic essential oil diffuser with LED lights and timer settings. Creates a relaxing atmosphere while purifying the air.', 45.99, 'Health & Beauty', '/placeholder.svg?height=400&width=400', '550e8400-e29b-41d4-a716-446655440008');

-- Display success message
SELECT 'Database seeded successfully!' as message,
       (SELECT COUNT(*) FROM companies) as companies_count,
       (SELECT COUNT(*) FROM products) as products_count;
