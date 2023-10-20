import React from 'react'
import { Image, Heading, Body, StatsContainer } from "../StyleSheet";

export default function CrewComp({name, bio, image}) {
  return (
    <div style={{display: "flex", justifyContent: "space-between", padding: "150px 150px 0px 150px"}}>
        <div style={{marginTop: 150}}>
        <Body size="32px">MISSION SPECIALIST</Body>
        <Heading margin="18px 0px" size="56px">{name}</Heading>
        <Body style={{width: 450}} size="18px" height="36px">{bio}</Body>
        </div>
        <Image style={{width: 500, height: 600}} image={image}/>
    </div>
  )
}
