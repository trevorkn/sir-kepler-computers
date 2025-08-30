#  Sir Kepler Computers

An e-commerce web application for selling laptops, desktops, monitors, and accessories.  
Built with **React**, **Firebase (Auth, Firestore, Storage)**, and Mpesa and Bank paymentsw for payments.  

---

##  Features

### 👥 User Features
- Register/Login with Firebase Authentication  
- Browse laptops and accessories (dynamic data from Firestore)  
- Search & view product details  
- Add products to Cart, update quantity, remove items  
- Checkout flow with total calculation  
- Secure payments with Stripe/PayPal (sandbox)  
- Flash Sale banners & discounts  
- Blogs & Contact Us pages  

### 🛠️ Admin Features
- Admin Dashboard for product management:  
  - Add product (with image upload)  
  - Edit product details  
  - Delete products  
  - Enable/disable user accounts  
  - Create Flash Sales  

---

## 📂 Project Structure

sir-kepler-computers/
├── public/ - Static assets
src/
    ├── components/     - Reusable UI components (Header, Footer, ProductCard, FlashSale, etc.)
    ├── contexts/       - Context providers (AuthContext, etc.)
    ├── data/           - Static product & user data (temporary, before Firestore)
    ├── lib/            - Helper functions (uploadAvatar, etc.)
    ├── pages/          - Main pages (Home, Category, ProductDetails, Login, Register, etc.)
    ├── stores/         - Zustand stores (cartStore, searchStore, wishlistStore)
    ├── utils/          - Utility functions
    ├── App.jsx         - Root component with routes
    ├── firebase.js     - Firebase configuration
    ├── main.jsx        - React entry point


## ⚙️ Tech Stack
- **Frontend:** React, Tailwind CSS  
- **Backend:** Firebase Firestore + Firebase Storage  
- **Auth:** Firebase Authentication  
- **Payments:** (M-Pesa -daraja API ) and Bank payments

---

## 🛠️ Installation & Setup

Clone the repository:
```bash
git clone https://github.com/your-username/sir-kepler-computers.git
cd sir-kepler-computers


---
install dependencies:
npm install


Setup Firebase:
1. Create a Firebase project
2. Enable Authentication, Firestore, and Storage
3. Copy your config into src/firebase.js

Run locally:
npm run dev


🔑 Environment Variables
Create a .env file in the project root:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_key

👨‍💻 Author
Sir Kepler Computers – built by [Trevor Kipkemboi]
