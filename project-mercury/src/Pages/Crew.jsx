/* eslint-disable no-unused-vars */
import React from 'react'
import { Wrapper, Heading, Body, Button } from "../StyleSheet";
import backgroundImage from "../assets/crew/background-crew-desktop.jpg"
import douglas from "../assets/crew/image-douglas-hurley.png"
import mark from "../assets/crew/image-mark-shuttleworth.png"
import anousheh from "../assets/crew/image-anousheh-ansari.png"
import victor from "../assets/crew/image-victor-glover.png"
import CrewComp from '../Components/CrewComp';


export default function Crew() {

  const crew= [
    {
      "name": "Douglas Hurley",
      "images": {
        "png": douglas,
        "webp": "./assets/crew/image-douglas-hurley.webp"
      },
      "role": "Commander",
      "bio": "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2."
    },
    {
      "name": "Mark Shuttleworth",
      "images": {
        "png": mark,
        "webp": "./assets/crew/image-mark-shuttleworth.webp"
      },
      "role": "Mission Specialist",
      "bio": "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist."
    },
    {
      "name": "Victor Glover",
      "images": {
        "png": victor,
        "webp": "./assets/crew/image-victor-glover.webp"
      },
      "role": "Pilot",
      "bio": "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer."
    },
    {
      "name": "Anousheh Ansari",
      "images": {
        "png": anousheh,
        "webp": "./assets/crew/image-anousheh-ansari.webp"
      },
      "role": "Flight Engineer",
      "bio": "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space."
    }
  ]

  return (
    <Wrapper image={backgroundImage}>
      <CrewComp name={crew[0].name} bio={crew[0].bio} image={crew[0].images.png}/>
    </Wrapper>
  )
}
