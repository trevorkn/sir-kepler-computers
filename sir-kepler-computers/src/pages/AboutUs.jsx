import React from "react";

export default function AboutUs() {
    return(
        <div>
            <h1 className="lg:text-4xl py-12">Welcome to sir Kepler Computers Store.!!</h1>

            <div className="flex justify-center py-8">
                <img
                src="/sir-kepler-bannar.jpg"
                className="h-44 rounded-full"
                />
            </div>
            <article className="py-6">
                <h2 className="lg:text-3xl">About us</h2>
                <p className="w-2/3 mx-auto">At Sir Kepler Computers, we are your trusted technology partner — proudly serving Pwani University, the Coastal region, and Kenya at large. Our mission is simple: to make top-quality gadgets and services accessible to everyone, wherever you are.

We offer an extensive selection of tech products to meet every need and budget. From new and refurbished laptops of all brands and price ranges, to gaming laptops, gaming PCs, server machines, mechanical keyboards, monitors, and desktop PCs — we’ve got you covered.

Whether you’re a student, gamer, business professional, or tech enthusiast, we are here to connect you with the right device. If you don’t see what you’re looking for on our online store, simply reach out to us, and we’ll help you find it.

Our physical shops are located in Mombasa, Kilifi, and Kakamega, but we deliver to all towns countrywide. Delivery fees vary depending on your location, ensuring that no matter where you are, your gadgets get to your doorstep safely and efficiently.

At Sir Kepler Computers, your satisfaction is our priority. With us, you’re not just buying tech — you’re partnering with a team that values quality, reliability, and convenience.</p>
            </article>
        </div>
    )
}