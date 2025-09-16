# Sir Kepler Project Roadmap (Updated)

## Phase 1: Firestore Migration (High Priority)
~~- Replace `products.js` with live Firestore data~~
 ~~ - Update Product Lists, Latest Arrivals, Featured Products, Random Items~~
  ~~- Ensure Product Details pages read from Firestore~~
  - Update search and filter logic to work with Firestore

## Phase 2: Cart & Product Details
- Improve `cartStore` functionality
  - Add quantity selector for single products
  - Update cart totals dynamically
  - Sync with Firestore (optional for cross-device persistence)
- Enhance Product Details page
  - Add more product info (features, shipping details)
  - Allow multiple quantities per product
  - Add “Add to Cart” and “Wishlist” enhancements
- Prepare groundwork for checkout/payment flow

## Phase 3: Checkout & Payment
- Build cart page & checkout workflow
- Integrate payment methods (Stripe / PayPal sandbox)
- Ensure order confirmation & order summary display

## Phase 4: Content Pages
- Blogs page
  - Display articles, categories, search
- Contact Us page
  - Form submission with validation
- User settings page
  - Update profile, email, password
  - Wishlist/cart sync management

## Phase 5: Admin / Backend Features
- Add/edit/remove products
- Upload images directly from dashboard
- Manage flash sales
- User management (roles, disable accounts)

## Phase 6: UI / UX Enhancements
- General design tuning (spacing, colors, typography)
- Responsiveness on all devices
- Visual feedback for buttons (wishlist, cart)
- Lazy loading for images
- Dark mode implementation
