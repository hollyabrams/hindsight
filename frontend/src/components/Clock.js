import React, { useEffect, useRef } from 'react';
import './Clock.css';  

const Clock = () => {
    const HOURHAND = useRef(null);
    const MINUTEHAND = useRef(null);
    const SECONDHAND = useRef(null);

    useEffect(() => {
        let date = new Date();
        let hr = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();

        // converts current time into degrees of the 360 degree clock
        // subtract the positions from 360 for counterclockwise rotation
        let hrPosition = 360 - ((hr * 360 / 12) + (min * (360 / 60) / 12));
        let minPosition = 360 - ((min * 360 / 60) + (sec * (360 / 60) / 60));
        let secPosition = 360 - (sec * 360 / 60);

        function runClock(){
            // subtract degrees in an hour divide by seconds in an hour from previous time
            hrPosition -= (30/3600);
        
            // subtract degrees in a minute divide by seconds in a minute from previous time
            minPosition -= (6/60);
        
            // subtract degrees in a second from previous time
            secPosition -= 6;
        
            // position clock hands to degrees values calculated above using transform rotate
            if (HOURHAND.current && MINUTEHAND.current && SECONDHAND.current) {
                HOURHAND.current.style.transform = `rotate(${hrPosition}deg)`;
                MINUTEHAND.current.style.transform = `rotate(${minPosition}deg)`;
                SECONDHAND.current.style.transform = `rotate(${secPosition}deg)`;
            }
        }

        let interval = setInterval(runClock, 1000);
        
        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <div className="clockbox">
            <svg id="clock" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 600 600">
                <circle cx="300" cy="300" r="300" fill="#ffffff" stroke="#000000" strokeWidth="8"/>

                {[...Array(12)].map((_, i) => (
                    <line 
                        key={i}  // Add this line
                        x1="300" 
                        y1="60" 
                        x2="300" 
                        y2="80" 
                        stroke="#000000" 
                        strokeWidth="3"
                        transform={`rotate(${i * 30}, 300, 300)`}
                    />
                ))}
                ...
                <g id="hour" ref={HOURHAND}>
                    <path className="hour-hand" d="M300.5 298V142"/>
                    <circle className="sizing-box" cx="300" cy="300" r="253.9"/>
                </g>
                <g id="minute" ref={MINUTEHAND}>
                    <path className="minute-hand" d="M300.5 298V67"/>
                    <circle className="sizing-box" cx="300" cy="300" r="253.9"/>
                </g>
                <g id="second" ref={SECONDHAND}>
                    <path className="second-hand" d="M300.5 350V55"/>
                    <circle className="sizing-box" cx="300" cy="300" r="253.9"/>
                </g>
            </svg>
        </div>
    );
    
};

export default Clock;
