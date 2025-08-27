const products =[
        {id: 1,
         name: "HP EliteBook 840 G1",
         price: 15000,
         oldPrice: 18000,
         category: "Laptops",
         condition: "Refurbished",
         inStock: true,
         images: [
            "/hp840g1/HP840g1.jpeg",
            "/hp840g1/HP840g1.1.jpeg",
            "/hp840g1/HP840g1.2.jpeg",
            "/hp840g1/HP840g1.3.jpeg"
         ],
        features: [
            "8GB RAM",
            "256GB SSD Storage",
            "Windows 10 Pro",
            "Backlit KeyBoard",
            "14-inch FHD Screen",
            "7 Hours Battery"
        ],
        ratings: { totalScore: 70, count: 15 },
        reviews: [
            { user: "John", stars: 4, text: "Solid laptop for the price." },
            { user: "Mary", stars: 5, text: "Works perfectly, battery is decent." },
        ],
        purchasedBy: [1, 2] //users who bought this product
     },

        {id: 2,
         name: "HP Envy x360 convertible 15",
         price: 25000,
         oldPrice: 28000,
         condition: "Refurbished",
         inStock: true,
         category: "Laptops",
         images: [
            "/hpEnvyx360Convertible15/hpEnvyX360.jpeg",
            "/hpEnvyx360Convertible15/hpEnvyX360.4.jpeg",
            "/hpEnvyx360Convertible15/hpEnvyX360.2.jpeg",
            "/hpEnvyx360Convertible15/hpEnvyX360.3.jpeg"
         ],
         features: [
            "8GB RAM",
            "512GB SSD Storage",
            "Windows 11 Pro",
            "Convertible Touchscreen",
            "15.6-inch FHD Screen",
            "6 Hours Battery"
         ],
         ratings: { totalScore: 45, count: 10 },
         reviews: [],
         purchasedBy: [2]
     },

        {id: 3,
        name: "Lenovo Yoga X380",
        price: 22000,
        oldPrice: null,
        category: "Laptops",
        condition: "Refurbished",
        images: [
            "/LenovoYogax380.jpeg"
        ],
        features: [
            "8GB RAM",
            "256GB SSD Storage",
            "Windows 11 Pro",
            "Touchscreen Convertible",
            "13.3-inch FHD Screen",
            "8 Hours Battery"
        ],
        ratings: { totalScore: 37, count: 8 },
        reviews: [],
        purchasedBy: []

    },

        {id: 4,
            name: "HP Elitebook x360 830 G7",
            price: 30000,
            oldPrice: 33000,
            category: "Laptops",
            condition: "Refurbished",
            inStock: true,
            images: [
                "/Hpelitebookx360830G7.jpeg"
            ],
            features: [
            "16GB RAM",
            "512GB SSD Storage",
            "Windows 11 Pro",
            "Convertible Touchscreen",
            "13.3-inch FHD Screen",
            "10 Hours Battery"
            ],
            ratings: { totalScore: 98, count: 20 },
            reviews: [],
            purchasedBy: [1, 3]
        },
        ];


        export default products;