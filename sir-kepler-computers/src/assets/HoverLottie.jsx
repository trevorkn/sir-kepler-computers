import React from 'react';
import { useLottie } from "lottie-react";
import shoppingAnim from "./landingPagepics/Delivery Riding.json"

export default function HoverLottie() {
    const options = {
        animationData: shoppingAnim,
        loop: true,
        autoplay: false,
    };
    const { View, play, stop } = useLottie(options);

    return (
        <div
        onMouseEnter={play}
        onMouseLeave={stop}
        className='w-64 h-64'
        >
            {View}
        </div>
    );
}