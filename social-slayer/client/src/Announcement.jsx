import React from 'react'
import "./Announcement.css"

export default function Announcement({text}) {
  return (
    <div>
        <section style={{width: "80%", margin: "0 auto", border: "1.25px solid #444444", padding: 32, borderRadius: 10, marginTop: "10%"}}>
        <label style={{fontWeight: 400, fontSize: 16, textAlign: "center", fontFamily: "Open Sans"}} htmlFor="">{text}</label>
        </section>
    </div>
  )
}
