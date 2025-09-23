import React from "react";
import { MapPin, Phone, Clock, Facebook, Instagram, Music2, Hash } from "lucide-react"

export default function ContactUs() {
    return(
        <div>
            <h1 className="lg:text-4xl py-12">Welcome to sir Kepler Computers Store.!!</h1>

            <div className="flex justify-center py-8">
                <img
                src="/sir-kepler-bannar.jpg"
                className="h-44 rounded-full"
                />
            </div>
            <div className="max-w-3xl mx-auto p-6 space-y-8">
                <h1 className="text-3xl font-bold text-center">Contact Us</h1>
                <p className="text-center text-lg text-gray-600">
                We’re always here to help! Get in touch or visit one of our branches near you.
                </p>


                {/* Branches */}
                <section className="space-y-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                <MapPin className="w-5 h-5 text-blue-600" /> Our Branches
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Moi Avenue, Mombasa</strong> – Opposite Saf Stall No. 4</li>
                <li><strong>Masters Area, Bamburi</strong> – Alongside Club MIOS</li>
                <li><strong>Pwani University, Kilifi</strong> – Kibaoni Area</li>
                <li><strong>Lurambi Market, Kakamega</strong> – Lurambi Roundabout</li>
                </ul>
                </section>


                {/* Contact Numbers */}
                <section className="space-y-2">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Phone className="w-5 h-5 text-green-600" /> Call Us
                </h2>
                <p className="text-gray-700 text-lg">0717 551 915 | 0799 687 000 | 0111 372 108</p>
                </section>


                {/* Operating Hours */}
                <section className="space-y-2">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Clock className="w-5 h-5 text-yellow-600" /> Operating Hours
                </h2>
                <ul className="space-y-1 text-gray-700">
                <li><strong>Monday – Friday:</strong> 9:00 AM – 9:00 PM</li>
                <li><strong>Saturday:</strong> 9:00 AM – 5:00 PM</li>
                <li><strong>Sunday:</strong> Closed</li>
                </ul>
                </section>
                {/* Social Media */}
<section className="space-y-4">
<h2 className="text-xl font-semibold text-center">Follow Us</h2>
<div className="flex justify-center gap-12 pb-10 pt-5">
<a href="https://www.facebook.com/share/1Eu9aUD4kk/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
<img src="/facebook.png" className="w-10" />
</a>
<a href="https://www.instagram.com/sirkeplercomputers?igsh=MTdraDZkNHdvNzRmcg==" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
<img src="/instagram.png" className="w-10" />
</a>
<a href="https://www.tiktok.com/@sir.keplercomputers?_t=ZM-8yOi5V6aeb2&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-black">
< img src="tik-tok.png" className="w-10" />
</a>
<a href="https://www.threads.com/@sirkeplercomputers" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
<img src="/threads.png" className="w-10"/>
</a>
</div>
</section>
                </div>
       
        </div>
    )
}

//<a href="https://www.flaticon.com/free-icons/facebook" title="facebook icons">Facebook icons created by Pixel perfect - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/instagram-logo" title="instagram logo icons">Instagram logo icons created by Pixel perfect - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/tiktok" title="tiktok icons">Tiktok icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/threads" title="threads icons">Threads icons created by Freepik - Flaticon</a>