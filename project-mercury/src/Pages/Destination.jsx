/* eslint-disable no-unused-vars */
import React from "react";
import { Wrapper, Heading, Body, Button } from "../StyleSheet";
import backgroundImage from "../assets/destination/background-destination-desktop.jpg";
import Fortune from "../Components/Fortune";
import europa from "../assets/destination/image-europa.png";
import moon from "../assets/destination/image-moon.png";
import mars from "../assets/destination/image-mars.png";
import titan from "../assets/destination/image-titan.png";

export default function Destination() {
  const destinations = [
    {
      name: "Moon",
      images: {
        png: moon,
        webp: "../assets/destination/image-moon.webp",
      },
      description:
        "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
      distance: "384,400 km",
      travel: "3 days",
    },
    {
      name: "Mars",
      images: {
        png: mars,
        webp: "../assets/destination/image-mars.webp",
      },
      description:
        "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
      distance: "225 mil. km",
      travel: "9 months",
    },
    {
      name: "Europa",
      images: {
        png: europa,
        webp: "../assets/destination/image-europa.webp",
      },
      description:
        "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
      distance: "628 mil. km",
      travel: "3 years",
    },
    {
      name: "Titan",
      images: {
        png: titan,
        webp: "../assets/destination/image-titan.webp",
      },
      description:
        "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
      distance: "1.6 bil. km",
      travel: "7 years",
    },
  ];

  return (
    <Wrapper position="fixed" image={backgroundImage}>
      <div style={{ marginTop: 100 }}>
        <Fortune
          name={destinations[2].name}
          img={destinations[2].images.png}
          description={destinations[2].description}
          distance={destinations[2].distance}
          time={destinations[2].travel}
        />
      </div>
    </Wrapper>
  );
}
