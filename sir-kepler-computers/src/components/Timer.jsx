import React, { useEffect, useState} from 'react';

const useCountdownToMidnight = () => {
    const [ timeLeft, setTimeLeft ] = useState({hours: 0, minutes: 0, seconds: 0});

    useEffect(() => {
        const updateTime = () => {
                const now = new Date();
                const midnight = new Date();
                midnight.setHours(24, 0, 0, 0); //set to next midnight
                const diff = midnight - now; //ms difference

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) /1000);

         setTimeLeft({hours, minutes, seconds});
            };
        updateTime(); //initial call
        const interval = setInterval(updateTime, 1000); // update every second

        return () => clearInterval(interval);
        },[]);

        return timeLeft
        }
    export default useCountdownToMidnight;