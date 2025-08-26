import products from '../data/products';
import ProductCard from './ProductCard';
import React from 'react';
import useCountdownToMidnight from './Timer'

// Example flash sale data - just IDs and new flash prices for now
// Later, admin dashboard will control this dynamically


const flashSaleData = [
    {id: 1, flashPrice: 13500 },
    {id: 2, flashPrice: 22000 },
    {id: 3, flashPrice: 20000 },
    {id: 4, flashPrice: 28000 },
];

const FlashSale = () => {
    const { hours, minutes, seconds } = useCountdownToMidnight();
    //Map flash sale data to full product info
    const flashSaleProducts = flashSaleData.map((item) => {
        const product = products.find((p) => p.id === item.id);
        return product
        ? { ...product, oldPrice: product.price, price: item.flashPrice }
        : null;
    }).filter(Boolean); //remove nulls if any ID mismatch

    return (
        <section className="w-full bg-[#CCD6DD] py-10 px-4 rounded-2xl shadow-md">
            
            {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 ">
            ⚡ Flash Sale
            </h2>

            {/**Products wrapper */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                {flashSaleProducts.map((product) =>(
                    <ProductCard
                    key={product.id}
                    product={product}
                    oldPrice={product.oldPrice}
                    />
                ))}
            </div>

            <div className='mt-8 text-center'>
                <p className="text-lg font-medium">Sale ends in:</p>
                <div className='flex justify-center space-x-4 mt-2 text-xl font-bold'>
                    <span>{hours}h</span>:<span>{minutes}m</span>:<span>{seconds}s</span>
                </div>

            </div>
        </section>
    )
}

export default FlashSale;