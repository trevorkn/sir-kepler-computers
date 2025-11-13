# Sir Kepler Project Roadmap (Updated)

## Phase 1: Firestore Migration (High Priority)
~~- Replace `products.js` with live Firestore data~~
 ~~ - Update Product Lists, Latest Arrivals, Featured Products, Random Items~~
  ~~- Ensure Product Details pages read from Firestore~~
  - Update search and filter logic to work with Firestore

## Phase 2: Cart & Product Details
~~- Improve `cartStore` functionality~~
~~  - Add quantity selector for single products~~
 ~~ - Update cart totals dynamically~~
 ~~ - Sync with Firestore (optional for cross-device persistence)~~
 - Sign Up & User Schema
   ~~ - Add phone number field in Firestore schema~~
   ~~ - Update registration form to request phone number~~
    -Store phoneVerified: true/false

  -Profile page
   ~~ -Make phone number editable~~
    -Add phone number verification (Firebase SMS OTP)
    -Restrict checkout until phoneVerified === true


 ~~ - Allow multiple quantities per product~~
 ~~ - Add “Add to Cart” and “Wishlist” enhancements ~~


## Phase 3: Product Details enhancement.
- Enhance Product Details page
  - Add more product info (features, shipping details)

## Phase 4: Content Pages
- Blogs page
-FAQ page (Common issues, step-by-step articles)
  - Display articles, categories, search
~~- Contact Us page~~
  - Form submission with validation -' will move this to report a problem '
-Add a number among userAuth(users schema)
 ~~ - Update profile, email, password~~
 ~~ - Wishlist/cart sync management~~

## Phase 5: Admin / Backend Features
- Add/edit/remove products
- Upload images directly from dashboard
- Manage flash sales
- User management (roles, disable accounts)

## Phase 7: UI / UX Enhancements
- General design tuning (spacing, colors, typography)
- Responsiveness on all devices
~~- Visual feedback for buttons (wishlist, cart)~~
~~- Lazy loading for images~~
## Phase 6: Checkout & Orders
-Build Cart Page & Checkout Workflow
  -Add delivery input location(Yet to decide on how to implement this)
  -Allow saving multiple delivery addreses for users

-Integrate payment methods:

  -PayPal Sandbox

  -Bank Transfer

  -Mpesa

  -Order System:

  -Order Placed

  -Order Shipped / Out for Delivery

  -Order Received

-Review/Feedback Page




# 🗓 2-Week Sprint Plan
## Week 1 (Focus: User Flow & Product Pages)

  ### Day 1 – Wednesday

  -Add phoneNumber & phoneVerified fields to Firestore schema

  ~~-Update registration form to request phone number~~

  ~~-Add fallback for existing users without phone number~~

   ### Day 2 – Thursday

 ~~-Make phone number editable in profile~~

~~ -Show verification status (Verified / Not Verified)~~

  ### Day 3 – Friday

  - Implement Firebase Phone Auth (SMS OTP)
      ***SMS OTP not received even after successful validation***

  - Update Firestore on success (phoneVerified: true)

  ### Day 4 – Saturday

  - Restrict checkout if phone not verified

  - Finalize cart flow (quantities, totals, validation)

  ### Day 5 – Monday

  - Product Details enhancement (features, shipping details)

  - Refine design and responsiveness

  ### Day 6 – Tuesday

  - Build Blogs page (list view + single article view)

  - Add dummy articles

  ### Day 7 – Wednesday

  - Build FAQ page

  - Categorized FAQs (Orders, Payments, Shipping, Returns)

  - Link FAQs from footer or help section

  ## Week 2 (Focus: Checkout + Admin)

  ### Day 8 – Thursday

  - Build Checkout page (billing form, summary)

  - Add PayPal sandbox integration

  ### Day 9 – Friday

  - Add Mpesa & Bank transfer placeholders

  - Build order placement logic & Firestore order schema

  ### Day 10 – Saturday

  - Build Order Tracking page (Placed → Shipped → Delivered)

  - Add Review/Feedback page

  ### Day 11 – Monday

  - Start Admin Dashboard layout (sidebar + pages)

  - Build product list table (read data from Firestore)

  ### Day 12 – Tuesday

  - Build Add Product & Edit Product forms

  - Implement image upload via Firebase Storage

  ### Day 13 – Wednesday

  - Add flash sales management

  - Add user management (roles, disable accounts)

  - Final pass: test workflows, responsiveness, edge cases