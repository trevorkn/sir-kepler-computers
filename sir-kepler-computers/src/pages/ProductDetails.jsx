import React from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json'; // your JSON file

const formatPrice = (num, currency = "KSh") => {
  if (typeof num !== "number") return "";
  return `${currency} ${num.toLocaleString()}`;
};

export default function ProductDetails() {
  const { id } = useParams(); // grabs the :id from the URL
  const product = productsData.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Link to="/" className="text-blue-500 mt-4 inline-block">Go Back Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full md:w-1/2 rounded-xl object-cover"
        />

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold text-green-600">{formatPrice(product.price)}</p>
          <div>
            <h2 className="font-semibold mb-2">Specifications:</h2>
            <ul className="list-disc list-inside">
              {product.specs.map((spec, idx) => (
                <li key={idx}>{spec}</li>
              ))}
            </ul>
          </div>
          <Link 
            to="/"
            className="mt-auto inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-fit"
          >
            Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
