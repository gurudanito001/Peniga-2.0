"use client"

import { useEffect, useState } from "react";
import { msToTime } from "@/app/lib/formatTime";

const ConfirmCardTimer = ({ timeCodeSent } : {timeCodeSent: string}) => {
  
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const interval = setInterval( ()=>{
      setCurrentTime(new Date().getTime())

    }, 1000)
    return ()=> clearInterval(interval)
  });

  const timeLeft = ()=>{
    
    const startTime = new Date(timeCodeSent).getTime();
    let timeleft = (startTime + 10800000) - currentTime; // remove last 2 zeros
    if(timeleft > 0){
      return msToTime(timeleft)
      
    }
    return ["00", "00", "00"]
  }

  return (
    <div className="ml-auto">
      <div className="tooltip tooltip-bottom" data-tip={`Buyer has ${timeLeft()[0]}hrs, ${timeLeft()[1]}mins, ${timeLeft()[2]}secs,  to confirm card`}>
        <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
          <div className="flex flex-col items-center p-2 bg-gray-900 w-12 text-neutral rounded-lg">
            <span className="countdown font-mono font-bold text-white">
                {timeLeft()[0]}
            </span>
            <span className=" text-xs">hours</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-900 w-12 text-neutral rounded-lg">
            <span className="countdown font-mono font-bold text-white">
                {timeLeft()[1]}
            </span>
            <span className=" text-xs">mins</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-900 w-12 text-neutral rounded-lg">
            <span className="countdown font-mono font-bold text-white">
                {timeLeft()[2]}
            </span>
            <span className=" text-xs">secs</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmCardTimer;