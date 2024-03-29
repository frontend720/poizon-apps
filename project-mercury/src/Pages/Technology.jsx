/* eslint-disable no-unused-vars */
import React from "react";
import { Wrapper, Heading, Body, Button } from "../StyleSheet";
import backgroundImage from "../assets/technology/background-technology-desktop.jpg";
import TechComponent from "../Components/TechComponent";
import vehicle from "../assets/technology/image-launch-vehicle-portrait.jpg";
import capsule from "../assets/technology/image-space-capsule-portrait.jpg";
import port from "../assets/technology/image-spaceport-portrait.jpg";
import mobile_capsule from "../assets/technology/image-space-capsule-landscape.jpg";
import mobile_vehicle from "../assets/technology/image-launch-vehicle-landscape.jpg";
import mobile_spaceport from "../assets/technology/image-spaceport-landscape.jpg";

const technology = [
  {
    name: "Launch vehicle",
    images: {
      landscape: vehicle,
      portrait: mobile_vehicle,
    },
    description:
      "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!",
  },
  {
    name: "Spaceport",
    images: {
      portrait: mobile_spaceport,
      landscape: port,
    },
    description:
      "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.",
  },
  {
    name: "Space capsule",
    images: {
      landscape: capsule,
      portrait: mobile_capsule,
    },
    description:
      "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.",
  },
];

export default function Technology() {
  return (
    <Wrapper title="" image={backgroundImage}>
      <TechComponent
        vehicle={technology[2].name}
        description={technology[2].description}
        image={technology[2].images.landscape}
        alt={technology[2].description}
        tablet_image={technology[2].images.portrait}
      />
    </Wrapper>
  );
}
