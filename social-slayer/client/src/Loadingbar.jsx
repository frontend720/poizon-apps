import React, {useRef, useEffect} from 'react'
import {gsap} from "gsap"

export default function Loadingbar({width}) {

    const bar = useRef(null);

    useEffect(() => {
        gsap.to(bar.current, {
            duration: 6,
            width: "100%"
        },[])
    })


  return (
    <div>
        <div ref={bar} style={{width}}>
            
        </div>
    </div>
  )
}
