const products = [
  {
    id: 1,
    name: "HP EliteBook 840 G1",
    sku: "HP840G1",
    price: 15000,
    oldPrice: 18000,
    category: "Laptops",
    condition: "Refurbished",
    inStock: true,
    images: [
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/840G1/1.jpeg",
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/840G1/2.jpeg",
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/840G1/3.jpeg",
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/840G1/4.jpeg"
    ],
    features: [
      "8GB RAM",
      "256GB SSD Storage",
      "Windows 10 Pro",
      "Backlit Keyboard",
      "14-inch FHD Screen",
      "7 Hours Battery"
    ],
    ratings: { totalScore: 0, count: 0 },
    reviews: [],
    featured: true,
    purchasedBy: []
  },
  {
    id: 2,
    name: "HP EliteBook 840 G3",
    sku: "HP840G3",
    price: 22000, // from txt file
    oldPrice: null,
    category: "Laptops",
    condition: "Refurbished",
    inStock: true,
    images: [
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/840G3/1.jpeg"
    ],
    features: [
      "Intel i5 6th Gen",
      "8GB RAM",
      "256GB SSD Storage",
      "14-inch FHD Screen"
    ],
    ratings: { totalScore: 0, count: 0 },
    reviews: [],
    featured: false,
    purchasedBy: []
  },
  {
    id: 3,
    name: "HP EliteBook 840 G6",
    sku: "HP840G6",
    price: 33000, // from txt file
    oldPrice: null,
    category: "Laptops",
    condition: "Refurbished",
    inStock: true,
    images: [
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/840G6/1.jpeg",
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/840G6/2.jpeg",
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/840G6/3.jpeg",
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/840G6/4.jpeg"
    ],
    features: [
      "Intel i5 8th Gen",
      "8GB RAM",
      "256GB SSD Storage",
      "Windows 11 Pro",
      "Backlit Keyboard",
      "14-inch FHD Screen",
      "7 Hours Battery"
    ],
    ratings: { totalScore: 0, count: 0 },
    reviews: [],
    featured: false,
    purchasedBy: []
  },
  {
    id: 4,
    name: "HP EliteBook 820 G1",
    sku: "HP820G1",
    price: 18000,
    oldPrice: null,
    category: "Laptops",
    condition: "Refurbished",
    inStock: true,
    images: [
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/820G1/1.jpeg"
    ],
    features: [
      "8GB RAM",
      "256GB SSD Storage",
      "Windows 10 Pro",
      "12.5-inch HD Screen"
    ],
    ratings: { totalScore: 0, count: 0 },
    reviews: [],
    featured: false,
    purchasedBy: []
  },
  {
    id: 5,
    name: "HP EliteBook 820 G3",
    sku: "HP820G3",
    price: 20000,
    oldPrice: null,
    category: "Laptops",
    condition: "Refurbished",
    inStock: true,
    images: [
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/820G3/1.jpeg"
    ],
    features: [
      "8GB RAM",
      "256GB SSD Storage",
      "Windows 10 Pro",
      "12.5-inch FHD Screen"
    ],
    ratings: { totalScore: 0, count: 0 },
    reviews: [],
    featured: true,
    purchasedBy: []
  },
  {
    id: 6,
    name: "HP EliteBook 830 G5",
    sku: "HP830G5",
    price: 28000,
    oldPrice: null,
    category: "Laptops",
    condition: "Refurbished",
    inStock: true,
    images: [
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/830G5/1.jpeg"
    ],
    features: [
      "8GB RAM",
      "256GB SSD Storage",
      "Windows 10 Pro",
      "13.3-inch FHD Screen"
    ],
    ratings: { totalScore: 0, count: 0 },
    reviews: [],
    featured:false,
    purchasedBy: []
  },
  {
    id: 7,
    name: "HP EliteBook 830 G6",
    sku: "HP830G6",
    price: 30000,
    oldPrice: null,
    category: "Laptops",
    condition: "Refurbished",
    inStock: true,
    images: [
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/830G6/1.jpeg"
    ],
    features: [
      "8GB RAM",
      "256GB SSD Storage",
      "Windows 10 Pro",
      "13.3-inch FHD Screen"
    ],
    ratings: { totalScore: 0, count: 0 },
    reviews: [],
    featured: false,
    purchasedBy: []
  },
  {
    id: 8,
    name: "HP EliteBook 8570p",
    sku: "HP8570P",
    price: 15000,
    oldPrice: null,
    category: "Laptops",
    condition: "Refurbished",
    inStock: true,
    images: [
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/8570p/1.jpeg",
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/8570p/2.jpeg",
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/8570p/3.jpeg",
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/8570p/4.jpeg"
    ],
    features: [
      "8GB RAM",
      "256GB SSD Storage",
      "Windows 10 Pro",
      "14-inch FHD Screen"
    ],
    ratings: { totalScore: 0, count: 0 },
    reviews: [],
    featured: true,
    purchasedBy: []
  },
  {
    id: 9,
    name: "HP EliteBook x360 830 G7",
    sku: "HPx360G7",
    price: 30000,
    oldPrice: 33000,
    category: "Laptops",
    condition: "Refurbished",
    inStock: true,
    images: [
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/x360830G7/1.jpeg"
    ],
    features: [
      "16GB RAM",
      "512GB SSD Storage",
      "Windows 11 Pro",
      "Convertible Touchscreen",
      "13.3-inch FHD Screen",
      "10 Hours Battery"
    ],
    ratings: { totalScore: 0, count: 0 },
    reviews: [],
    featured: true,
    purchasedBy: []
  },
  {
    id: 10,
    name: "HP EliteBook 1040 G7",
    sku: "HP1040G7",
    price: 62000,
    oldPrice: null,
    category: "Laptops",
    condition: "Refurbished",
    inStock: true,
    images: [
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/1040G7/1.jpeg"
    ],
    features: [
      "16GB RAM",
      "512GB SSD Storage",
      "Windows 11 Pro",
      "14-inch FHD Screen",
      "8 Hours Battery"
    ],
    ratings: { totalScore: 0, count: 0 },
    reviews: [],
    featured: false,
    purchasedBy: []
  },
  {
    id: 11,
    name: "HP EliteBook 1040 G8",
    sku: "HP1040G8",
    price: 62000,
    oldPrice: null,
    category: "Laptops",
    condition: "Refurbished",
    inStock: true,
    images: [
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/1040g8x360/1.jpeg",
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/1040g8x360/2.jpeg",
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/1040g8x360/3.jpeg",
      "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/EliteBook/1040g8x360/4.jpeg"
    ],
    features: [
      "16GB RAM",
      "512GB SSD Storage",
      "Windows 11 Pro",
      "Convertible Touchscreen",
      "14-inch FHD Screen"
    ],
    ratings: { totalScore: 0, count: 0 },
    reviews: [],
    featured: true,
    purchasedBy: []
  },
  {
  id: 12,
  name: "HP Dragonfly",
  sku: "HPDRGFLY",
  price: 80000,
  oldPrice: null,
  category: "Laptops",
  condition: "Refurbished",
  inStock: true,
  images: [
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/Dragonfly/1.jpeg"
  ],
  features: [
    "16GB RAM",
    "512GB SSD Storage",
    "Windows 11 Pro",
    "Convertible Touchscreen",
    "13.3-inch FHD Screen",
    "10 Hours Battery"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 13,
  name: "HP Envy x360",
  sku: "HPENX360",
  price: 25000,
  oldPrice: 28000,
  category: "Laptops",
  condition: "Refurbished",
  inStock: true,
  images: [
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/Envyx360/1.jpeg",
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/Envyx360/2.jpeg",
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/Envyx360/3.jpeg",
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/HP/Envyx360/4.jpeg"
  ],
  features: [
    "8GB RAM",
    "512GB SSD Storage",
    "Windows 11 Pro",
    "Convertible Touchscreen",
    "15.6-inch FHD Screen",
    "6 Hours Battery"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
 {
  id: 14,
  name: "Dell Latitude 5440",
  sku: "DL5440",
  price: 25000,
  oldPrice: null,
  category: "Laptops",
  condition: "Refurbished",
  inStock: true,
  images: [
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/Dell/Latitude/5440/1.jpeg"
  ],
  features: [
    "8GB RAM",
    "256GB SSD Storage",
    "Windows 10 Pro",
    "14-inch FHD Screen",
    "6 Hours Battery"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: true,
  purchasedBy: []
},
{
  id: 15,
  name: "Dell Latitude 7280",
  sku: "DL7280",
  price: 28000,
  oldPrice: null,
  category: "Laptops",
  condition: "Refurbished",
  inStock: true,
  images: [
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/Dell/Latitude/7280/1.jpeg"
  ],
  features: [
    "8GB RAM",
    "256GB SSD Storage",
    "Windows 10 Pro",
    "12.5-inch FHD Screen",
    "6 Hours Battery"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 16,
  name: "Dell Latitude E7470",
  sku: "DLE7470",
  price: 30000,
  oldPrice: null,
  category: "Laptops",
  condition: "Refurbished",
  inStock: true,
  images: [
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/Dell/Latitude/e7470/1.jpeg"
  ],
  features: [
    "8GB RAM",
    "256GB SSD Storage",
    "Windows 10 Pro",
    "14-inch FHD Screen",
    "7 Hours Battery"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 17,
  name: "MacBook Air 2015",
  sku: "MBA015",
  price: 40000,
  oldPrice: null,
  category: "Laptops",
  condition: "Refurbished",
  inStock: true,
  images: [
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/MacBook/AIR/2015.jpeg"
  ],
  features: [
    "8GB RAM",
    "128GB SSD Storage",
    "macOS Catalina",
    "13.3-inch Retina Display",
    "7 Hours Battery"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 18,
  name: "MacBook Pro 13 2015",
  sku: "MBP13015",
  price: 50000,
  oldPrice: null,
  category: "Laptops",
  condition: "Refurbished",
  inStock: true,
  images: [
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/MacBook/Pro13-2015/1.jpeg"
  ],
  features: [
    "8GB RAM",
    "256GB SSD Storage",
    "macOS Catalina",
    "13-inch Retina Display",
    "8 Hours Battery"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 19,
  name: "Lenovo ThinkPad L460",
  sku: "THL460",
  price: 22000,
  oldPrice: null,
  category: "Laptops",
  condition: "Refurbished",
  inStock: true,
  images: [
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/Lenovo/Thinkpad/L460/1.jpeg",
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/Lenovo/Thinkpad/L460/2.jpeg",
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/Lenovo/Thinkpad/L460/3.jpeg",
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptpos/Lenovo/Thinkpad/L460/4.jpeg"
  ],
  features: [
    "Intel i5 6th Gen",
    "8GB RAM",
    "256GB SSD Storage",
    "14-inch FHD Screen",
    "Windows 10 Pro"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 20,
  name: "Lenovo ThinkPad X260",
  sku: "THLX260",
  price: 24000,
  oldPrice: null,
  category: "Laptops",
  condition: "Refurbished",
  inStock: true,
  images: [
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/Lenovo/Thinkpad/x260/1.jpeg",
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/Lenovo/Thinkpad/x260/2.jpeg"
  ],
  features: [
    "Intel i5 6th Gen",
    "8GB RAM",
    "256GB SSD Storage",
    "12.5-inch FHD Screen",
    "Windows 10 Pro"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 21,
  name: "Lenovo ThinkPad X280",
  sku: "THX280",
  price: 26000,
  oldPrice: null,
  category: "Laptops",
  condition: "Refurbished",
  inStock: true,
  images: [
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/Lenovo/Thinkpad/x280/1.jpeg"
  ],
  features: [
    "Intel i5 8th Gen",
    "8GB RAM",
    "256GB SSD Storage",
    "12.5-inch FHD Screen",
    "Windows 10 Pro"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 22,
  name: "Lenovo ThinkPad Yoga 11e",
  sku: "THY11E",
  price: 28000,
  oldPrice: null,
  category: "Laptops",
  condition: "Refurbished",
  inStock: true,
  images: [
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/Lenovo/Thinkpad/Yoga11e/1.jpeg"
  ],
  features: [
    "Intel i5 6th Gen",
    "8GB RAM",
    "256GB SSD Storage",
    "11.6-inch Touchscreen",
    "Windows 10 Pro",
    "Convertible Design"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 23,
  name: "Lenovo ThinkPad Yoga 370",
  sku: "THY370",
  price: 35000,
  oldPrice: null,
  category: "Laptops",
  condition: "Refurbished",
  inStock: true,
  images: [
    "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Laptops/Lenovo/Thinkpad/Yoga370/1.jpeg"
  ],
  features: [
    "Intel i7 7th Gen",
    "8GB RAM",
    "256GB SSD Storage",
    "13.3-inch Touchscreen",
    "Windows 10 Pro",
    "Convertible Design"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
    id: 24,
    name: "Dell Tower",
    sku: "DLTWR001",
    price: 35000,
    oldPrice: null,
    category: "Desktops",
    condition: "Refurbished",
    inStock: true,
    images: [
        "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/DeskTops/Dell/towers.jpeg"
    ],
    features: [
        "8GB RAM",
        "1TB HDD Storage",
        "Intel i5 Processor",
        "Windows 10 Pro"
    ],
    ratings: { totalScore: 0, count: 0 },
    reviews: [],
    featured: false,
    purchasedBy: []
},
{
    id: 25,
     name: "Dell Vostro",
     sku: "DLVSTRO2",
  price: 32000,
  oldPrice: null,
  category: "Desktops",
  condition: "Refurbished",
  inStock: true,
  images: [
    "https://storage.googleapis.com/sir-kepler-computers.firebasestorage.app/DeskTops/Dell/vostro.jpeg"
  ],
  features: [
    "Intel Core i5 6th Gen",
    "8GB RAM",
    "1TB HDD Storage",
    "Windows 10 Pro",
    "Compact desktop tower"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
    id: 26,
    name: "HP ELiteDesk 600 G3",
    sku: "HP600G3D",
    price: 33000,
    oldPrice: null,
    category: "Desktops",
    condition: "Refurbished",
    inStock: true,
    images: [
        "https://Storage.googleapis.com/sir-kepler-computers.firebasestorage.app/DeskTops/HP/600g3.jpeg"
    ],
    features: [
        "Intel Core i5 7th Gen",
        "8GB RAM",
        "256GB SSD + 500GB HDD",
        "Windows 10 Pro",
        "Small form factor PC"
    ],
    ratings: { totalScore: 0, count: 0},
    reviews: [],
    featured: true,
    purchasedBy: []
},
{
  id: 27,
  name: "Bag",
  sku: "ACC001",
  price: 2500,
  oldPrice: null,
  category: "Accessories",
  condition: "New",
  inStock: true,
  images: [
    "https://storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Accessories/Bag.jpeg"
  ],
  features: [
    "Durable material",
    "Multiple compartments",
    "Universal laptop fit"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 28,
  name: "Crucial SSD",
  sku: "ACC002",
  price: 8000,
  oldPrice: null,
  category: "Accessories",
  condition: "New",
  inStock: true,
  images: [
    "https://storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Accessories/Crucialssd.jpeg"
  ],
  features: [
    "500GB Storage",
    "SATA III",
    "High-speed performance"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 29,
  name: "Laptop Screens",
  sku: "ACC003",
  price: 15000,
  oldPrice: null,
  category: "Accessories",
  condition: "New",
  inStock: true,
  images: [
    "https://storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Accessories/Laptopscreens.jpeg"
  ],
  features: [
    "Compatible with multiple models",
    "FHD resolution",
    "Easy replacement"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 30,
  name: "RAM Stick 8GB",
  sku: "ACC004",
  price: 6000,
  oldPrice: null,
  category: "Accessories",
  condition: "New",
  inStock: true,
  images: [
    "https://storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Accessories/RAM.jpeg"
  ],
  features: [
    "8GB DDR4 RAM",
    "3200MHz speed",
    "Plug-and-play"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 31,
  name: "RAM Stick 16GB",
  sku: "ACC005",
  price: 12000,
  oldPrice: null,
  category: "Accessories",
  condition: "New",
  inStock: true,
  images: [
    "https://storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Accessories/Ram.jpeg"
  ],
  features: [
    "16GB DDR4 RAM",
    "3200MHz speed",
    "Plug-and-play"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 32,
  name: "Universal Cleaner",
  sku: "ACC006",
  price: 2000,
  oldPrice: null,
  category: "Accessories",
  condition: "New",
  inStock: true,
  images: [
    "https://storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Accessories/Universalcleaner.jpeg"
  ],
  features: [
    "Safe for all devices",
    "Non-toxic",
    "Easy application"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 33,
  name: "M.2 SSD",
  sku: "ACC007",
  price: 10000,
  oldPrice: null,
  category: "Accessories",
  condition: "New",
  inStock: true,
  images: [
    "https://storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Accessories/m.2ssd's.jpeg"
  ],
  features: [
    "250GB Storage",
    "NVMe interface",
    "High-speed read/write"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 34,
  name: "Motherboard",
  sku: "ACC008",
  price: 15000,
  oldPrice: null,
  category: "Accessories",
  condition: "New",
  inStock: true,
  images: [
    "https://storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Accessories/motherboard.jpeg"
  ],
  features: [
    "ATX Form Factor",
    "Supports latest CPUs",
    "High durability"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 35,
  name: "Portable Android Projector",
  sku: "ACC009",
  price: 25000,
  oldPrice: null,
  category: "Accessories",
  condition: "New",
  inStock: true,
  images: [
    "https://storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Accessories/portableandroidprojectors.jpeg"
  ],
  features: [
    "HD Projection",
    "Built-in Android OS",
    "Compact and portable"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
},
{
  id: 36,
  name: "HP Monitor",
  sku: "MON001",
  price: 12000,
  oldPrice: null,
  category: "Monitors",
  condition: "New",
  inStock: true,
  images: [
   "https://storage.googleapis.com/sir-kepler-computers.firebasestorage.app/Monitors/HP/HPmonitor/WhatsApp%20Image%202025-08-23%20at%205.38.29%20PM.jpeg"
  ],
  features: [
    "24-inch FHD Screen",
    "IPS Panel",
    "75Hz Refresh Rate",
    "HDMI & VGA Ports"
  ],
  ratings: { totalScore: 0, count: 0 },
  reviews: [],
  featured: false,
  purchasedBy: []
}


];

export default products;
